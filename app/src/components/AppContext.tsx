import { ReactNode, useEffect, useState } from 'react'

interface AppContextProps {
  children: ReactNode
}

export default function AppContext({ children } : AppContextProps) {

  // ! for test only//to avoid 
  const [token, setToken] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("econsultas") == 'econsultas')
      setToken(true)
  }, [])
  if (!token) return null;


  return (
    <>
      {children}
    </>
  )
}