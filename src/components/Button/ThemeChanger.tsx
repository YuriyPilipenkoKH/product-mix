"use client"
import ThemeContext, { ThemeTypes } from "@/context/ThemeContext";
import { useContext, useState } from "react";

const ThemeChanger = () => {
  const [open, setOpen] = useState(false)
  const {theme, setTheme, changeTheme} =  useContext(ThemeContext as React.Context<ThemeTypes>)
  return (
    <>
    {open ? (
      <div className="flex flex-col gap-1 ">
        <button
         className="btn"
         onClick={()=>changeTheme('light')}
        >
          light
          </button>
        <button
         className="btn"
         onClick={()=>changeTheme('dark')}
        >
          dark
          </button>
        <button
         className="btn"
         onClick={()=>changeTheme('aqua')}
        >
          aqua
          </button>
        <button
         className="btn"
         onClick={()=>changeTheme('din')}
        >
          din
          </button>
      </div>
    ) : (
      <div>
        <button onClick={()=>setOpen(!open)}>theme</button>
      </div>
    )}
    </>
  )
}

export default ThemeChanger