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
  // if (!isMounted) {
  //   return <h1>Loading....</h1>
  // }
  const changeTheme =(theme:string) => {
    setTheme(theme)
    localStorage.setItem("theme", theme)
  }
  
  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme,
      isMounted,
      setIsMounted,
      changeTheme
      }}>
      {children}
    </ThemeContext.Provider>
  )
}


export default ThemeProvider
