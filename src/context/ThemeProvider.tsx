"use client"
import React, { ReactNode, useState } from 'react'

function ThemeProvider({children} : {children:ReactNode}) {
  const [theme, setTheme] = useState('dark')
  const [isMounted, setIsMounted] = useState(false)
  return (
    <div>ThemeProvider</div>
  )
}

export default ThemeProvider
