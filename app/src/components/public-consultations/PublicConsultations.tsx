import { useEffect, useState } from 'react';
import styles from '../../styles/HomePage.module.css'
import consultationsExample from './consultationsExample';
import Consultation, { ConsultationInterface } from './Consultation';
import api from '../../services/api';
import getToken from '../../functions/getToken';

interface PublicConsultationsProps {
  status: 'Em Aberto' | 'Encerrada'
}

export default function PublicConsultations({ status } : PublicConsultationsProps) {
  const [publicConsultations, setPublicConsultations] = useState<ConsultationInterface[]>([]);
  const [mounted, setMounted] = useState(false)

  console.log(publicConsultations)

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
    // setTimeout(() => {
      getForms()
      setMounted(true)
    // }, 1000)
  },[])

  // if (!mounted ||!publicConsultations) return null

  console.log("oi" + publicConsultations.length)


  return (
    <div className={styles.publicConsultations}>
      {
        publicConsultations.map((consultation) => {
          if (consultation.status === status)
            return (
              <Consultation 
                key={consultation.id}
                obj={consultation}
                getForms={getForms}
              />
            )

          return null
        })
      }
    </div>
  )
}