import { PautaInterface } from "../public-consultations/Consultation"
import styles from '../../styles/HomePage.module.css'
import { useState } from "react"

interface CommentsProps {
  pauta: PautaInterface
}

export default function Comments({ pauta } : CommentsProps) {
  const [seeComentarios, setSeeComentarios] = useState(false)

  if (!seeComentarios) {
    return (
      <div className={styles.comments}>
        <button
          className={styles.seeComments}
          onClick={() => setSeeComentarios(true)}
        >
          Ver comentários
        </button>
      </div>
    )
  }

  return (
    <div className={styles.comments}>
      {pauta.comentarios.map((comentario, i) => {
        return (
          <div key={`commentario${i}`} className={styles.comment}>
            <span className={styles.name}>
              {comentario.usuario.nome}
            </span>

            <span className={styles.text}>
              {comentario.comentario}
            </span>
          </div>
        )
      })}
    </div>
  )
}