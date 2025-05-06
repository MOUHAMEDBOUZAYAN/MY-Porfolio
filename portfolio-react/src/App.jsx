// src/App.jsx
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import ContactSection from './sections/ContactSection'
import Footer from './components/Footer'
import { ThemeProvider } from './context/ThemeContext'
import { useIntersectionObserver } from './hooks/useIntersectionObserver'
import React from 'react'

// Move useIntersectionObserver to inside the component
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

// Create a separate component for the content to use hooks properly
function AppContent() {
  // This hook will be called inside a functional component
  useEffect(() => {
    // Call useIntersectionObserver inside the effect, not directly
    const setupObserver = () => {
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
      
      animateOnScrollElems.forEach((elem, index) => {
        elem.classList.add('initially-hidden')
        observer.observe(elem)
      })
      
      staggerAnimationElems.forEach((elem, index) => {
        elem.classList.add('stagger-item')
        elem.style.transitionDelay = `${index * 0.1}s`
        observer.observe(elem)
      })
      
      return observer
    }
    
    const observer = setupObserver()
    
    return () => {
      if (observer) {
        document.querySelectorAll('.animate-on-scroll, .stagger-animation > *').forEach(
          elem => observer.unobserve(elem)
        )
      }
    }
  }, [])
  
  return (
    <div className="light">
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
  )
}

export default App