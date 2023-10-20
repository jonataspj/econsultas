import { useState } from 'react';
import styles from '../../styles/HomePage.module.css'
import consultationsExample from './consultationsExample';
import Consultation from './Consultation';

export default function PublicConsultations() {
  const [publicConsultations, setPublicConsultations] = useState(consultationsExample.publicConsultations);
  
  return (
    <div className={styles.publicConsultations}>
      {
        publicConsultations.map((consultation) => {
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