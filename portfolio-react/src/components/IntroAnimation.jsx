// src/components/IntroAnimation.jsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const IntroAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [showLogo, setShowLogo] = useState(true)
  
  useEffect(() => {
    // Simuler un chargement rapide
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 5
        if (next >= 100) {
          clearInterval(interval)
          
          // Montrer l'animation de logo pendant un moment puis terminer
          setTimeout(() => {
            setShowLogo(false)
            
            // Attendre la fin de l'animation de sortie
            setTimeout(() => {
              onComplete()
            }, 800)
          }, 1000)
          
          return 100
        }
        return next
      })
    }, 30)
    
    return () => clearInterval(interval)
  }, [onComplete])
  
  return (
    <AnimatePresence>
      {showLogo && (
        <motion.div 
          className="fixed inset-0 bg-secondary-900 dark:bg-gray-950 flex flex-col items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] } }}
        >
          <motion.div 
            className="mb-8 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1 
              className="text-5xl font-bold text-primary-500 dark:text-primary-400"
              animate={{ 
                backgroundImage: ['linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)', 
                                 'linear-gradient(90deg, #8B5CF6 0%, #3B82F6 100%)'],
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity, 
                repeatType: "reverse",
              }}
            >
              Mouhamed.Bouzyane
            </motion.h1>
            
            <motion.div
              className="overflow-hidden h-8 mt-3"
              initial={{ height: 0 }}
              animate={{ height: "2rem" }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.p 
                className="text-accent-500 dark:text-accent-400"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Développeur Full Stack
              </motion.p>
            </motion.div>
          </motion.div>
          
          {/* Bar de progression élégante */}
          <motion.div 
            className="w-64 h-[3px] bg-secondary-200 dark:bg-secondary-800 rounded-full overflow-hidden"
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
              style={{ width: `${progress}%`, transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
          
          {/* Éléments décoratifs */}
          <motion.div 
            className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-primary-500/30"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute bottom-1/3 left-1/3 w-6 h-6 rounded-full bg-accent-500/30"
            animate={{ 
              scale: [1.5, 1, 1.5],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute top-1/3 left-1/4 w-3 h-3 border-2 border-primary-400 rounded-sm"
            animate={{ 
              rotate: [0, 180, 360],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IntroAnimation