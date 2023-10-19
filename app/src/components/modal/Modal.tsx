import { ReactNode } from "react"
import styles from '../../styles/Modal.module.css'
import { createPortal } from "react-dom"

interface ModalProps {
  isOpen: boolean,
  updateModalIsOpen: (isOpen : boolean) => void,
  children: ReactNode
}

export default function Modal({
  isOpen,
  children
} : ModalProps) {
  return (
    <>
      {isOpen && createPortal(
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {children}
          </div>

          <span className={styles.closeButton}>
            x
          </span>
        </div>,
        document.querySelector('.App') as Element)}
    </>
  )
}