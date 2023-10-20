import { CSSProperties } from "react";

export default function Page404() {
  const myStyle: CSSProperties = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
  };
  
  return (
    <div style={myStyle}>
      <h2>404</h2>
      <div style={{ height: '40px', border: '1px solid' }} />
      <h4>Página não encontrada</h4>
    </div>
  )
}