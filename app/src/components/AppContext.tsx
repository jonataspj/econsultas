import { ReactNode, useEffect, useState } from 'react'

interface AppContextProps {
  children: ReactNode
}

export default function AppContext({ children } : AppContextProps) {
  return (
    <>
      {children}
    </>
  )
}