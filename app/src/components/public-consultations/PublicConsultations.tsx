import { useState } from 'react';
import styles from '../../styles/HomePage.module.css'
import consultationsExample from './consultationsExample';
import Consultation from './Consultation';

interface PublicConsultationsProps {
  status: 'aberta' | 'encerrada'
}

export default function PublicConsultations({ status } : PublicConsultationsProps) {
  const [publicConsultations, setPublicConsultations] = useState(consultationsExample.publicConsultations);

  return (
    <div className={styles.publicConsultations}>
      {
        publicConsultations.map((consultation) => {
          if (consultation.status === status)
            return (
              <Consultation 
                key={consultation.id}
                obj={consultation}
              />
            )
        })
      }
    </div>
  )
}