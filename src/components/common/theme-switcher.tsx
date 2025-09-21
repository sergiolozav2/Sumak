// src/components/ThemeSwitcher.jsx

import { Palette } from 'lucide-react'
import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import type {
  ReactNode} from 'react';

// Theme type definition
interface Theme {
  label: string
  name: string
  isDark: boolean
}

// Themes array
export const themes: Array<Theme> = [
  { label: 'Sumak Light', name: 'my-light', isDark: false },
  { label: 'Sumak Dark', name: 'dark', isDark: true },
  { label: 'Nord', name: 'nord', isDark: true },
  { label: 'Caramellatte', name: 'caramellatte', isDark: false },
  { label: 'Retro', name: 'retro', isDark: false },
  { label: 'Cyberpunk', name: 'cyberpunk', isDark: true },
  { label: 'Valentine', name: 'valentine', isDark: false },
  { label: 'Aqua', name: 'aqua', isDark: false },
]

// Theme context type
interface ThemeContextType {
  currentTheme: Theme
  setTheme: (theme: Theme) => void
  themes: Array<Theme>
}

// Create the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Theme provider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  // A helper function to get the initial theme from localStorage or fallback to a default
  const getInitialTheme = (): Theme => {
    // Check if we are in a browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('theme')
      if (typeof storedPrefs === 'string') {
        const foundTheme = themes.find((theme) => theme.name === storedPrefs)
        if (foundTheme) {
          return foundTheme
        }
      }
    }
    return themes[0] // Default to first theme (Sumak Light)
  }

  const [currentTheme, setCurrentTheme] = useState<Theme>(getInitialTheme)

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme)
    document.documentElement.setAttribute('data-theme', theme.name)
    localStorage.setItem('theme', theme.name)
  }

  // Set initial theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme.name)
  }, [currentTheme.name])

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function ThemeSwitcher() {
  const { currentTheme, setTheme, themes } = useTheme()

  const handleThemeChange = (e: any) => {
    const value = e.target.value
    const selectedTheme = themes.find((theme) => theme.name === value)
    if (selectedTheme) {
      setTheme(selectedTheme)
    }
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
        {/* Dynamically render themes from array */}
        {themes.map((theme) => (
          <li key={theme.name}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={theme.label}
              value={theme.name}
              onChange={handleThemeChange}
              checked={currentTheme.name === theme.name}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
