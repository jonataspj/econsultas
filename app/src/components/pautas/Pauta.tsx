import styles from '../../styles/HomePage.module.css'
import { PautaInterface } from '../public-consultations/Consultation'
import Comments from './Comments'

interface PautaProps {
  obj: PautaInterface
}

export default function Pauta({ obj } : PautaProps) {

  const total = obj.votos_sim + obj.votos_nao;

  const porcentagem1 = (obj.votos_sim / total) * 100;
  const porcentagem2 = (obj.votos_nao / total) * 100;

  return (
    <div className={styles.pauta}>
      <div className={styles.percentBar}>
        <span className={styles.yes} style={{flex:obj.votos_sim}}></span>
        <span className={styles.no} style={{flex:obj.votos_nao}}></span>
      </div>
      <header>
        <h5 className={styles.pautaTexto}>{obj.texto}</h5>
        <div className={styles.votos}>
          <button className={styles.votoSimButton}>
            <i className="fa-solid fa-thumbs-up"></i>
            <span>{obj.votos_sim}</span>
          </button>

          <button className={styles.votoNaoButton}>
            <i className="fa-solid fa-thumbs-down"></i>
            <span>{obj.votos_nao}</span>
          </button>
        </div>
      </header>

      <Comments pauta={obj} />

      <div className={styles.giveAComment}>
        <input type="text" name="" id="" placeholder="Deixe uma contribuição"/>
      </div>
    </div>
  )
}