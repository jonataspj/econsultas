import { useEffect, useState } from 'react'
import styles from '../../styles/Sidebar.module.css'
import consultationsExample from '../public-consultations/consultationsExample';

interface hotPautas {
  text: string,
  consultation: string,
  qtContribuitions: number
}

export default function Sidebar() {
  const [publicConsultations, setPublicConsultations] = useState(consultationsExample.publicConsultations);
  const [hotPautas, setHotPautas] = useState<hotPautas[]>()

  useEffect(() => {
    setHotPautas([
      {
        text: publicConsultations[0].pautas[0].text,
        consultation: publicConsultations[0].id.toString(),
        qtContribuitions: 24
      },
      {
        text: publicConsultations[1].pautas[0].text,
        consultation: publicConsultations[1].id.toString(),
        qtContribuitions: 23
      },
      {
        text: publicConsultations[2].pautas[0].text,
        consultation: publicConsultations[2].id.toString(),
        qtContribuitions: 22
      },
    ])

  }, [])

  return (
    <div className={styles.sidebar}>
      <div className={styles.hotPautas}>
        <h4 className={styles.hotPautasH}>Pautas em Alta</h4>

        <div className={styles.pautas}>
          {hotPautas?.map((pauta) => {
            return (
              <div className={styles.pauta}>
                <p>
                  {pauta.text}
                </p>

                <strong>[ID CONSULTA = {pauta.consultation} ] - {pauta.qtContribuitions} Contribuições</strong>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}