// src/components/Projects.jsx
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const Projects = ({ projects }) => {
  const [visibleProjects, setVisibleProjects] = useState(3)
  const projectsRef = useRef(null)
  const isInView = useInView(projectsRef, { once: true, margin: "-100px 0px" })
  
  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 3, projects.length))
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <div ref={projectsRef} className="mt-8">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {projects.slice(0, visibleProjects).map((project, index) => (
          <motion.div 
            key={project.id}
            variants={itemVariants}
            className="group relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-secondary-800 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            {/* Project image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-3 right-3 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Featured
                </div>
              )}
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
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
            
            {/* Project info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">
                {project.title}
              </h3>
              
              <p className="text-secondary-600 dark:text-secondary-300 mb-4">
                {project.description}
              </p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
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
              
              {/* Links */}
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
      
      {/* Load more button */}
      {visibleProjects < projects.length && (
        <div className="text-center mt-10">
          <button
            onClick={loadMoreProjects}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Voir plus de projets
          </button>
        </div>
      )}
    </div>
  )
}

export default Projects