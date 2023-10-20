import PublicConsultations from '../components/public-consultations/PublicConsultations'
import styles from '../styles/HomePage.module.css'

export default function ClosedConsultations() {
  return (
    <div className={styles.homePage}>

      <h2 className={styles.consultasAbertas}>Consultas Fechadas</h2>

      <PublicConsultations status={'Encerrada'} />

    </div>
  )
}