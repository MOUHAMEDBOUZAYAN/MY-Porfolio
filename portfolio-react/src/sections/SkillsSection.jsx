// src/sections/SkillsSection.jsx
import { useState } from 'react'

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  
  // Catégories de compétences
  const categories = [
    { id: 'all', label: 'Toutes' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'devops', label: 'DevOps/Outils' },
    { id: 'soft', label: 'Compétences Relationnelles' },
  ]
  
  // Liste des compétences
  const skills = [
    // Frontend
    { name: 'HTML5 / CSS3', level: 90, category: 'frontend', icon: '🌐' },
    { name: 'JavaScript (ES7)', level: 85, category: 'frontend', icon: '⚡' },
    { name: 'React.js', level: 85, category: 'frontend', icon: '⚛️' },
    { name: 'Tailwind CSS / Bootstrap / Sass', level: 88, category: 'frontend', icon: '🎨' },
    { name: 'TypeScript', level: 75, category: 'frontend', icon: '📘' },
    { name: 'Context API', level: 80, category: 'frontend', icon: '🔄' },
    { name: 'Responsive Design / Mobile First', level: 90, category: 'frontend', icon: '📱' },
    { name: 'Figma / Adobe XD', level: 70, category: 'frontend', icon: '🖌️' },
    
    // Backend
    { name: 'Node.js / Express.js', level: 80, category: 'backend', icon: '🟩' },
    { name: 'RESTful APIs / GraphQL', level: 75, category: 'backend', icon: '🔄' },
    { name: 'MongoDB / Mongoose / MySQL', level: 75, category: 'backend', icon: '🗃️' },
    { name: 'JWT / OAuth2', level: 70, category: 'backend', icon: '🔐' },
    { name: 'Gestion des rôles et permissions', level: 65, category: 'backend', icon: '👥' },
    { name: 'WebSockets', level: 60, category: 'backend', icon: '📡' },
    
    // DevOps/Outils
    { name: 'Git / GitHub / GitLab', level: 85, category: 'devops', icon: '🔄' },
    { name: 'Postman / Insomnia', level: 80, category: 'devops', icon: '🧪' },
    { name: 'VS Code', level: 95, category: 'devops', icon: '📝' },
    
    // Compétences relationnelles
    { name: 'Travail en équipe (Agile/Scrum)', level: 85, category: 'soft', icon: '👥' },
    { name: 'Autonomie et rigueur', level: 90, category: 'soft', icon: '🔍' },
    { name: 'Communication', level: 80, category: 'soft', icon: '💬' },
    { name: 'Résolution de problèmes', level: 85, category: 'soft', icon: '🧩' },
    { name: 'Organisation et gestion des priorités', level: 80, category: 'soft', icon: '📊' },
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
          <div className="bg-white dark:bg-secondary-800 shadow-md rounded-full p-1 inline-flex flex-wrap justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all m-1 ${
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
        
        {/* Langues */}
        {(activeCategory === 'all' || activeCategory === 'soft') && (
          <div className="mt-16 animate-on-scroll">
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
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div className="card p-4">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-bold text-secondary-900 dark:text-white">Français</h4>
                    <span className="text-primary-600 dark:text-primary-400">Courant</span>
                  </div>
                  <div className="w-full h-3 bg-secondary-100 dark:bg-secondary-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div className="card p-4">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-bold text-secondary-900 dark:text-white">Anglais</h4>
                    <span className="text-primary-600 dark:text-primary-400">Niveau intermédiaire</span>
                  </div>
                  <div className="w-full h-3 bg-secondary-100 dark:bg-secondary-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default SkillsSection