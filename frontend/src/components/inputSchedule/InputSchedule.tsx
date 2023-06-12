import style from './InputSchedule.module.css'
import { ForwardRefRenderFunction, ReactNode, forwardRef } from 'react'

interface IInput {
  placeholder: string
  type: 'password' | 'text' | 'date'
  error?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = ({ placeholder, type, error, ...rest }, ref) => {
  return (
    <div className={style.container}>
      <label htmlFor={placeholder}>
        {placeholder}
      </label>
      <input type={type} ref={ref} {...rest} name={placeholder} id={placeholder} />
      {error && <span>{error}</span>}
    </div>
  )
}

export const InputSchedule = forwardRef(InputBase)