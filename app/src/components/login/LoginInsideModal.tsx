import { useState } from 'react'
import styles from '../../styles/Navbar.module.css'
import api from '../../services/api'
import axios from 'axios'
import { url } from 'inspector'
import qs from 'qs'

interface LoginInsideModalProps {
  updateModalIsOpen: (isOpen:boolean) => void
}

export default function LoginInsideModal({ updateModalIsOpen } : LoginInsideModalProps) {
  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")

  const login = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append('username', usuario);
    params.append('password', senha);
    api.post('/token', params)
    .then((response) => {
      const { data } = response;

      localStorage.setItem("ecomerce-token", data.access_token)

      console.log(localStorage.getItem('ecomerce-token'))
      updateModalIsOpen(false)
    })
    .catch((error) => {
      window.alert("Erro ao fazer login!")
    });

  }

  
  return (
    <form className={styles.loginModal} onSubmit={login}>
      <h3>Faça Login</h3>

      <div className={styles.usuario}>
        <label htmlFor="loginUser">
          <i className="fa-solid fa-user"></i>
          Usuário
        </label>
        <input type="text" id='loginUser' value={usuario} onChange={(e) => setUsuario(e.target.value)} />
      </div>

      <div className={styles.senha}>
        <label htmlFor="loginPassword">
          <i className="fa-solid fa-lock"></i>
          Senha
        </label>
        <input type="password" id='loginPassword' value={senha} onChange={(e) => setSenha(e.target.value)} />
      </div>

      <div className={styles.submit}>
        <button type="submit">Entrar</button>
      </div>
    </form>
  )
}