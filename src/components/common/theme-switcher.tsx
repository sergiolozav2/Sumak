// src/components/ThemeSwitcher.jsx

import { Palette } from 'lucide-react'
import { useState, useEffect } from 'react'

// A helper function to get the initial theme from localStorage or fallback to a default
const getInitialTheme = () => {
  // Check if we are in a browser environment
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('theme')
    if (typeof storedPrefs === 'string') {
      return storedPrefs
    }
  }

  return 'my-light' // Default light theme
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState(getInitialTheme)

  const handleThemeChange = (e: any) => {
    const value = e.target.value
    setTheme(value)
    document.documentElement.setAttribute('data-theme', value)
    localStorage.setItem('theme', value)
  }

  return (
    <div className="dropdown dropdown-top">
      <button tabIndex={0} role="button" className="btn hidden xl:block">
        Theme
        <svg
          width="12px"
          height="12px"
          className="ml-1 inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </button>

      <button
        tabIndex={0}
        role="button"
        className="btn btn-rounded hidden sm:block xl:hidden"
      >
        <Palette />
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box z-50 mt-2 w-52 p-2 shadow-2xl"
      >
        {/* We add onChange and checked properties to the inputs */}
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Sumak Light"
            value="my-light"
            onChange={handleThemeChange}
            checked={theme === 'my-light'}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Sumak Dark"
            onChange={handleThemeChange}
            value="dark"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Nort"
            onChange={handleThemeChange}
            value="nort"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Caramellate"
            onChange={handleThemeChange}
            value="caramellatte"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Retro"
            value="retro"
            onChange={handleThemeChange}
            checked={theme === 'retro'}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Cyberpunk"
            value="cyberpunk"
            onChange={handleThemeChange}
            checked={theme === 'cyberpunk'}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Valentine"
            value="valentine"
            onChange={handleThemeChange}
            checked={theme === 'valentine'}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Aqua"
            value="aqua"
            onChange={handleThemeChange}
            checked={theme === 'aqua'}
          />
        </li>
      </ul>
    </div>
  )
}
