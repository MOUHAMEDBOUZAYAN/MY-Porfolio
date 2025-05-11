// src/components/IntroAnimation.jsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const IntroAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(1) // Phases de l'animation: 1, 2, 3
  
  useEffect(() => {
    // Phase 1: Chargement initial
    const loadingInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 2
        if (next >= 100) {
          clearInterval(loadingInterval)
          setTimeout(() => setPhase(2), 300) // Passer à la phase 2
          return 100
        }
        return next
      })
    }, 20)
    
    return () => clearInterval(loadingInterval)
  }, [])
  
  // Phase 2 & 3 - Transition vers le logo et sortie
  useEffect(() => {
    if (phase === 2) {
      // Attendre pour la phase de présentation
      setTimeout(() => setPhase(3), 2500)
    } else if (phase === 3) {
      // Attendre pour la sortie
      setTimeout(() => onComplete(), 1000)
    }
  }, [phase, onComplete])
  
  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div 
          className="fixed inset-0 flex flex-col items-center justify-center z-50"
          style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] } }}
        >
          {/* Éléments décoratifs - Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-teal-500/30"
              style={{ 
                width: Math.random() * 12 + 2,
                height: Math.random() * 12 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ 
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0.5],
              }}
              transition={{ 
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Grille d'arrière-plan */}
          <motion.div
            className="absolute inset-0 opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 1 }}
          >
            <div className="w-full h-full" style={{ 
              backgroundImage: "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
              backgroundSize: "30px 30px"
            }}></div>
          </motion.div>

          {/* Phase 1: Chargement */}
          {phase === 1 && (
            <motion.div
              className="flex flex-col items-center justify-center space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-24 h-24 rounded-full border-4 border-teal-400 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div 
                className="w-64 h-[3px] bg-gray-700 rounded-full overflow-hidden"
              >
                <motion.div 
                  className="h-full bg-gradient-to-r from-teal-400 to-blue-500"
                  style={{ width: `${progress}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              
              <motion.p 
                className="text-gray-300 font-medium text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Chargement {progress}%
              </motion.p>
            </motion.div>
          )}
          
          {/* Phase 2: Animation Logo & Titre */}
          {phase >= 2 && (
            <motion.div 
              className="text-center relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: phase === 3 ? 0 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Logo/Icône animé */}
              <motion.div 
                className="mb-6 flex justify-center"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <motion.div 
                  className="relative w-24 h-24 flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"
                    style={{ filter: "blur(10px)" }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 0.8, 0.6],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div className="w-14 h-14 bg-white rounded-full z-10 flex items-center justify-center">
                    <span className="text-2xl text-blue-600">MB</span>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Nom avec effet de révélation */}
              <motion.h1 
                className="text-5xl font-bold mb-3"
                style={{ textShadow: "0 0 10px rgba(56, 189, 248, 0.3)" }}
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                  Mouhamed.Bouzyane
                </span>
              </motion.h1>
              
              {/* Titre avec effet de machine à écrire */}
              <motion.div
                className="h-8 overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: "2rem" }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <motion.p 
                  className="text-lg text-teal-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <TypewriterEffect text="Développeur Full Stack" delay={80} />
                </motion.p>
              </motion.div>
            </motion.div>
          )}
          
          {/* Cercles concentriques animés en arrière-plan, visibles en phase 2 */}
          {phase === 2 && (
            <motion.div 
              className="absolute" 
              style={{ 
                width: 600, 
                height: 600, 
                top: "50%", 
                left: "50%", 
                x: "-50%", 
                y: "-50%", 
                zIndex: -1 
              }}
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-teal-500/30"
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    top: 0, 
                    left: 0 
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0, 0.5, 0],
                    scale: [0.8, 2, 3],
                  }}
                  transition={{ 
                    duration: 4,
                    delay: i * 1,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Composant d'effet de machine à écrire
const TypewriterEffect = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = useState('')
  
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i))
        i++
      } else {
        clearInterval(timer)
      }
    }, delay)
    
    return () => clearInterval(timer)
  }, [text, delay])
  
  return <>{displayText}</>
}

export default IntroAnimation