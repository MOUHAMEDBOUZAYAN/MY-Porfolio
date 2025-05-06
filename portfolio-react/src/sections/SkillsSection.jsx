// src/sections/SkillsSection.jsx
import { useState } from 'react'

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  
  // Catégories de compétences
  const categories = [
    { id: 'all', label: 'Toutes' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'design', label: 'Design' },
    { id: 'tools', label: 'Outils' },
  ]
  
  // Liste des compétences
  const skills = [
    // Frontend
    { name: 'HTML5', level: 95, category: 'frontend', icon: '🌐' },
    { name: 'CSS3', level: 90, category: 'frontend', icon: '🎨' },
    { name: 'JavaScript', level: 92, category: 'frontend', icon: '⚡' },
    { name: 'TypeScript', level: 85, category: 'frontend', icon: '📘' },
    { name: 'React', level: 90, category: 'frontend', icon: '⚛️' },
    { name: 'Vue.js', level: 75, category: 'frontend', icon: '🟢' },
    { name: 'Tailwind CSS', level: 95, category: 'frontend', icon: '🌊' },
    { name: 'SASS/SCSS', level: 85, category: 'frontend', icon: '💅' },
    
    // Backend
    { name: 'Node.js', level: 80, category: 'backend', icon: '🟩' },
    { name: 'Express', level: 75, category: 'backend', icon: '🚂' },
    { name: 'MongoDB', level: 70, category: 'backend', icon: '🍃' },
    { name: 'Firebase', level: 85, category: 'backend', icon: '🔥' },
    { name: 'RESTful API', level: 85, category: 'backend', icon: '🔄' },
    
    // Design
    { name: 'Figma', level: 85, category: 'design', icon: '🎭' },
    { name: 'Adobe XD', level: 75, category: 'design', icon: '🎨' },
    { name: 'Responsive Design', level: 95, category: 'design', icon: '📱' },
    { name: 'UI/UX Design', level: 80, category: 'design', icon: '🖌️' },
    
    // Outils
    { name: 'Git', level: 90, category: 'tools', icon: '🔄' },
    { name: 'GitHub', level: 85, category: 'tools', icon: '🐙' },
    { name: 'VS Code', level: 95, category: 'tools', icon: '📝' },
    { name: 'Webpack', level: 75, category: 'tools', icon: '📦' },
    { name: 'Jest', level: 70, category: 'tools', icon: '🧪' },
    { name: 'npm/yarn', level: 85, category: 'tools', icon: '📦' },
  ]
  
  // Filtrer les compétences en fonction de la catégorie active
  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory)

  return (
    <section id="skills" className="py-20">
      <div className="section-container">
        <h2 className="section-title mb-12 text-center">Mes compétences</h2>
        
        <div className="flex flex-wrap justify-center mb-12 animate-on-scroll">
          <div className="bg-white dark:bg-secondary-800 shadow-md rounded-full p-1 inline-flex">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="card group hover:border-primary-500 transition-all">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{skill.icon}</span>
                <h3 className="text-lg font-bold text-secondary-900 dark:text-white">
                  {skill.name}
                </h3>
              </div>
              
              <div className="w-full h-3 bg-secondary-100 dark:bg-secondary-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 group-hover:bg-accent-500 rounded-full transition-all duration-500 ease-in-out"
                  style={{ 
                    width: `${skill.level}%`,
                    transition: `width 1s ease-in-out ${index * 0.1}s`
                  }}
                ></div>
              </div>
              
              <div className="flex justify-between mt-2">
                <span className="text-xs text-secondary-500 dark:text-secondary-400">Niveau</span>
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection