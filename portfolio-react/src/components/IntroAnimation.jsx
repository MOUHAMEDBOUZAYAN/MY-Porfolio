// src/components/IntroAnimation.jsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import profile from '../assets/images/profile.png'

const IntroAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(1) // Phases: 1=Chargement, 2=Présentation, 3=Sortie
  
  useEffect(() => {
    // Phase 1: Chargement progressif
    const loadingInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1.5
        if (next >= 100) {
          clearInterval(loadingInterval)
          setTimeout(() => setPhase(2), 500) // Passer à la phase 2
          return 100
        }
        return next
      })
    }, 30)
    
    return () => clearInterval(loadingInterval)
  }, [])
  
  // Phase 2 & 3 - Transition et sortie
  useEffect(() => {
    if (phase === 2) {
      // Attendre pour la phase de présentation
      setTimeout(() => setPhase(3), 3000)
    } else if (phase === 3) {
      // Attendre pour la sortie
      setTimeout(() => onComplete(), 1200)
    }
  }, [phase, onComplete])
  
  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div 
          className="fixed inset-0 flex flex-col items-center justify-center z-50"
          style={{ 
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)"
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: [0.65, 0, 0.35, 1] } }}
        >
          {/* Éléments décoratifs - Particules flottantes */}
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ 
                width: Math.random() * 8 + 3,
                height: Math.random() * 8 + 3,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.3)`
              }}
              animate={{ 
                x: [0, Math.random() * 60 - 30],
                y: [0, Math.random() * 60 - 30],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0.5],
              }}
              transition={{ 
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Grille d'arrière-plan moderne */}
          <motion.div
            className="absolute inset-0 opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1.5 }}
          >
            <div className="w-full h-full" style={{ 
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), 
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px"
            }}></div>
          </motion.div>

          {/* Phase 1: Chargement professionnel */}
          {phase === 1 && (
            <motion.div
              className="flex flex-col items-center justify-center space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo animé */}
              <motion.div 
                className="relative mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div 
                  className="w-28 h-28 rounded-full border-4 border-blue-500 border-t-transparent relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
                
                {/* Indicateur de progression */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-4 border-transparent border-r-blue-400"
                  style={{ 
                    background: `conic-gradient(from 0deg, transparent ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
              </motion.div>
              
              {/* Barre de progression */}
              <motion.div 
                className="w-80 h-2 bg-slate-700 rounded-full overflow-hidden shadow-inner"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-full"
                  style={{ width: `${progress}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              
              {/* Texte de chargement */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.p 
                  className="text-slate-300 font-medium text-lg mb-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Initialisation du portfolio
                </motion.p>
                <motion.p 
                  className="text-blue-400 font-bold text-2xl"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {Math.round(progress)}%
                </motion.p>
              </motion.div>
            </motion.div>
          )}
          
          {/* Phase 2: Présentation professionnelle */}
          {phase >= 2 && (
            <motion.div 
              className="text-center relative z-10"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: phase === 3 ? 0 : 1, scale: phase === 3 ? 0.9 : 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Logo principal animé */}
              <motion.div 
                className="mb-6 md:mb-8 flex justify-center"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              >
                <motion.div 
                  className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  {/* Anneaux concentriques */}
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-blue-500/30"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-purple-500/30"
                    animate={{ 
                      scale: [1.3, 1, 1.3],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                  
                  {/* Photo de profil */}
                  <motion.div 
                    className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl overflow-hidden relative"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.5)",
                        "0 0 40px rgba(147, 51, 234, 0.8)",
                        "0 0 20px rgba(59, 130, 246, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.img
                      src={profile}
                      alt="Mouhamed Bouzyan"
                      className="w-full h-full object-cover rounded-full"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    />
                    {/* Overlay avec gradient */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-full"
                      animate={{ 
                        opacity: [0.3, 0.1, 0.3]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Nom avec effet de révélation professionnel */}
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 px-4 text-center"
                style={{ 
                  textShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
                  letterSpacing: "0.05em",
                  wordBreak: "break-word",
                  overflowWrap: "break-word"
                }}
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                animate={{ 
                  clipPath: "inset(0 0% 0 0)", 
                  opacity: 1 
                }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
                  Mouhamed.Bouzyane
                </span>
              </motion.h1>
              
              {/* Titre professionnel avec animation */}
              <motion.div
                className="h-12 overflow-hidden mb-6 md:mb-8 px-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "3rem", opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <motion.p 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-300 font-medium text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0 }}
                >
                  <TypewriterEffect text="Développeur Full Stack Professionnel" delay={100} />
                </motion.p>
              </motion.div>

              {/* Badge de spécialisation */}
              <motion.div
                className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full backdrop-blur-sm mx-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, duration: 0.6 }}
              >
                <span className="text-blue-400 mr-2 text-sm md:text-base">🚀</span>
                <span className="text-slate-300 font-medium text-xs sm:text-sm md:text-base">React.js • Node.js • Modern Web</span>
              </motion.div>
            </motion.div>
          )}
          
          {/* Cercles concentriques animés en arrière-plan */}
          {phase === 2 && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ zIndex: -1 }}
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-blue-500/20"
                  style={{ 
                    width: `${400 + i * 100}px`, 
                    height: `${400 + i * 100}px`
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: [0, 0.3, 0],
                    scale: [0.5, 1.2, 2],
                  }}
                  transition={{ 
                    duration: 6,
                    delay: i * 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* Indicateur de chargement final */}
          {phase === 3 && (
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="flex items-center space-x-2 text-slate-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-sm">Chargement terminé</span>
                <motion.div
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Composant d'effet de machine à écrire amélioré
const TypewriterEffect = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay)
      
      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, delay])
  
  return (
    <span>
      {displayText}
      <motion.span
        className="inline-block w-1 h-6 bg-blue-400 ml-1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </span>
  )
}

export default IntroAnimation