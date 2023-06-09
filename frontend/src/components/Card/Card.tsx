import { getHours, isAfter } from 'date-fns'
import style from './Card.module.css'
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri'

interface ISchedule {
  name: string
  phone: string
  date: Date
  id: string
}

const Card = ({ name, date, id, phone }: ISchedule) => {
  const isAfterDate = isAfter(new Date(date), new Date())
  let phoneFormatted = phone.replace(/\D/g, '')
  phoneFormatted = phoneFormatted.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')

  console.log(isAfterDate);
  return (
    <div className={style.background}>
      <div>
        <span className={`${!isAfterDate && style.disabled}`}>{getHours(new Date(date))}h</span>
        <p>{name} - {phoneFormatted}</p>
      </div>
      <div className={style.icons}>
        <RiDeleteBinLine color="#EB2E2E" size={20} />
        <RiEditLine color="#5F68B1" size={20} />
      </div>
    </div>
  )
}

export default Card