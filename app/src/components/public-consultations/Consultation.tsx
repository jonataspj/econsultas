import { useState } from 'react'
import styles from '../../styles/HomePage.module.css'
import { createPortal } from 'react-dom'
import Modal from '../modal/Modal'

interface ConsultationInterface {
  id: number,
  title: string,
  introduction: string,
  agency: string,
  description: string,
  agendas: string[]
}

interface ConsultationProps {
  obj: ConsultationInterface
}

export default function Consultation({ obj } : ConsultationProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const updateModalIsOpen = (isOpen: boolean) => {
    setModalIsOpen(isOpen)
  }

  return (
    <>
      <div className={styles.consultation}>
        <div className={styles.consultationTitle}>
          {obj.title}
        </div>

        <div className={styles.consultationPeriod}>
        11/11/1111 - 11/11/1111
        </div>

        <div className={styles.consultationIntroduction}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga iusto inventore amet quidem recusandae quam beatae hic nam, dolorem ex. Quam nisi debitis earum pariatur est vel, vitae porro illum.
        </div>

        <div className={styles.consultationContributions}>
          100 Contribuições
        </div>

        <div
          className={styles.consultationPautas}
          onClick={() => updateModalIsOpen(true)}
        >
          Ver todas as 10 pautas
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        updateModalIsOpen={updateModalIsOpen}
      >
        kkkkkkkkkkkkk
      </Modal>

    </>
  )
}