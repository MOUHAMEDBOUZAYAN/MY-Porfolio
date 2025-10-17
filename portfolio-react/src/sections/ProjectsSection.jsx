// src/sections/ProjectsSection.jsx
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// استيراد صور المشاريع الحالية
import portfolio from '../assets/projects/portfolio.jpg';
import CookSecure from '../assets/images/CookSecure.jpg';
import SecureAuth from '../assets/images/SecureAuth.png';
import Météo from '../assets/images/Application Météo.jpeg';
import Blog from '../assets/images/Blog.jpeg';
import film from '../assets/images/Projetfilm.jpg';
import Artisania from '../assets/images/Artisania.jpg';
import Quize from '../assets/images/quize.jpg';
import message from '../assets/images/message.png';
import MusicApp from '../assets/images/musicApp.png';
import Construction from '../assets/images/Construction.png';
import Calculatrice from '../assets/images/Calculatrice.png';

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredProject, setHoveredProject] = useState(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" })
  
  // مشاريع الواجهة الأمامية (Frontend) - 5 مشاريع
  const frontendProjects = [
    {
      id: 1,
      title: "Portfolio Personnel",
      description: "Ce portfolio moderne et interactif, créé avec React, Vite et Tailwind CSS, présente mes compétences, projets et parcours professionnel.",
      image: portfolio,
      technologies: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
      category: "frontend",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/MY-PORTFOLIO",
      liveLink: "#",
      featured: true
    },
    {
      id: 2,
      title: "Application Météo",
      description: "Application météo interactive utilisant l'API OpenWeatherMap pour fournir des prévisions météorologiques en temps réel avec une interface utilisateur intuitive.",
      image: Météo,
      technologies: ["React", "Tailwind CSS", "API REST", "Chart.js"],
      category: "frontend",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/weather-app",
      liveLink: "https://app-weather1.netlify.app/",
      featured: false
    },
    {
      id: 8,
      title: "FilmExplorer ",
      description: "🎬 FilmFinder - Explorez le Monde du Cinéma FilmFinder est une application web moderne et élégante pour découvrir, rechercher et explorer des films. Conçue avec React et une interface utilisateur exceptionnelle, elle offre une expérience immersive pour tous les passionnés de cinéma.",
      image: film, 
      technologies: ["JavaScript", "REACT", "HTML5", "Tailwind CSS"],
      category: "frontend",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/photographer-portfolio",
      liveLink: "https://film-finder-demo.netlify.app/",
      featured: false
    },
  ]
  
  // مشاريع الخلفية (Backend) - 1 مشروع
  const backendProjects = [
    {
      id: 10,
      title: "Calculatrice API",
      description: "API backend robuste développée avec Node.js pour effectuer des calculs mathématiques complexes. Service RESTful permettant d'effectuer des opérations arithmétiques, trigonométriques, logarithmiques et statistiques avec une architecture modulaire et une gestion d'erreurs avancée. Optimisée pour la performance et la précision des calculs.",
      image: Calculatrice, 
      technologies: ["Node.js", "Express", "JavaScript", "Jest", "ESLint"],
      category: "backend",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/calculatrice.git",
      liveLink: "https://github.com/MOUHAMEDBOUZAYAN/calculatrice.git",
      featured: false
    },
  ]
  
  // مشاريع الـ Fullstack - 8 مشاريع
  const fullstackProjects = [
    {
      id: 3,
      title: "Music-App--Project-file-Rouge",
      description: "Application de gestion de tâches avec fonctionnalités de drag-and-drop permettant aux utilisateurs d'organiser leurs tâches par statut et priorité. (En cours de développement)",
      image: MusicApp,
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      category: "fullstack",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/Music-App--Project-file-Rouge-",
      liveLink: "#",
      featured: true
    },
    {
      id: 4,
      title: "Blog personnel",
      description: "Plateforme de blog avec système d'authentification, édition de contenu en markdown et fonctionnalités de commentaires.",
      image: Blog,
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      category: "fullstack",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/Mern-Blogger",
      liveLink: "#",
      featured: false
    },
    {
      id: 5,
      title: "SecureAuth System",
      description: "Interface d'administration avec visualisations de données, gestion des utilisateurs et tableaux de bord interactifs.",
      image: SecureAuth,
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      category: "fullstack",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/Projet-API-D-authentification",
      liveLink: "#",
      featured: false
    },
    {
      id: 6,
      title: "CookSecure-Site",
      description: "Application complète de commerce électronique avec interface utilisateur moderne et API backend robuste pour la gestion des produits, commandes et utilisateurs.",
      image: CookSecure,
      technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      category: "fullstack",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/CookSecure-Site",
      liveLink: "https://cuisin-app.netlify.app/",
      featured: false
    },
    {
      id: 7,
      title: "Artisania (E-Commerce Site)",
      description: "Plateforme complète de commerce électronique avec interface utilisateur moderne, gestion des produits, statistiques en temps réel et système de commandes intégré.",
      image: Artisania, 
      technologies: ["React", "Redux", "Material UI", "Recharts", "Node.js", "Express"],
      category: "fullstack",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/Artisania.git",
      liveLink: "#",
      featured: false
    },
    {
      id: 9,
      title: "Quize Game",
      description: "Application de quiz interactive complète avec React + TypeScript, design moderne, animations Framer Motion, gestion de thèmes, système de score avancé et interface responsive. Backend intégré pour la gestion des scores.",
      image: Quize, 
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
      category: "fullstack",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/Application-de-Quiz.git",
      liveLink: "#",
      featured: false
    },
    {
      id: 11,
      title: "Application-de-Messagerie",
      description: "Application de messagerie complète en temps réel avec interface utilisateur moderne, chat en direct, notifications push, gestion des contacts et historique des conversations. Frontend développé avec React Native/Expo et backend robuste.",
      image: message, 
      technologies: ["React Native", "Expo Go", "Node.js", "Express", "Socket.IO", "MongoDB", "JWT"],
      category: "fullstack",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/Application-de-Messagerie.git",
      liveLink: "https://github.com/MOUHAMEDBOUZAYAN/Application-de-Messagerie.git",
      featured: false
    },
    {
      id: 12,
      title: "Jury Blanc",
      description: "Application web moderne pour optimiser et automatiser la gestion des jurys d'examen dans les établissements d'enseignement. Solution complète permettant aux administrateurs académiques de planifier efficacement les sessions d'évaluation, gérer les membres du jury et suivre l'ensemble du processus d'évaluation en temps réel. Interface intuitive pour la coordination des examens, notifications automatiques et génération de rapports détaillés.",
      image: Construction, 
      technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT", "React Query"],
      category: "fullstack",
      githubLink: "https://github.com/MOUHAMEDBOUZAYAN/Jury-Blanc-.git",
      liveLink: "https://constructionxpert.netlify.app",
      featured: false
    }
  ]
  
  // دمج جميع المشاريع في مصفوفة واحدة
  const allProjects = [...frontendProjects, ...backendProjects, ...fullstackProjects]
  
  // فئات المشاريع
  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Fullstack' },
  ]
  
  // تصفية المشاريع حسب الفئة النشطة
  const [filteredProjects, setFilteredProjects] = useState(allProjects)
  
  useEffect(() => {
    // تأثير مع التأخير للتحريك
    const filterProjects = () => {
      if (activeCategory === 'all') {
        setFilteredProjects(allProjects);
      } else {
        setFilteredProjects(allProjects.filter(project => project.category === activeCategory));
      }
    };
    
    // تأخير قصير للسماح بالتحريك
    const timer = setTimeout(() => {
      filterProjects();
    }, 50);
    
    return () => clearTimeout(timer);
  }, [activeCategory, allProjects]);

  // متغيرات التحريك
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // تحريكات للفئات
  const categoryVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    active: {
      backgroundColor: "#4F46E5",
      color: "#FFFFFF",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    },
    inactive: {
      backgroundColor: "transparent",
      color: "#6B7280"
    }
  };

  // تحريكات للمشاريع
  const projectVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 0.95,
      transition: { 
        duration: 0.2 
      }
    }
  };

  return (
    <section id="projects" className="py-20 bg-secondary-50 dark:bg-secondary-900" ref={sectionRef}>
      <div className="section-container">
        <motion.h2 
          className="section-title mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          Mes projets
        </motion.h2>
        
        {/* قسم الفئات - تحسين التنشيط والتحريك */}
        <motion.div 
          className="flex flex-wrap justify-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white dark:bg-secondary-800 shadow-lg rounded-full p-2 inline-flex flex-wrap justify-center">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all m-1 overflow-hidden`}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={activeCategory === category.id ? "active" : "inactive"}
                variants={categoryVariants}
              >
                {/* خلفية متحركة للزر النشط */}
                {activeCategory === category.id && (
                  <motion.div
                    className="absolute inset-0 bg-primary-500 rounded-full z-0"
                    layoutId="activeCategory"
                    initial={{ borderRadius: 24 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 20 
                    }}
                  />
                )}
                
                {/* نص الزر */}
                <span className={`relative z-10 ${
                  activeCategory === category.id 
                    ? 'text-white' 
                    : 'text-secondary-600 dark:text-secondary-300'
                }`}>
                  {category.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* مشاريع - تحسين التحريكات */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id}
                className="group relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-secondary-800 transform transition-all duration-300 flex flex-col h-full"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                variants={projectVariants}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                {/* صورة المشروع */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = MusicApp;
                      e.target.onerror = null;
                    }}
                  />
                  
                  {/* شارة "Featured" للمشاريع المميزة */}
                  {project.featured && (
                    <motion.div 
                      className="absolute top-3 right-3 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Featured
                    </motion.div>
                  )}
                  
                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <motion.span
                            key={index}
                            className="inline-block bg-primary-500/20 text-primary-100 text-xs px-2 py-1 rounded-full backdrop-blur-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.technologies.length > 3 && (
                          <motion.span
                            className="inline-block bg-primary-500/20 text-primary-100 text-xs px-2 py-1 rounded-full backdrop-blur-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            +{project.technologies.length - 3}
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* معلومات المشروع */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-secondary-600 dark:text-secondary-300 mb-4 min-h-[80px] flex-grow">
                    {project.description}
                  </p>
                  
                  {/* التقنيات */}
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
                  
                  {/* الروابط - الحل النهائي لمشكلة المحاذاة */}
                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 flex items-center justify-center text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors border border-secondary-200 dark:border-secondary-700 py-2 px-3 rounded-md hover:bg-secondary-50 dark:hover:bg-secondary-800"
                    >
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                        />
                      </svg>
                      <span className="whitespace-nowrap">GitHub</span>
                    </a>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 flex items-center justify-center text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors border border-secondary-200 dark:border-secondary-700 py-2 px-3 rounded-md hover:bg-secondary-50 dark:hover:bg-secondary-800"
                    >
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      <span className="whitespace-nowrap">Voir le projet</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* رؤية المزيد من المشاريع */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.a
            href="https://github.com/MOUHAMEDBOUZAYAN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-secondary-800 dark:bg-secondary-700 text-white rounded-full font-medium hover:bg-secondary-700 dark:hover:bg-secondary-600 transition-all shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
              />
            </svg>
            Voir plus de projets sur GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection