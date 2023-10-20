import { ReactNode, useEffect } from "react"
import styles from '../../styles/Modal.module.css'

interface ModalProps {
  isOpen: boolean,
  updateModalIsOpen: (isOpen : boolean) => void,
  children: ReactNode
}

export default function Modal({
  isOpen,
  updateModalIsOpen,
  children
} : ModalProps) {

  const closeModal = () => {
    document.querySelector('html')?.classList.remove('modalIsOpen');
    updateModalIsOpen(false)
  }

  useEffect(() => {
    const element = document.querySelector(`.${styles.modal}`) as HTMLElement;
    if (element) {
      element.focus();
    }
    document.querySelector('html')?.classList.add('modalIsOpen');
  })

  return (
    <>
        <div
          className={`${styles.modal}`}
          tabIndex={0}
          role="button"
        >
          <div className={styles.modalContentWrapper}>
            <div className={styles.modalContent}>
              {children}

              <button
                className={styles.closeButton}
                onClick={closeModal}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div style={{height: '30px'}}></div>
          </div>

        </div>
    </>
  )
}