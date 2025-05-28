// src/components/Footer.jsx
import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import React from 'react'

// Technologies que j'utilise
const techStack = [
  { name: 'React.js', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'JavaScript', icon: '🟨' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'Git', icon: '🔧' }
]

// Liens sociaux avec focus professionnel
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/MOUHAMEDBOUZAYAN',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
      </svg>
    ),
    color: 'hover:text-gray-900'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: 'hover:text-blue-600'
  },
  {
    name: 'Email',
    url: 'mailto:mohammedbouzi177@gmail.com',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'hover:text-red-500'
  }
]

const Footer = () => {
  const footerRef = useRef(null)
  const currentYear = new Date().getFullYear()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
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

  // Mouse tracking pour effet interactif
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        })
      }
    }

    const footer = footerRef.current
    if (footer) {
      footer.addEventListener('mousemove', handleMouseMove)
      return () => footer.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }
  
  return (
    <footer ref={footerRef} className="bg-secondary-900 dark:bg-black text-white py-16 relative overflow-hidden footer-animation">
      {/* Background interactif */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
        }}
      />
      
      {/* Formes décoratives */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full filter blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute -left-20 bottom-10 w-72 h-72 bg-accent-500/5 rounded-full filter blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />
      
      {/* Grille de code en arrière-plan */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3e%3cpath d='m 40,0 0,40 -40,0 z' fill='none' stroke='%23ffffff' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")`,
        }}></div>
      </div>
      
      <div className="section-container relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Logo et description */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <motion.div 
              className="text-2xl font-bold text-white mb-4 flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="mr-3 text-3xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                👨‍💻
              </motion.span> 
              <span>Mouhamed Bouzyane</span>
            </motion.div>
            <p className="text-secondary-300 mb-6 max-w-md leading-relaxed">
              Développeur Full Stack spécialisé en JavaScript et React.js. 
              Je crée des applications web modernes, performantes et centrées sur l'expérience utilisateur.
            </p>
            
            {/* Tech Stack */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  >
                    <span>{tech.icon}</span>
                    <span className="font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Réseaux sociaux */}
            <div className="flex gap-4 mb-8">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-secondary-400 transition-all p-3 bg-white/5 rounded-full backdrop-blur-sm hover:bg-white/10 ${link.color}`}
                  aria-label={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + (index * 0.1), duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            
            <motion.p 
              className="text-secondary-400 text-sm"
              variants={itemVariants}
            >
              &copy; {currentYear} Mouhamed Bouzyane. Tous droits réservés.
            </motion.p>
          </motion.div>
          
          {/* Navigation */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              Navigation
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-primary-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Accueil', href: '#home', icon: '🏠' },
                { name: 'À propos', href: '#about', icon: '👤' },
                { name: 'Compétences', href: '#skills', icon: '⚡' },
                { name: 'Projets', href: '#projects', icon: '💼' },
                { name: 'Contact', href: '#contact', icon: '📧' }
              ].map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + (index * 0.1), duration: 0.3 }}
                >
                  <motion.a 
                    href={item.href} 
                    className="text-secondary-300 hover:text-primary-400 transition-colors inline-flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="mr-2 group-hover:scale-110 transition-transform">{item.icon}</span>
                    <span>{item.name}</span>
                    <motion.svg 
                      className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </motion.svg>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Services */}
          
          
          {/* Contact rapide */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              Contact Rapide
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-primary-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.8 }}
              />
            </h3>
            <ul className="space-y-4">
              <motion.li 
                className="flex items-start group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.3 }}
              >
                <svg className="w-5 h-5 mr-3 text-primary-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <a 
                    href="mailto:mohammedbouzi177@gmail.com"
                    className="text-secondary-300 hover:text-white transition-colors text-sm break-all"
                  >
                    mohammedbouzi177@gmail.com
                  </a>
                  <p className="text-xs text-secondary-500">Réponse sous 24h</p>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-start group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1, duration: 0.3 }}
              >
                <svg className="w-5 h-5 mr-3 text-primary-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <a 
                    href="tel:+212690815605"
                    className="text-secondary-300 hover:text-white transition-colors text-sm"
                  >
                    +212 690 815 605
                  </a>
                  <p className="text-xs text-secondary-500">9h-18h (GMT+1)</p>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-start group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.3 }}
              >
                <svg className="w-5 h-5 mr-3 text-primary-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <span className="text-secondary-300 text-sm">Beni Mellal, Maroc</span>
                  <p className="text-xs text-secondary-500">Travail à distance</p>
                </div>
              </motion.li>
            </ul>
            
            {/* CTA */}
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3, duration: 0.3 }}
            >
              <motion.a 
                href="#contact" 
                className="inline-flex items-center text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg transition-all text-sm font-medium shadow-lg"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)" 
                }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Démarrer un projet</span>
              </motion.a>
            </motion.div>
            
            {/* Status disponibilité */}
            <motion.div 
              className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <motion.div 
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-green-300 text-xs font-medium">
                  Disponible pour nouveaux projets
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Barre de séparation */}
        <motion.div 
          className="border-t border-secondary-700 pt-8 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <motion.p 
              className="text-secondary-400 text-sm text-center md:text-left"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.6, duration: 0.3 }}
            >
              Développé avec <motion.span 
                className="text-red-500 inline-block"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >❤</motion.span> par Mouhamed Bouzyane • Utilisant React.js & Tailwind CSS
            </motion.p>
            
            {/* Version et dernière mise à jour */}
            <motion.div 
              className="flex items-center gap-4 text-xs text-secondary-500 justify-center md:justify-end"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.7, duration: 0.3 }}
            >
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Mis à jour en {currentYear}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                v2.0
              </span>
            </motion.div>
          </div>
          
          {/* Bouton Retour en haut avec animation */}
          <motion.button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed right-6 bottom-6 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50 group"
            aria-label="Retour en haut"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2, duration: 0.3 }}
            whileHover={{ 
              scale: 1.1, 
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" 
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg 
              className="w-5 h-5 group-hover:-translate-y-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Styles pour l'animation du footer */}
      <style jsx="true">{`
        .footer-animation {
          opacity: 0;
          transform: translateY(30px);
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