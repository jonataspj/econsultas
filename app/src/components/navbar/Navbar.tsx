import styles from '../../styles/Navbar.module.css'
import logoGoverno from '../../images/logo governo do tocantins.png'
import { Link } from 'react-router-dom'
import NavbarItem from './NavbarItem'
import Login from '../login/Login'

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link to={'/'}>
        <img
          className={styles.logoGoverno}
          src={logoGoverno}
          alt="not found"
        />
      </Link>

      <NavbarItem icon='fa-solid fa-house' text='Consultas Abertas' path='/' />
      <NavbarItem icon='fa-solid fa-house' text='Consultas Encerradas' path='/closedconsultations' />
      {/* <NavbarItem icon='fa-solid fa-house' text='Gerenciar Consultas' path='/manageconsultations' /> */}

      <Login />
    </div>
  )
}