// src/App.jsx
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import ContactSection from './sections/ContactSection'
import Footer from './components/Footer'
import { useTheme } from './context/ThemeContext'
import { useIntersectionObserver } from './hooks/useIntersectionObserver'

function App() {
  const { theme } = useTheme()
  
  // Initialize the animation observer
  useEffect(() => {
    useIntersectionObserver()
  }, [])

  return (
    <div className={theme}>
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

