// src/sections/HeroSection.jsx
import { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import profile from '../assets/images/profile.png';

const HeroSection = () => {
  const sectionRef = useRef(null);
  
  // Add parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollY = window.scrollY;
      const parallaxElements = sectionRef.current.querySelectorAll('.parallax');
      
      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.1;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Badges technologiques avec icônes et positions ajustées
  const techBadges = [
    { 
      icon: "⚛️", 
      text: "React.js", 
      position: "absolute -top-6 -right-16 z-20",
      bgColor: "bg-blue-500/80", 
      animation: {
        y: [0, -8, 0],
        x: [0, 5, 0],
        rotate: [0, 5, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }
    },
    { 
      icon: "🟨", 
      text: "JavaScript", 
      position: "absolute top-20 -right-24 z-20",
      bgColor: "bg-yellow-500/80", 
      animation: {
        y: [0, 8, 0],
        x: [0, -5, 0],
        rotate: [0, -5, 0],
        transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
      }
    },
    { 
      icon: "🟢", 
      text: "Node.js", 
      position: "absolute -bottom-10 -right-14 z-20",
      bgColor: "bg-green-600/80", 
      animation: {
        y: [0, 10, 0],
        x: [0, 8, 0],
        rotate: [0, 8, 0],
        transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
      }
    },
    { 
      icon: "💻", 
      text: "1+ Years Experience", 
      position: "absolute bottom-20 -left-20 z-20",
      bgColor: "bg-purple-600/80", 
      animation: {
        y: [0, -7, 0],
        x: [0, 5, 0],
        rotate: [0, -4, 0],
        transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
      }
    },
    { 
      icon: "🎨", 
      text: "Tailwind CSS", 
      position: "absolute -top-12 left-8 z-20",
      bgColor: "bg-cyan-500/80", 
      animation: {
        y: [0, 6, 0],
        x: [0, -7, 0],
        rotate: [0, 6, 0],
        transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
      }
    },
    {
      icon: "🚀",
      text: "Frontend",
      position: "absolute top-10 -left-28 z-20",
      bgColor: "bg-red-500/80",
      animation: {
        y: [0, -5, 0],
        x: [0, -5, 0],
        rotate: [0, -3, 0],
        transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
      }
    },
    {
      icon: "📱",
      text: "Responsive",
      position: "absolute bottom-5 right-5 z-20",
      bgColor: "bg-orange-500/80",
      animation: {
        y: [0, 8, 0],
        x: [0, 4, 0],
        rotate: [0, -5, 0],
        transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }
      }
    }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden" ref={sectionRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-secondary-900 dark:to-gray-950"></div>
      
      {/* Decorative circles */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl parallax" 
        data-speed="0.05"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl parallax" 
        data-speed="0.08"
        animate={{
          opacity: [0.6, 0.9, 0.6],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      ></motion.div>
      
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[url('/assets/images/grid.svg')] bg-center opacity-5"></div>
      
      {/* Content */}
      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="mb-4 text-accent-500 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="inline-block">👋</span> <span className="inline-block ml-2">Bonjour, je m'appelle</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-secondary-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="block">Mouhamed Bouzyan</span>
              <span className="text-primary-600 dark:text-primary-400 block mt-2">
                <TypeAnimation
                  sequence={[
                    'Développeur Frontend',
                    2000,
                    'Développeur React.js',
                    2000,
                    'Développeur Backend',
                    2000,
                    'Développeur Full Stack',
                    2000
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  speed={50}
                  deletionSpeed={50}
                />
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-secondary-600 dark:text-secondary-300 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Je crée des expériences web modernes, intuitives et performantes. 
              Passionné par le développement frontend et les technologies JavaScript.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.a
                href="#contact"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-all transform shadow-lg hover:shadow-xl flex items-center"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Me contacter</span>
                <motion.svg 
                  className="w-5 h-5 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </motion.a>
              
              <motion.a
                href="#projects"
                className="px-6 py-3 bg-white dark:bg-secondary-800 text-primary-600 dark:text-primary-400 rounded-full font-medium border border-primary-200 dark:border-secondary-700 transition-all transform shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Voir mes projets
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Hero image with technology badges */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Technology badges */}
            {techBadges.map((badge, index) => (
              <motion.div
                key={index}
                className={`${badge.position} ${badge.bgColor} text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-sm font-medium whitespace-nowrap`}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: 0,
                  ...badge.animation
                }}
                transition={{ 
                  opacity: { duration: 0.5, delay: 1 + (index * 0.2) },
                  scale: { duration: 0.5, delay: 1 + (index * 0.2) },
                  y: { duration: 0.5, delay: 1 + (index * 0.2) }
                }}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              >
                <span className="text-lg">{badge.icon}</span>
                <span className="font-medium">{badge.text}</span>
              </motion.div>
            ))}
            
            <motion.div 
              className="w-72 h-72 md:w-96 md:h-96 flex items-center justify-center relative z-10"
            >
              <img
                src={profile}
                alt="Photo de Mouhamed Bouzyane"
                className="w-full h-full object-contain pointer-events-none select-none drop-shadow-2xl"
                style={{ backgroundColor: 'transparent' }}
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            y: [0, 10, 0],
          }}
          transition={{ 
            delay: 1.2,
            y: {
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut" 
            }
          }}
        >
          <span className="text-sm text-secondary-500 dark:text-secondary-400 mb-2">Scroll</span>
          <svg className="w-6 h-6 text-secondary-500 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;