import React, { createContext, Dispatch } from "react";


export const ThemeContext =  createContext(null)

export interface ThemeTypes  {
  theme: string
  setTheme : Dispatch<string>
  isMounted : boolean
  setIsMounted: Dispatch<boolean>
}