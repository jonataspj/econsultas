import { useState } from 'react';
import getToken from '../../functions/getToken';
import api from '../../services/api';
import styles from '../../styles/HomePage.module.css'
import { PautaInterface, useConsultationContext } from '../public-consultations/Consultation'
import Comments from './Comments'

interface PautaProps {
  obj: PautaInterface
}

export default function Pauta({ obj } : PautaProps) {
  const [comment, setComment] = useState("")

  const {getForms} = useConsultationContext()

  const total = obj.votos_sim + obj.votos_nao;

  const votar = (voto:boolean) => {
    const params = new URLSearchParams();
    params.append('voto', voto?'true':'false');
    api.post(`/consultas/pauta/${obj.id}/votar?voto=${voto?'true':'false'}`,
     params,
     { headers: { Authorization: `Bearer ${getToken()}` } }
    )
    .then(() => {
      getForms();
    })
    .catch(() => {
      console.log('Erro ao votar')
    })
  }

  const commentar = () => {
    api.post(`/consultas/pauta/${obj.id}/comentar`,
    {
      "comentario" : comment
    },
     { headers: { Authorization: `Bearer ${getToken()}` }},
     )
    .then(() => {
      getForms();
      setComment("")
    })
    .catch(() => {
      console.log('Erro ao votar')
    })
  }
    
  return (
    <div className={styles.pauta}>

      {
        obj.votos_sim != null && (
          <div className={styles.percentBar}>
            <span className={styles.yes} style={{flex:obj.votos_sim}}></span>
            <span className={styles.no} style={{flex:obj.votos_nao}}></span>
          </div>
        )
      }

      <header>
        <h5 className={styles.pautaTexto}>{obj.texto}</h5>

        {
          obj.votos_sim != null && (
            <div className={styles.votos}>
                <button className={styles.votoSimButton} onClick={() => votar(true)} >
                  <i className="fa-solid fa-thumbs-up"></i>
                  <span>{obj.votos_sim}</span>
                </button>

                <button type='submit' className={styles.votoNaoButton} onClick={() => votar(false)}>
                  <i className="fa-solid fa-thumbs-down"></i>
                  <span>{obj.votos_nao}</span>
                </button>
            </div>
          )
        }
      </header>

      <Comments pauta={obj} />

      <div className={styles.giveAComment}>
        <input type="text" name="" id="" placeholder="Deixe uma contribuição" value={comment} onChange={(e) => setComment(e.target.value)}/>
        <button onClick={commentar}>Enviar</button>
      </div>
    </div>
  )
}