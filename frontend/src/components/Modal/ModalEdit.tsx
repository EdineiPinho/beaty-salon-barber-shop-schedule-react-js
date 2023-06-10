// import React from 'react'
import style from './ModalEdit.module.css'
import { AiOutlineClose } from 'react-icons/ai'
// import { GiConfirmed, GiCancel } from 'react-icons/gi'

interface IModal {
  isOpen: boolean
  handleChangeModal: () => void
  hour: string
  name: string
}

const ModalEdit = ({ isOpen, handleChangeModal, hour, name }: IModal) => {
  const currentDate = new Date().toISOString().split('T')[0]
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
              <input id="date" type="date" defaultValue={currentDate} />
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