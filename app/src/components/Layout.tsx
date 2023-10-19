import { Outlet } from 'react-router-dom'
import styles from '../styles/Layout.module.css'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'

export default function Layout() {
  return (
    <div className={styles.layout}>
      <div className={styles.navbarWrapper}>
        <Navbar />
      </div>

      <div className={styles.mainWrapper}>
        <Outlet />
      </div>

      <div className={styles.sidebarWrapper}>
        <Sidebar />
      </div>
    </div>
  )
}