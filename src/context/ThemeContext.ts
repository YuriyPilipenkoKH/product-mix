import  { createContext, Dispatch } from "react";

export interface ThemeTypes  {
  theme: string
  setTheme : Dispatch<string>
  isMounted : boolean
  setIsMounted: Dispatch<boolean>
  changeTheme: Dispatch<string> 
}

export const ThemeContext =  createContext<ThemeTypes | null>(null);
export default ThemeContext