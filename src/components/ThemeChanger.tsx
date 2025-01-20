'use client';

import { useState, useEffect } from 'react';
import { PiHeadlightsBold } from "react-icons/pi";
import { BsMoonStars } from "react-icons/bs";

export default function ThemeChanger() {
  const [mounted, setMounted] = useState<boolean>(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true)
    // Apply the theme to the HTML element
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
      className="btn btn-primary"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <PiHeadlightsBold/> :  <BsMoonStars/>}
    </button>
  );
}
