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
        votosSim: accumulator.votosSim + pauta.votesSim,
        votosNao: accumulator.votosNao + pauta.votesNao
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
              {consultation?.title}
            </h2>

            <div className={styles.consultationInfoModal}>
              <p>
                <strong>Período:</strong>
                <span>11/11/1111 - 11/11/1111</span>
              </p>

              <p>
                <strong>Orgão:</strong>
                <span>{consultation?.agency}</span>
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
              {consultation?.description}
            </pre>
          </details>

          <Pautas />

        </div>
      </Modal>
  )
}
