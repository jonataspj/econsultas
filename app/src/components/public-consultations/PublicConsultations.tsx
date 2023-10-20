import { useEffect, useState } from 'react';
import styles from '../../styles/HomePage.module.css'
import consultationsExample from './consultationsExample';
import Consultation, { ConsultationInterface } from './Consultation';
import api from '../../services/api';
import getToken from '../../functions/getToken';

interface PublicConsultationsProps {
  status: 'aberta' | 'encerrada'
}

export default function PublicConsultations({ status } : PublicConsultationsProps) {
  const [publicConsultations, setPublicConsultations] = useState<ConsultationInterface[]>();
  const [mounted, setMounted] = useState(false)

  async function getForms() {
    await api.get('/consultas/')
    .then((response) => {
      const { data } = response;
  
      console.log(data)
      setPublicConsultations(data)
    })
    .then((error) => {
      // window.alert("Erro ao buscar consultas na API.")
      console.log('Erro ao buscar consultas na API.')
    })

  }
  useEffect(() => {
    getForms()
    setMounted(true)
  }, [])

  if (!mounted ||!publicConsultations) return null

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

          return null
        })
      }
    </div>
  )
}