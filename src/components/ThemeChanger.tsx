'use client';

import { useState, useEffect } from 'react';
import { LuLightbulb } from "react-icons/lu";
import { BsMoonStars } from "react-icons/bs";

export default function ThemeChanger() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Initial theme from localStorage (before React mounts)
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme-mix') as 'light' | 'dark';
      if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
        return storedTheme;
      }
    }
    return 'light';
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Save theme to localStorage and apply it
    localStorage.setItem('theme-mix', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  if (!mounted) {
    // Placeholder to avoid layout shift 
    return  <div className="placeholder w-9 h-9 bg-transparent"></div>
  }

  return (
    <button
      className="btn btn-ghost text-[var(--text-color)]"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <LuLightbulb /> : <BsMoonStars />}
    </button>
  );
}
