"use client"
import ThemeContext, { ThemeTypes } from "@/context/ThemeContext";
import { useContext, useState } from "react";
import { FlatBtn } from "./Button";
import { SlClose } from "react-icons/sl";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { FaRegMoon } from "react-icons/fa6";
import { MdOutlineWaterDrop } from "react-icons/md";

const ThemeChanger = () => {
  const [open, setOpen] = useState(false)
  const {theme,  changeTheme} =  useContext(ThemeContext as React.Context<ThemeTypes>)
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
          <SlClose />
          </FlatBtn>
      </div>
    ) : (
      <div>
        <button onClick={()=>setOpen(!open)}>
          {theme === 'light' && <HiOutlineLightBulb/>}
          {theme === 'dark' && <FaRegMoon/>}
          {theme === 'aqua' && <MdOutlineWaterDrop/>}
        </button>
      </div>
    )}
    </>
  )
}

export default ThemeChanger