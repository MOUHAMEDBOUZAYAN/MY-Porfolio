// src/components/Navbar.jsx
import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useScrollPosition } from '../hooks/useScrollPosition'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const { isScrolled } = useScrollPosition()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Close mobile menu when user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('#mobile-menu') && !event.target.closest('#menu-button')) {
        setMobileMenuOpen(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [mobileMenuOpen])
  
  // Navigation links
  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'À propos', href: '#about' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Projets', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 font-display font-bold text-xl">
            <a href="#" className="text-primary-600 dark:text-primary-400">
              Mouhamed<span className="text-accent-500">.</span>Bouzyane
            </a>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <ThemeToggle />
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle />
            <button
              id="menu-button"
              type="button"
              className="text-secondary-500 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 ease-in-out transform ${
          mobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-b-lg mx-4 px-2 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-2 rounded-md text-base font-medium text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Navbar