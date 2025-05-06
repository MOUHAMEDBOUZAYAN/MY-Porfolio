// src/context/ThemeContext.jsx
import { createContext, useState, useContext, useEffect } from 'react'
import React from 'react'

// Create context
const ThemeContext = createContext()

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Check local storage or use system preference as default
  const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme')
      if (storedTheme) {
        return storedTheme
      }
      
      // Check user preference
      const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return userPrefersDark ? 'dark' : 'light'
    }
    
    return 'light' // Default theme
  }
  
  const [theme, setTheme] = useState(getInitialTheme)
  
  // Update theme in state and localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }
  
  // Apply theme class to document when theme changes
  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove previous class
    root.classList.remove('light', 'dark')
    
    // Add current theme class
    root.classList.add(theme)
  }, [theme])
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext