'use client';

import { useState, useEffect } from 'react';
import { PiHeadlightsBold } from "react-icons/pi";
import { LuLightbulb } from "react-icons/lu";
import { BsMoonStars } from "react-icons/bs";

export default function ThemeChanger() {
  const [mounted, setMounted] = useState<boolean>(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem('theme-mix') as 'light' | 'dark';
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    }
  }, []);
  useEffect(() => {
    // Save theme to localStorage and apply it
    localStorage.setItem('theme-mix', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  if (!mounted) return (
    <div className='placeholder w-9 h-9 bg-transparent'>
    </div>
  )

  return (
    <button
      className="btn btn-ghost"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <LuLightbulb /> :  <BsMoonStars/>}
    </button>
  );
}
