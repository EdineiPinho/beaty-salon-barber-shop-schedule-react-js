// import React from 'react'
import { useEffect } from 'react'
import { useAuth } from '../../hooks/auth.ts'
import style from './ModalEdit.module.css'
import { AiOutlineClose } from 'react-icons/ai'
import { getHours } from 'date-fns'
// import { GiConfirmed, GiCancel } from 'react-icons/gi'

interface IModal {
  isOpen: boolean
  handleChangeModal: () => void
  hour: string
  name: string
}

const ModalEdit = ({ isOpen, handleChangeModal, hour, name, handleSetDate }: IModal) => {
  const { availableSchedules, schedules, date } = useAuth()
  const currentDate = new Date().toISOString().split('T')[0]
  const filteredDate = availableSchedules.filter((hour) => {
    const isScheduleAvailable = !schedules.find((scheduleItem) => {
      const scheduleDate = new Date(scheduleItem.date)
      const schedulehour = getHours(scheduleDate)
      return schedulehour === Number(hour)
    })
    return isScheduleAvailable
  })
  console.log('Data filtrada: ', filteredDate);

  if (isOpen) {
    return (
      <div className={style.background}>
        <div className={style.modal}>
          <div className={style.header}>
            <h2>Editar Horário:</h2>
            <AiOutlineClose size={25} color="white" onClick={handleChangeModal} />
          </div>
          <div className={style.body}>
            <p>{hour}h {name}</p>
            <div className={style.input}>
              <label htmlFor="date">Informe uma nova data</label>
              <input id="date" type="date" defaultValue={currentDate} onChange={(e) => handleSetDate(e.target.value)} />
            </div>
            <div className={style.input}>
              <label htmlFor="hour">Informe um novo horário</label>
              <select name="hour" id="hour">
                <option value="">13:00</option>
                <option value="">13:00</option>
                <option value="">13:00</option>
                <option value="">13:00</option>
                <option value="">13:00</option>
              </select>
            </div>
          </div>
          <div className={style.footer}>
            <button onClick={handleChangeModal}>Cancelar</button>
            <button>Editar</button>
          </div>
        </div>

      </div>
    )
  }
  return <></>
}

export default ModalEdit