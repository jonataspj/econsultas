import styles from '../../styles/HomePage.module.css'
import { useConsultationContext } from '../public-consultations/Consultation'
import Pauta from './Pauta'

export default function Pautas() {
  const {consultation} = useConsultationContext()

  return (
    <div className={styles.pautas}>
      <h4 className={styles.pautasH}>Pautas</h4>
      
      {consultation?.pautas.map((pauta) => {
        return (
          <Pauta key={pauta.id} obj={pauta}/>
        )
      })}
    </div>
  )
}