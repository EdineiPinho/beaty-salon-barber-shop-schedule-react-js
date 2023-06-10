// import React from 'react'
import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/auth.ts'
import style from './ModalEdit.module.css'
import { AiOutlineClose } from 'react-icons/ai'
import { formatISO, getHours, parseISO, setHours } from 'date-fns'
import { api } from '../../server/Server.tsx'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'
// import { GiConfirmed, GiCancel } from 'react-icons/gi'

interface IModal {
  isOpen: boolean
  handleChangeModal: () => void
  hour: string
  name: string
  id: string
}

const ModalEdit = ({ isOpen, handleChangeModal, hour, name, id }: IModal) => {
  const { availableSchedules, schedules, date, handleSetDate } = useAuth()
  const [hourSchedule, setHourSchedule] = useState('')
  const currentValue = new Date().toISOString().split('T')[0]
  const filteredDate = availableSchedules.filter((hour) => {
    const isScheduleAvailable = !schedules.find((scheduleItem) => {
      const scheduleDate = new Date(scheduleItem.date)
      const schedulehour = getHours(scheduleDate)
      return schedulehour === Number(hour)
    })
    return isScheduleAvailable
  })

  const handleChangeHour = (hour: string) => {
    setHourSchedule(hour)
  }

  const updateData = async () => {
    const formattedDate = formatISO(setHours(parseISO(date), parseInt(hourSchedule)),)
    try {
      await api.put(`/schedules/${id}`, {
        date: formattedDate
      })
      toast.success('Atualizado com sucesso.')
      handleChangeModal()
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message)
      }
    }
  }

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
              <input
                id="date"
                type="date"
                defaultValue={currentValue}
                min={currentValue}
                onChange={(e) => handleSetDate(e.target.value)} />
            </div>
            <div className={style.input}>
              <label htmlFor="hour">Informe um novo horário</label>
              <select name="hour" id="hour" onChange={(e) => handleChangeHour(e.target.value)}>
                {filteredDate.map((hour, index) => {
                  return (
                    <option key={index} value={hour}>{hour}:00h</option>
                  )
                }
                )}
              </select>
            </div>
          </div>
          <div className={style.footer}>
            <button onClick={handleChangeModal}>Cancelar</button>
            <button onClick={updateData}>Editar</button>
          </div>
        </div>

      </div>
    )
  }
  return <></>
}

export default ModalEdit