import Modal from "../modal/Modal";
import { useConsultationContext } from "./Consultation";
import styles from '../../styles/HomePage.module.css'
import Pautas from "../pautas/Pautas";

export default function ConsultationModal() {
  const {
    consultation,
    modalIsOpen,
    updateModalIsOpen
  } = useConsultationContext()

  const totalComments = consultation?.pautas.reduce((accumulator, pauta) => {
    return accumulator + pauta.comentarios.length;
  }, 0);

  const totalVotes = consultation?.pautas.reduce(
    (accumulator, pauta) => {
      return {
        votosSim: accumulator.votosSim + pauta.votos_sim,
        votosNao: accumulator.votosNao + pauta.votos_nao
      };
    },
    { votosSim: 0, votosNao: 0 }
  );

  let qtContribuitions = (totalComments || 0) + 
    (totalVotes?.votosSim || 0)  + 
    (totalVotes?.votosNao || 0)


  return (
    <Modal
        isOpen={modalIsOpen}
        updateModalIsOpen={updateModalIsOpen}
      >
        <div className={styles.consultationModal}>
          <header>
            <h2 className={styles.consultationTitleModal}>
              {consultation?.titulo}
            </h2>

            <div className={styles.consultationInfoModal}>
              <p>
                <strong>ID:</strong>
                <span>{consultation?.id}</span>
              </p>

              <p>
                <strong>Período:</strong>
                <span>{consultation?.data_inicial} - {consultation?.data_termino}</span>
              </p>

              <p>
                <strong>Orgão:</strong>
                <span>{consultation?.orgao}</span>
              </p>

              <p>
                <strong>Contribuições:</strong>
                <span>{qtContribuitions}</span>
              </p>
            </div>

            <hr />
          </header>

          <details className={styles.consultationDescription}>
            <summary>Descrição</summary>
            <pre className={styles.consultationDescriptionContent}>
              {consultation?.descricao}
            </pre>
          </details>

          <Pautas />

        </div>
      </Modal>
  )
}
