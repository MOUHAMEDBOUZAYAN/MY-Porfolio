// src/components/Skills.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const Skills = ({ skills, categories }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const skillsRef = useRef(null);
  const isInView = useInView(skillsRef, { once: true, margin: "-100px 0px" });
  
  // Filtered skills based on active category
  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Variants pour les boutons de catégorie
  const buttonVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div ref={skillsRef} className="mt-12">
      {/* Categories filter - Animation améliorée */}
      <div className="flex flex-wrap justify-center mb-10">
        <motion.div 
          className="bg-secondary-800 shadow-md rounded-full p-1 inline-flex flex-wrap justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all m-1 ${
                activeCategory === category.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-secondary-300 hover:bg-secondary-700'
              }`}
              onClick={() => setActiveCategory(category.id)}
              variants={buttonVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              whileTap="tap"
              transition={{ delay: index * 0.1 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
      
      {/* Skills grid - Avec AnimatePresence pour les transitions entre catégories */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          {filteredSkills.map((skill, index) => (
            <motion.div 
              key={skill.name} 
              className="bg-secondary-800 rounded-lg p-4 border border-secondary-700 hover:border-primary-500 transition-all duration-300"
              variants={itemVariants}
              custom={index}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
              }}
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{skill.icon}</span>
                <h3 className="text-lg font-bold text-white">
                  {skill.name}
                </h3>
              </div>
              
              <div className="w-full h-3 bg-secondary-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ 
                    duration: 1.2, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                />
              </div>
              
              <div className="flex justify-between mt-2">
                <span className="text-xs text-secondary-400">Niveau</span>
                <span className="text-xs font-medium text-primary-400">{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      
      {/* Languages section - Animation améliorée */}
      {(activeCategory === 'all' || activeCategory === 'soft') && (
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h3 
            className="text-2xl font-bold text-white mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Langues
          </motion.h3>
          
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="space-y-6">
              <motion.div 
                className="bg-secondary-800 p-4 rounded-lg border border-secondary-700"
                initial={{ x: -50, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex justify-between mb-2">
                  <h4 className="font-bold text-white">Arabe</h4>
                  <span className="text-primary-400">Langue natale</span>
                </div>
                <div className="w-full h-3 bg-secondary-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '100%' } : { width: 0 }}
                    transition={{ duration: 1.5, delay: 1.0 }}
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-secondary-800 p-4 rounded-lg border border-secondary-700"
                initial={{ x: -50, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex justify-between mb-2">
                  <h4 className="font-bold text-white">Français</h4>
                  <span className="text-primary-400">Courant</span>
                </div>
                <div className="w-full h-3 bg-secondary-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '90%' } : { width: 0 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-secondary-800 p-4 rounded-lg border border-secondary-700"
                initial={{ x: -50, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex justify-between mb-2">
                  <h4 className="font-bold text-white">Anglais</h4>
                  <span className="text-primary-400">Niveau intermédiaire</span>
                </div>
                <div className="w-full h-3 bg-secondary-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '65%' } : { width: 0 }}
                    transition={{ duration: 1.5, delay: 1.4 }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Skills;