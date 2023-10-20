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


// export interface ConsultationInterface {
//   id: number;
//   title: string;
//   introduction: string;
//   agency: string;
//   description: string;
//   pautas: PautaInterface[];
//   status: string
// }

// export interface PautaInterface {
//   id: number;
//   text: string;
//   votesSim: number;
//   votesNao: number;
//   comentarios: ComentarioInterface[];
// }

// export interface ComentarioInterface {
//   nome: string;
//   texto: string;
// }

interface ConsultationProps {
  obj: ConsultationInterface
}

const ConsultationContext = React.createContext<{
  consultation: ConsultationInterface | null,
  modalIsOpen: boolean
  updateModalIsOpen: ((isOpen: boolean) => void)
    }>({
      consultation: null,
      modalIsOpen: false,
      updateModalIsOpen: (isOpen: boolean) => {}
    });

export function useConsultationContext() {
  return useContext(ConsultationContext);
}

export default function Consultation({ obj } : ConsultationProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const updateModalIsOpen = (isOpen: boolean) => {
    setModalIsOpen(isOpen)
  }

  const qtContribuitions = getQtContribuitions(obj)
  const qtPautas = obj.pautas.length

  return (
    <ConsultationContext.Provider value={{
      consultation: obj,
      modalIsOpen,
      updateModalIsOpen
    }}>
      <div className={styles.consultation}>
        <h3 className={styles.consultationTitle}>
          {obj.titulo}
        </h3>

        <div className={styles.consultationPeriod}>
        11/11/1111 - 11/11/1111
        </div>

        <div className={styles.consultationIntroduction}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga iusto inventore amet quidem recusandae quam beatae hic nam, dolorem ex. Quam nisi debitis earum pariatur est vel, vitae porro illum.
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