"use client"
import React, { ReactNode, useEffect, useState } from 'react'
import ThemeContext from './ThemeContext'

function ThemeProvider({children} : {children:ReactNode}) {
  const [theme, setTheme] = useState('dark')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const storedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(storedTheme)
      }, [])
  
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
