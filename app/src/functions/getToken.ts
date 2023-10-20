export default function getToken() {
  if (localStorage) return (localStorage.getItem('econsultas-token'));
  window.alert('O dispositivo não possui localStorage :(');
  return '';
}