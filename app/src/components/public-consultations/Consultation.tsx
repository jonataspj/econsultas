import { useContext, useState } from 'react'
import styles from '../../styles/HomePage.module.css'
import { createPortal } from 'react-dom'
import Modal from '../modal/Modal'
import ConsultationModal from './ConsultationModal'
import React from 'react'
import { getQtContribuitions } from '../../functions/getQtContribuitions'

export interface ComentarioInterface {
  comentario: string;
  id: string;
  usuario: {
    nickname: string;
    nome: string;
    sobrenome: string;
    cpf: string;
    genero: string;
    cep: string;
    cidade: string;
    uf: string;
    data_nascimento: string; // ou Date se preferir
    id: string;
  };
}
export interface PautaInterface {
  texto: string;
  id: string;
  comentarios: ComentarioInterface[];
  votos_sim: number;
  votos_nao: number;
}

export interface ConsultationInterface {
  titulo: string;
  descricao: string;
  detalhes: string;
  orgao: string;
  status: string;
  data_inicial: string; // ou Date se preferir
  data_termino: string; // ou Date se preferir
  id: string;
  pautas: PautaInterface[];
}

interface ConsultationProps {
  obj: ConsultationInterface,
  getForms: () => void
}

const ConsultationContext = React.createContext<{
  consultation: ConsultationInterface | null,
  modalIsOpen: boolean
  updateModalIsOpen: ((isOpen: boolean) => void),
  getForms: () => void
    }>({
      consultation: null,
      modalIsOpen: false,
      updateModalIsOpen: (isOpen: boolean) => {},
      getForms: () => {}
    });

export function useConsultationContext() {
  return useContext(ConsultationContext);
}

export default function Consultation({ obj, getForms } : ConsultationProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const updateModalIsOpen = (isOpen: boolean) => {
    setModalIsOpen(isOpen)
  }

  const qtContribuitions = getQtContribuitions(obj)
  const qtPautas = obj.pautas.length

  console.log('a')

  return (
    <ConsultationContext.Provider value={{
      consultation: obj,
      modalIsOpen,
      updateModalIsOpen,
      getForms: getForms
    }}>
      <div className={styles.consultation}>
        <h3 className={styles.consultationTitle}>
          {obj.titulo}
        </h3>

        <div className={styles.consultationPeriod}>
          {obj.data_inicial} - {obj.data_termino}
        </div>

        <div className={styles.consultationIntroduction}>
          {obj.descricao}
        </div>

        <div className={styles.consultationContributions}>
          {qtContribuitions} Contribuições
        </div>

        <button
          className={styles.consultationPautas}
          onClick={() => updateModalIsOpen(true)}
        >
          {
            qtPautas == 1
              ? "Ver Pauta"
              : `Ver todas as ${qtPautas} pautas`
          }
        </button>
      </div>

      {modalIsOpen && createPortal(
        <ConsultationModal />,
        document.querySelector('.App') as Element)}

    </ConsultationContext.Provider>
  )
}