import style from './Login.module.css'
import logo from '../../assets/logo.webp'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../../components/Input/Input.tsx'
import { Button } from '../../components/Button/Button.tsx'
import { Link } from 'react-router-dom'
import { RiLockPasswordLine } from 'react-icons/ri'
import { MdOutlineAlternateEmail } from 'react-icons/md'
// import { api } from '../../server/Server.tsx'
import { useAuth } from '../../hooks/auth.ts'

interface IFormValues {
  email: string
  password: string
}

export function Login() {
  const { signIn } = useAuth()
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Digite um email válido.')
      .required('Campo de email obrigatório'),
    password: yup
      .string()
      .required('Digite uma senha')
  })

  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>({ resolver: yupResolver(schema) })

  const submit = handleSubmit(async ({ email, password }) => {
    try {
      const result = await signIn({ email, password })
      console.log(result);
    } catch (error) {
      console.log('Erro de submit: ', error);
    }
  })

  return (
    <div className={style.background}>
      <div className={`container ${style.container}`}>
        <div className={style.wrapper}>
          <div>
            <img src={logo} alt="" />
          </div>
          <div className={style.card}>
            <h2>Olá! Seja Bem Vindo!</h2>
            <form onSubmit={submit}>
              <Input
                placeholder='Email'
                type='text'
                {...register('email', { required: true })}
                error={errors.email && errors.email.message}
                icon={<MdOutlineAlternateEmail size={20} />}
              />
              <Input
                placeholder='Senha'
                type='password'
                {...register('password', { required: true })}
                error={errors.password && errors.password.message}
                icon={<RiLockPasswordLine size={20} />}
              />
              <Button text='Entrar' />
            </form>
            <div className={style.register}>
              <span>
                Ainda não tem conta?
                <Link to={'/register'}>Cadastre-se</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}