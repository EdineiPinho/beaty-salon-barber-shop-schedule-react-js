import style from './Header.module.css'
import logo from '../../assets/logo_branca.png'
import { CgProfile } from 'react-icons/cg'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../hooks/auth.ts'

const Header = () => {
  const { signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <header className={style.background}>
      <div className={style.image} onClick={() => navigate('/dashboard')}>
        <img src={logo} alt="logo da loja" />
        <span>Hero HairDresses</span>
      </div>
      <div className={style.profile}>
        <div className={style.dropdown} onClick={() => setOpen(!open)}>
          <CgProfile size={20} />
          <span>Perfil</span>
          {open && (
            <ul className={`${style.dropdownMenu} ${open && style.open}`}>
              <Link to={'/schedules'}><li className={style.dropdownMenuItem} >Agendamentos</li></Link>
              <Link to={'/edit-profile'}><li className={style.dropdownMenuItem}>Editar Perfil</li></Link>
              <Link to={'/'}><li className={style.dropdownMenuItem}>Sair</li></Link>
            </ul>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header