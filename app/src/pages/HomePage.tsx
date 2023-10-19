import PublicConsultations from '../components/public-consultations/PublicConsultations'
import styles from '../styles/HomePage.module.css'

export default function HomePage() {
  return (
    <div className={styles.homePage}>

      <PublicConsultations />

    </div>
  )
}