"use client"
import React, { ReactNode, useState } from 'react'
import ThemeContext from './ThemeContext'

function ThemeProvider({children} : {children:ReactNode}) {
  const [theme, setTheme] = useState('dark')
  const [isMounted, setIsMounted] = useState(false)
  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme,
      isMounted,
      setIsMounted
      }}>
      {children}
    </ThemeContext.Provider>
  )
}


export default ThemeProvider
