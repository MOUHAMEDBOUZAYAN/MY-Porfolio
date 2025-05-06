// src/components/Footer.jsx
import { useRef, useEffect } from 'react'
import socialLinks from '../data/socialLinks'

const Footer = () => {
  const footerRef = useRef(null)
  const currentYear = new Date().getFullYear()
  
  // Animation lors du scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('footer-visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    
    if (footerRef.current) {
      observer.observe(footerRef.current)
    }
    
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])
  
  return (
    <footer ref={footerRef} className="bg-secondary-800 dark:bg-secondary-900 text-white py-16 relative overflow-hidden footer-animation">
      {/* Formes décoratives */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -left-20 bottom-10 w-72 h-72 bg-accent-500/5 rounded-full filter blur-3xl"></div>
      
      <div className="absolute inset-0 bg-[url('/assets/images/grid.svg')] bg-center opacity-5"></div>
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo et description */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="mr-2">👨‍💻</span> Mouhamed Bouzyane
            </div>
            <p className="text-secondary-300 mb-6 max-w-md">
              Développeur full stack passionné par la création d'expériences web modernes et intuitives. 
              Spécialisé en JavaScript, React, Node.js et les technologies web actuelles.
            </p>
            
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-400 hover:text-primary-400 transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            
            <p className="text-secondary-400 text-sm">
              &copy; {currentYear} Mouhamed Bouzyane. Tous droits réservés.
            </p>
          </div>
          
          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              Navigation
              <span className="absolute -bottom-1 left-0 h-0.5 w-12 bg-primary-500"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-secondary-300 hover:text-primary-400 transition-colors inline-flex items-center">
                  <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                  Accueil
                </a>
              </li>
              <li>
                <a href="#about" className="text-secondary-300 hover:text-primary-400 transition-colors inline-flex items-center">
                  <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                  À propos
                </a>
              </li>
              <li>
                <a href="#skills" className="text-secondary-300 hover:text-primary-400 transition-colors inline-flex items-center">
                  <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                  Compétences
                </a>
              </li>
              <li>
                <a href="#projects" className="text-secondary-300 hover:text-primary-400 transition-colors inline-flex items-center">
                  <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                  Projets
                </a>
              </li>
              <li>
                <a href="#contact" className="text-secondary-300 hover:text-primary-400 transition-colors inline-flex items-center">
                  <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              Contact
              <span className="absolute -bottom-1 left-0 h-0.5 w-12 bg-primary-500"></span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-primary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-secondary-300">mohammedbouzi177@gmail.com</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-primary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-secondary-300">+212 690 815 605</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-primary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-secondary-300">Beni Mellal, Maroc</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <a 
                href="#contact" 
                className="inline-flex items-center text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Me contacter
              </a>
            </div>
          </div>
        </div>
        
        {/* Barre de séparation */}
        <div className="border-t border-secondary-700 pt-8 mt-8 text-center">
          <p className="text-secondary-400 text-sm">
            Conçu et développé avec <span className="text-red-500">❤</span> par Mouhamed Bouzyane
          </p>
          
          {/* Bouton Retour en haut */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center justify-center w-10 h-10 bg-secondary-700 hover:bg-primary-600 text-white rounded-full absolute right-10 bottom-10 transition-colors shadow-lg"
            aria-label="Retour en haut"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Styles pour l'animation du footer */}
      <style jsx>{`
        .footer-animation {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .footer-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </footer>
  )
}

export default Footer