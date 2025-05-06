// src/components/Skills.jsx
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const Skills = ({ skills, categories }) => {
  const [activeCategory, setActiveCategory] = useState('all')
  const skillsRef = useRef(null)
  const isInView = useInView(skillsRef, { once: true, margin: "-100px 0px" })
  
  // Filtered skills based on active category
  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory)
  
  // Animation variants
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

  // Progress bar animation
  useEffect(() => {
    if (isInView) {
      const progressBars = document.querySelectorAll('.skill-progress')
      progressBars.forEach((bar, index) => {
        setTimeout(() => {
          bar.style.width = bar.dataset.progress + '%'
        }, index * 100)
      })
    }
  }, [isInView, filteredSkills])

  return (
    <div ref={skillsRef} className="mt-12">
      {/* Categories filter */}
      <div className="flex flex-wrap justify-center mb-10">
        <div className="bg-white dark:bg-secondary-800 shadow-md rounded-full p-1 inline-flex flex-wrap justify-center">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all m-1 ${
                activeCategory === category.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
              }`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Skills grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {filteredSkills.map((skill, index) => (
          <motion.div 
            key={index} 
            className="card group hover:border-primary-500 transition-all duration-300"
            variants={itemVariants}
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">{skill.icon}</span>
              <h3 className="text-lg font-bold text-secondary-900 dark:text-white">
                {skill.name}
              </h3>
            </div>
            
            <div className="w-full h-3 bg-secondary-100 dark:bg-secondary-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-500 group-hover:bg-accent-500 rounded-full transition-colors duration-500 ease-in-out skill-progress"
                style={{ width: '0%' }}
                data-progress={skill.level}
              ></div>
            </div>
            
            <div className="flex justify-between mt-2">
              <span className="text-xs text-secondary-500 dark:text-secondary-400">Niveau</span>
              <span className="text-xs font-medium text-primary-600 dark:text-primary-400">{skill.level}%</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Languages section */}
      {(activeCategory === 'all' || activeCategory === 'soft') && (
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6 text-center">
            Langues
          </h3>
          
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="card p-4">
                <div className="flex justify-between mb-2">
                  <h4 className="font-bold text-secondary-900 dark:text-white">Arabe</h4>
                  <span className="text-primary-600 dark:text-primary-400">Langue natale</span>
                </div>
                <div className="w-full h-3 bg-secondary-100 dark:bg-secondary-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full skill-progress" style={{ width: '0%' }} data-progress="100"></div>
                </div>
              </div>
              
              <div className="card p-4">
                <div className="flex justify-between mb-2">
                  <h4 className="font-bold text-secondary-900 dark:text-white">Français</h4>
                  <span className="text-primary-600 dark:text-primary-400">Courant</span>
                </div>
                <div className="w-full h-3 bg-secondary-100 dark:bg-secondary-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full skill-progress" style={{ width: '0%' }} data-progress="90"></div>
                </div>
              </div>
              
              <div className="card p-4">
                <div className="flex justify-between mb-2">
                  <h4 className="font-bold text-secondary-900 dark:text-white">Anglais</h4>
                  <span className="text-primary-600 dark:text-primary-400">Niveau intermédiaire</span>
                </div>
                <div className="w-full h-3 bg-secondary-100 dark:bg-secondary-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full skill-progress" style={{ width: '0%' }} data-progress="65"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Skills