import { ConsultationInterface } from "../components/public-consultations/Consultation";

export function getQtContribuitions(consultation : ConsultationInterface ) {
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

  return qtContribuitions
}