import { useState } from 'react'
import styles from '../../styles/Navbar.module.css'
import { createPortal } from 'react-dom'
import Modal from '../modal/Modal'
import LoginInsideModal from './LoginInsideModal'

export default function Login() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const updateModalIsOpen = (isOpen: boolean) => {
    setModalIsOpen(isOpen)
  }


  return (
    <>
      <button
        className={styles.loginButton}
        onClick={() => updateModalIsOpen(true)}
      >
        Fazer login
      </button>

      {modalIsOpen && createPortal(
        <Modal
          isOpen={modalIsOpen}
          updateModalIsOpen={updateModalIsOpen}
        >
          <LoginInsideModal updateModalIsOpen={updateModalIsOpen}/>
        </Modal>,
        document.querySelector('.App') as Element)}
    </>
  )
}