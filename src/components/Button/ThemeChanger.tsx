"use client"
import ThemeContext, { ThemeTypes } from "@/context/ThemeContext";
import { useContext, useState } from "react";
import { FlatBtn } from "./Button";
import { ImCross } from "react-icons/im";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ThemeChanger = () => {
  const [open, setOpen] = useState(false)
  const {theme, setTheme, changeTheme} =  useContext(ThemeContext as React.Context<ThemeTypes>)
  return (
    <>
    {open ? (
      <div className="theme-changer flex flex-col gap-1  ">
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

          <FlatBtn 
          className="close-theme absolute top-[-8px] right-[-8px]"
          onClick={()=>setOpen(!open)}>
          <AiOutlineCloseCircle />
          </FlatBtn>
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