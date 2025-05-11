// src/App.jsx
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import ContactSection from './sections/ContactSection'
import Footer from './components/Footer'
import IntroAnimation from './components/IntroAnimation'
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
      <div className={`light transition-all duration-500 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
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