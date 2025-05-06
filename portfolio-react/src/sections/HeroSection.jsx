import { useEffect, useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'

const HeroSection = () => {
  const sectionRef = useRef(null)
  
  // Add parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const scrollY = window.scrollY
      const parallaxElements = sectionRef.current.querySelectorAll('.parallax')
      
      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.1
        el.style.transform = `translateY(${scrollY * speed}px)`
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden" ref={sectionRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-secondary-900 dark:to-gray-950"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl parallax" data-speed="0.05"></div>
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl parallax" data-speed="0.08"></div>
      
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[url('/assets/images/grid.svg')] bg-center opacity-5"></div>
      
      {/* Content */}
      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <div className="max-w-2xl animate-on-scroll">
            <div className="mb-4 text-accent-500 font-mono animate-pulse-slow">
              <span className="inline-block">👋</span> <span className="inline-block ml-2">Bonjour, je m'appelle</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-secondary-900 dark:text-white">
              <span className="block">Prénom Nom</span>
              <span className="text-primary-600 dark:text-primary-400 block mt-2">
                <TypeAnimation
                  sequence={[
                    'Développeur Frontend', 
                    2000,
                    'Développeur React', 
                    2000,
                    'Intégrateur Web', 
                    2000
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                />
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-secondary-600 dark:text-secondary-300 mb-8 leading-relaxed">
              Je crée des expériences web modernes, intuitives et performantes. 
              Passionné par le frontend et les interfaces utilisateur élégantes.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                <span>Me contacter</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              
              <a
                href="#projects"
                className="px-6 py-3 bg-white dark:bg-secondary-800 text-primary-600 dark:text-primary-400 rounded-full font-medium border border-primary-200 dark:border-secondary-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Voir mes projets
              </a>
            </div>
          </div>
          
          {/* Hero image/illustration */}
          <div className="relative animate-on-scroll">
            <div className="w-72 h-72 md:w-96 md:h-96 bg-white dark:bg-secondary-800 rounded-full shadow-xl flex items-center justify-center overflow-hidden">
              <img
                src="/assets/images/profile.png"
                alt="Photo de profil"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-6 -right-6 bg-white dark:bg-secondary-800 rounded-lg shadow-lg p-3 animate-bounce-slow">
              <svg className="w-8 h-8 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-secondary-800 rounded-lg shadow-lg p-3 animate-pulse-slow">
              <svg className="w-8 h-8 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM19 21H3v-9L14.5 0 21 6.5l-2.5 2.5" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow">
          <span className="text-sm text-secondary-500 dark:text-secondary-400 mb-2">Scroll</span>
          <svg className="w-6 h-6 text-secondary-500 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default HeroSection