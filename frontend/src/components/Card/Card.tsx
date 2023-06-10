import { getHours, isAfter } from 'date-fns'
import style from './Card.module.css'
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri'
import { useState } from 'react'
import ModalEdit from '../Modal/ModalEdit.tsx'

interface ISchedule {
  name: string
  phone: string
  date: Date
  id: string
}

const Card = ({ name, date, id, phone }: ISchedule) => {
  const isAfterDate = isAfter(new Date(date), new Date())
  const [openModal, setOpenModal] = useState<boolean>(false)
  const dateFormatted = new Date(date)
  const hour = getHours(dateFormatted)
  let phoneFormatted = phone.replace(/\D/g, '')
  phoneFormatted = phoneFormatted.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')

  const handleChangeModal = () => {
    setOpenModal(!openModal)
  }
  return (
    <>
      <div className={style.background}>
        <div>
          <span className={`${!isAfterDate && style.disabled}`}>{hour}h</span>
          <p>{name} - {phoneFormatted}</p>
        </div>
        <div className={style.icons}>
          <RiDeleteBinLine color="#EB2E2E" size={20} />
          <RiEditLine color="#5F68B1" size={20} onClick={() => isAfterDate && handleChangeModal()} />
        </div>
        <ModalEdit isOpen={openModal} handleChangeModal={handleChangeModal} hour={hour} name={name} />
      </div>
    </>
  )
}

export default Card