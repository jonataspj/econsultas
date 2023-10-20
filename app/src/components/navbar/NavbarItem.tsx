import { Link, useLocation } from "react-router-dom"
import styles from '../../styles/Navbar.module.css'


interface NavbarItemProps {
  icon: string,
  text: string,
  path: string
}

export default function NavbarItem({ icon, text, path } : NavbarItemProps) {

  const location = useLocation();
  
  const isCurrent = location.pathname === path;

  return (
    <Link to={path}>
      <div className={`${styles.navbarItem} ${isCurrent && styles.isCurrent}`}>
        <i className={icon}></i>
        <span>{text}</span>
      </div>
    </Link>
  )
}