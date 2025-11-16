// src/App.jsx
import { useEffect, useState } from 'react'
import GooeyNav from './components/GooeyNav'
import ThemeToggle from './components/ThemeToggle'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import ContactSection from './sections/ContactSection'
import Footer from './components/Footer'
import IntroAnimation from './components/IntroAnimation'
import SplashCursor from './components/SplashCursor'
import { ThemeProvider } from './context/ThemeContext'
import { AnimatePresence } from 'framer-motion'
import React from 'react'

// Composant principal avec ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

// Composant séparé pour le contenu pour utiliser les hooks correctement
function AppContent() {
  // État pour contrôler l'animation d'introduction
  const [showIntro, setShowIntro] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navItems = [
    { label: 'Accueil', href: '#home' },
    { label: 'À propos', href: '#about' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Projets', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]
  
  // Configurer l'observateur d'intersection pour les animations au défilement
  useEffect(() => {
    // Ne configurer l'observateur qu'après la fin de l'animation d'intro
    if (!showIntro) {
      const animateOnScrollElems = document.querySelectorAll('.animate-on-scroll')
      const staggerAnimationElems = document.querySelectorAll('.stagger-animation > *')
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      })
      
      animateOnScrollElems.forEach((elem) => {
        elem.classList.add('initially-hidden')
        observer.observe(elem)
      })
      
      staggerAnimationElems.forEach((elem, index) => {
        elem.classList.add('stagger-item')
        elem.style.transitionDelay = `${index * 0.1}s`
        observer.observe(elem)
      })
      
      return () => {
        document.querySelectorAll('.animate-on-scroll, .stagger-animation > *').forEach(
          elem => observer.unobserve(elem)
        )
      }
    }
  }, [showIntro]) // Dépendance à showIntro pour n'exécuter qu'après l'intro
  
  return (
    <>
      {/* Animation d'introduction */}
      <AnimatePresence>
        {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>
      
      {/* Contenu principal du site */}
      <div className={`transition-opacity duration-500 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        {/* Effet global d'arrière-plan (fluid cursor) */}
        <SplashCursor TRANSPARENT={true} SHADING={true} />
        <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-secondary-800 dark:text-white">
            {/* Brand on mobile, full nav on desktop */}
            <a href="#home" className="md:hidden font-bold text-lg">
              Accueil
            </a>
            <div className="hidden md:block">
              <GooeyNav
                items={navItems}
              />
            </div>
            <div className="ml-4 flex items-center gap-2">
              <ThemeToggle />
              {/* Bouton menu mobile */}
              <button
                aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                className="md:hidden p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                onClick={() => setMobileOpen(v => !v)}
              >
                {mobileOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </header>
        {/* Drawer mobile */}
        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="fixed top-0 right-0 z-50 h-full w-72 bg-white dark:bg-secondary-900 border-l border-black/10 dark:border-white/10 shadow-xl md:hidden">
              <div className="p-4 flex items-center justify-between border-b border-black/10 dark:border-white/10">
                <span className="font-semibold text-secondary-800 dark:text-white">Menu</span>
                <button
                  aria-label="Fermer"
                  className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {navItems.map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-800"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </aside>
          </>
        )}
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App