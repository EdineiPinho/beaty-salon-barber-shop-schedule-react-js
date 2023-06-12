import React from 'react'
import style from './EditProfile.module.css'
import Header from '../../components/Header/Header.tsx'
import { InputSchedule } from '../../components/inputSchedule/InputSchedule.tsx'


const EditProfile = () => {

  return (
    <div className='container'>
      <Header />
      <div className={style.formDiv}>
        <form>
          <InputSchedule placeholder='Nome' type='text' />
        </form>
      </div>
    </div>
  )
}

export default EditProfile