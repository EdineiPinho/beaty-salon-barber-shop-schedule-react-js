import { compare, hash } from "bcrypt"
import { ICreate, IUpdate } from "../interfaces/UsersInterface"
import { UsersRepository } from "../respositories/UsersRepository"
import { s3 } from '../config/aws';
import { v4 as uuid } from 'uuid';
import { sign, verify } from "jsonwebtoken";

class UsersServices {
  private usersRepository: UsersRepository
  constructor() {
    this.usersRepository = new UsersRepository
  }

  async create({ name, email, password }: ICreate) {
    const findeUser = await this.usersRepository.findUserByEmail(email)
    if (findeUser) {
      throw new Error('User already exists')
    }
    const hashPassword = await hash(password, 10)
    const create = await this.usersRepository.create({ name, email, password: hashPassword })
    return create
  }

  async update({
    name,
    oldPassword,
    newPassword,
    avatar_url,
    user_id
  }: IUpdate) {
    let password
    if (oldPassword && newPassword) {
      const findeUserById = await this.usersRepository.findUserById(user_id)
      if (!findeUserById) {
        throw new Error('User not found')
      }
      const passwordMatch = compare(oldPassword, findeUserById.password)
      if (!passwordMatch) {
        throw new Error('Invalid password')
      }
      password = await hash(newPassword, 10)
      await this.usersRepository.updatePassword(password, user_id)
    }
    if (avatar_url) {
      const uploadImage = avatar_url?.buffer
      const uploadS3 = await s3.upload({
        Bucket: 'semana-heroi',
        Key: `${uuid()}-${avatar_url?.originalname}`,
        // ACL: 'public-read',
        Body: uploadImage,
      }).promise()
      await this.usersRepository.update(name, uploadS3.Location, user_id)
    }
    return {
      message: 'User update successfully',
    }
  }

  async auth(email: string, password: string) {
    const findeUser = await this.usersRepository.findUserByEmail(email)
    if (!findeUser) {
      throw new Error('Invalid user or password.')
    }
    const passwordMatch = compare(password, findeUser.password)

    if (!passwordMatch) {
      throw new Error('Invalid user or password.')
    }

    let secretKey: string | undefined = process.env.ACCESS_KEY_TOKEN
    if (!secretKey) {
      throw new Error('There is no token key')
    }

    const token = sign({ email }, secretKey, {
      subject: findeUser.id,
      expiresIn: 60 * 15,
    })

    const refreshToken = sign({ email }, secretKey, {
      subject: findeUser.id,
      expiresIn: '7d',
    })

    return {
      token,
      refresh_token: refreshToken,
      user: {
        name: findeUser.name,
        email: findeUser.email,
      },
    }
  }

  async refresh(refresh_token: string) {
    if (!refresh_token) throw new Error('Refresh token missing')
    let secretKey: string | undefined = process.env.ACCESS_KEY_TOKEN
    if (!secretKey) {
      throw new Error('There is no refresh token key')
    }
    const verifyRefreshToken = verify(refresh_token, secretKey)

    const { sub } = verifyRefreshToken

    const newToken = sign({ sub }, secretKey, {
      expiresIn: 60 * 15,
    })
    return { token: newToken }
  }
}

export { UsersServices }