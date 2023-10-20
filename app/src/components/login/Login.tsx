import { useState } from 'react'
import styles from '../../styles/Navbar.module.css'
import { createPortal } from 'react-dom'
import Modal from '../modal/Modal'
import LoginInsideModal from './LoginInsideModal'

interface Usuario {
  nickname: string;
  nome: string;
  sobrenome: string;
  cpf: string;
  genero: string;
  cep: string;
  cidade: string;
  uf: string;
  data_nascimento: string; // ou Date se preferir
  id: string;
}


export default function Login() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [user, setUser] = useState<Usuario>()

  const updateModalIsOpen = (isOpen: boolean) => {
    setModalIsOpen(isOpen)
  }

  const updateUser = (user: any) => {
    setUser(user)
  }

  console.log(user)
  if (user) {
    return <button className={styles.loginButton}>
      <strong>Usuário = </strong>
      {user.nome as string}
    </button>
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
          <LoginInsideModal updateModalIsOpen={updateModalIsOpen} updateUser={updateUser}/>
        </Modal>,
        document.querySelector('.App') as Element)}
    </>
  )
}