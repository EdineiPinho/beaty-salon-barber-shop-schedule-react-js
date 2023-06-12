import { useForm } from 'react-hook-form'
import Header from '../components/Header/Header.tsx'
import { InputSchedule } from '../components/inputSchedule/InputSchedule.tsx'
import style from './Schedules.module.css'
import { useAuth } from '../hooks/auth.ts'
import { formatISO, getHours, parseISO, setHours } from 'date-fns'
import { api } from '../server/Server.tsx'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

interface IFormValues {
  date: string
  name: string
  phone: string
  hour: string

}

const Schedules = () => {
  const { register, handleSubmit } = useForm<IFormValues>()
  const { availableSchedules, schedules, handleSetDate } = useAuth()
  const navigate = useNavigate()
  const currentValue = new Date().toISOString().split('T')[0]

  const filteredDate = availableSchedules.filter((hour) => {
    const isScheduleAvailable = !schedules.find((scheduleItem) => {
      const scheduleDate = new Date(scheduleItem.date)
      const schedulehour = getHours(scheduleDate)
      return schedulehour === Number(hour)
    })
    return isScheduleAvailable
  })

  const submit = handleSubmit(async ({ name, phone, date, hour }) => {
    const formattedDate = formatISO(
      setHours(parseISO(date), parseInt(hour)),)
    try {
      await api.post(`/schedules/`, {
        name,
        phone,
        date: formattedDate
      })
      toast.success('Atualizado com sucesso.')
      navigate('/dashboard')
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message)
      }
    }
  })

  const handleChangeHour = (hour: string) => {
    setHourSchedule(hour)
  }

  return (
    <div className={`${style.container} container`}>
      <Header />
      <h2>        Agendamento de Horário      </h2>
      <div className={style.formDiv}>
        <form onSubmit={submit}>
          <InputSchedule
            placeholder='Nome do Cliente'
            type='text'
            {...register('name', { required: true })}
          />
          <InputSchedule
            placeholder='Celular'
            type='text'
            {...register('phone', { required: true })}
          />
          <div className={style.date}>
            <InputSchedule
              placeholder='Dia'
              type='date'
              {...register('date',
                { required: true, value: currentValue, onChange: (e) => handleSetDate(e.target.value) })}
            />
            <div className={style.select}>
              <label htmlFor="hora">Hora</label>
              <select {...register('hour', { required: true, })} >
                {filteredDate.map((hour, index) => {
                  return (
                    <option key={index} value={hour}>{hour}:00h</option>
                  )
                })}
              </select>
            </div>

          </div>

          <div className={style.footer}>
            <button>Cancelar</button>
            <button >Editar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Schedules