// src/sections/ProjectsSection.jsx
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredProject, setHoveredProject] = useState(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" })
  
  // Projets fictifs basés sur les compétences
  const projects = [
    {
      id: 1,
      title: "Portfolio Personnel",
      description: "Ce portfolio moderne et interactif, créé avec React, Vite et Tailwind CSS, présente mes compétences, projets et parcours professionnel.",
      image: "/assets/images/projects/portfolio.jpg",
      technologies: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
      category: "frontend",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/portfolio",
      liveLink: "#",
      featured: true
    },
    {
      id: 2,
      title: "Application Météo",
      description: "Application météo interactive utilisant l'API OpenWeatherMap pour fournir des prévisions météorologiques en temps réel avec une interface utilisateur intuitive.",
      image: "/assets/images/projects/weather-app.jpg",
      technologies: ["React", "Tailwind CSS", "API REST", "Chart.js"],
      category: "frontend",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/weather-app",
      liveLink: "#",
      featured: true
    },
    {
      id: 3,
      title: "Gestionnaire de Tâches",
      description: "Application de gestion de tâches avec fonctionnalités de drag-and-drop permettant aux utilisateurs d'organiser leurs tâches par statut et priorité.",
      image: "/assets/images/projects/task-manager.jpg",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      category: "fullstack",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/task-manager",
      liveLink: "#",
      featured: true
    },
    {
      id: 4,
      title: "Blog personnel",
      description: "Plateforme de blog avec système d'authentification, édition de contenu en markdown et fonctionnalités de commentaires.",
      image: "/assets/images/projects/blog.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      category: "fullstack",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/blog-platform",
      liveLink: "#",
      featured: false
    },
    {
      id: 5,
      title: "Dashboard Admin",
      description: "Interface d'administration avec visualisations de données, gestion des utilisateurs et tableaux de bord interactifs.",
      image: "/assets/images/projects/dashboard.jpg",
      technologies: ["React", "Tailwind CSS", "Chart.js", "Context API"],
      category: "frontend",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/admin-dashboard",
      liveLink: "#",
      featured: false
    },
    {
      id: 6,
      title: "API de Commerce Électronique",
      description: "API RESTful pour une application de commerce électronique, avec gestion des produits, commandes et utilisateurs.",
      image: "/assets/images/projects/ecommerce-api.jpg",
      technologies: ["Node.js", "Express", "MongoDB", "JWT"],
      category: "backend",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/ecommerce-api",
      liveLink: "#",
      featured: false
    }
  ]
  
  // Catégories de projets
  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Fullstack' },
  ]
  
  // Filtrer les projets en fonction de la catégorie active
  const [filteredProjects, setFilteredProjects] = useState(projects)
  
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeCategory))
    }
  }, [activeCategory])

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

  return (
    <section id="projects" className="py-20 bg-secondary-50 dark:bg-secondary-900" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title mb-12 text-center">Mes projets</h2>
        
        {/* Catégories */}
        <motion.div 
          className="flex flex-wrap justify-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
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
        </motion.div>
        
        {/* Projets */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id}
              className="group relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-secondary-800 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              variants={itemVariants}
            >
              {/* Image du projet */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Badge "Featured" pour les projets mis en avant */}
                {project.featured && (
                  <div className="absolute top-3 right-3 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Featured
                  </div>
                )}
                
                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 transform transition-opacity duration-300 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="inline-block bg-primary-500/20 text-primary-100 text-xs px-2 py-1 rounded-full backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="inline-block bg-primary-500/20 text-primary-100 text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Informations du projet */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                
                <p className="text-secondary-600 dark:text-secondary-300 mb-4">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <span
                      key={index}
                      className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs px-2 py-1 rounded-full">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
                
                {/* Liens */}
                <div className="flex gap-4">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                      />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Voir le projet
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Voir plus de projets */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="https://github.com/MOUHAMEDBOUZAYAN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-secondary-800 dark:bg-secondary-700 text-white rounded-full font-medium hover:bg-secondary-700 dark:hover:bg-secondary-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
              />
            </svg>
            Voir plus de projets sur GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection