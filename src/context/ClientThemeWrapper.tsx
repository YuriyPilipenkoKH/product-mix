'use client'
import React, { ReactNode, useContext } from 'react'
import ThemeContext from './ThemeContext'

const ClientThemeWrapper = ({children} : {children:ReactNode})=> {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("ClientThemeWrapper must be used within a ThemeProvider");
  }
  const { theme } = context;
  
  return (
    <div data-theme = {theme}>{children}</div>
  )
}

export default ClientThemeWrapper