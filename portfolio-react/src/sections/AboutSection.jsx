// src/sections/AboutSection.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import about from '../assets/images/about-me.jpg';
// Le CV sera chargé depuis le dossier public

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('education');
  const [downloadState, setDownloadState] = useState('idle'); // 'idle', 'downloading', 'success'

  // Effet pour retourner à l'état initial après téléchargement
  useEffect(() => {
    if (downloadState === 'success') {
      const timer = setTimeout(() => setDownloadState('idle'), 3000);
      return () => clearTimeout(timer);
    }
  }, [downloadState]);

  // Fonction pour gérer le téléchargement du CV
  const handleDownloadCV = async () => {
    try {
      setDownloadState('downloading');

      // Chemin vers le CV dans le dossier public
      const cvPath = '/Mouhamed_Bouzyane_CV.pdf';
      
      // Créer un lien de téléchargement
      const link = document.createElement('a');
      link.href = cvPath;
      link.download = 'Mouhamed_Bouzyane_CV.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Ajouter au DOM et déclencher le téléchargement
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Attendre un peu pour simuler le téléchargement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDownloadState('success');
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      setDownloadState('idle');
    }
  };

  // Données pour les onglets
  const tabs = [
    { id: 'education', label: 'Formation' },
    { id: 'experience', label: 'Expérience' },
    { id: 'certifications', label: 'Certifications' },
  ];

  // Contenu des onglets
  const tabContents = {
    education: [
      {
        degree: 'Formation JavaScript',
        institution: 'École Numérique Ahmed El Hansali (Partenariat avec Simplon)',
        period: '2023 - En cours',
        description: 'Formation intensive en développement web avec spécialisation JavaScript et React. Apprentissage des pratiques modernes de développement et réalisation de projets concrets.',
      },
      {
        degree: 'Deug en Biologie, chimie, géologie',
        institution: 'Faculté des sciences et des techniques, Beni Mellal',
        period: '2022 - 2024',
        description: 'Formation scientifique pluridisciplinaire, développant rigueur analytique et méthodologie de résolution de problèmes complexes.',
      },
      {
        degree: 'Baccalauréat en Science Physique',
        institution: 'Lycée Moulay Rchid, Kasbat-Tadla',
        period: '2021 - 2022',
        description: 'Formation scientifique avec spécialisation en physique, menant à l\'acquisition de compétences analytiques et mathématiques.',
      },
    ],
    experience: [
      {
        title: 'Développeur Web Full Stack Junior',
        company: 'Projet personnel de portfolio',
        period: '2023 - Présent',
        description: 'Création d\'un portfolio personnel en utilisant React, Tailwind CSS et des animations modernes pour mettre en valeur mes compétences et projets.',
      },
      {
        title: 'Développeur Web Full Stack – LIADTECH',
        company: 'LIADTECH',
        period: '2025 – Présent',
        description: 'Développement d’applications web avec la stack PERN (PostgreSQL, Express.js, React.js, Node.js) et mise en œuvre de fonctionnalités front-end et back-end.',
      },
    ],
    certifications: [
      {
        name: 'Formation JavaScript & React',
        issuer: 'École Numérique Ahmed El Hansali',
        date: '2023 - En cours',
        description: 'Certification en cours dans le développement d\'applications web modernes avec JavaScript, React et Node.js.',
      },
    ],
  };

  // Variantes d'animation pour les éléments de contact
  const contactContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const contactItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Animation pour le bouton CV
  const buttonVariants = {
    idle: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 },
    downloading: {
      scale: [1, 1.03, 1],
      transition: {
        repeat: Infinity,
        duration: 1
      }
    },
    success: {
      scale: [1, 1.2, 1],
      backgroundColor: ["#2563eb", "#10b981", "#2563eb"],
      transition: { duration: 0.5 }
    }
  };

  // Animations pour la partie "Mon parcours"
  const parcoursHeaderVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const tabsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const tabItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.3 }
    }
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Animation pour la note supplémentaire dans la section Certifications
  const noteVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.3
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-secondary-50 dark:bg-secondary-900">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          {/* Left column - Photo and intro */}
          <div className="md:w-2/5 animate-on-scroll">
            <motion.h2
              className="section-title mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              À propos de moi
            </motion.h2>

            <motion.div
              className="relative mb-8 rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img
                src={about}
                alt="Photo de Mouhamed Bouzyane"
                className="w-full h-auto"
              />

              {/* Decorative elements */}
              <motion.div
                className="absolute inset-0 border-4 border-white dark:border-secondary-800 rounded-2xl transform rotate-3 opacity-70"
                initial={{ opacity: 0, rotate: 0 }}
                whileInView={{ opacity: 0.7, rotate: 3 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />

              <motion.div
                className="absolute top-4 left-4 bg-white dark:bg-secondary-800 rounded-lg shadow-lg p-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <svg className="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </motion.div>
            </motion.div>

            <div className="prose dark:prose-invert max-w-none">
              <motion.p
                className="text-lg text-secondary-700 dark:text-secondary-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Actuellement en formation JavaScript à l'École Numérique Ahmed El Hansali, je suis passionné par le développement web et les technologies modernes. Je me spécialise en <span className="text-primary-600 dark:text-primary-400 font-medium">HTML/CSS</span>, <span className="text-primary-600 dark:text-primary-400 font-medium">JavaScript</span>, <span className="text-primary-600 dark:text-primary-400 font-medium">React</span> et <span className="text-primary-600 dark:text-primary-400 font-medium">Tailwind CSS</span>.
              </motion.p>
              <motion.p
                className="text-secondary-600 dark:text-secondary-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Mon parcours académique en sciences m'a doté d'une approche analytique et d'une rigueur méthodologique que j'applique au développement web. Je suis à la recherche d'opportunités pour mettre en pratique mes compétences et contribuer à des projets innovants.
              </motion.p>
            </div>

            {/* Personal details - CONTACTS ANIMÉS */}
            <motion.div
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={contactContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Email - avec animation et correction pour l'affichage */}
              <motion.div
                className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                variants={contactItemVariants}
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0"
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </motion.div>
                <div className="overflow-hidden">
                  <h3 className="text-xs text-secondary-500 dark:text-secondary-400">Email</h3>
                  <p className="text-secondary-900 dark:text-white text-sm break-all">mohammedbouzi177@gmail.com</p>
                </div>
              </motion.div>

              {/* Téléphone */}
              <motion.div
                className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                variants={contactItemVariants}
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0"
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </motion.div>
                <div className="overflow-hidden">
                  <h3 className="text-xs text-secondary-500 dark:text-secondary-400">Téléphone</h3>
                  <p className="text-secondary-900 dark:text-white text-sm">+212 690 815 605</p>
                </div>
              </motion.div>

              {/* Localisation */}
              <motion.div
                className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                variants={contactItemVariants}
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0"
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </motion.div>
                <div className="overflow-hidden">
                  <h3 className="text-xs text-secondary-500 dark:text-secondary-400">Localisation</h3>
                  <p className="text-secondary-900 dark:text-white text-sm">Beni Mellal, Maroc</p>
                </div>
              </motion.div>

              {/* GitHub */}
              <motion.div
                className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                variants={contactItemVariants}
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0"
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </motion.div>
                <div className="overflow-hidden">
                  <h3 className="text-xs text-secondary-500 dark:text-secondary-400">GitHub</h3>
                  <p className="text-secondary-900 dark:text-white text-sm">
                    <a href="https://github.com/MOUHAMEDBOUZAYAN" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">
                      MOUHAMEDBOUZAYAN
                    </a>
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Download CV button - ANIMATION AMÉLIORÉE */}
            <div className="mt-8">
              <motion.button
                className="inline-flex items-center px-5 py-3 bg-primary-600 text-white rounded-lg font-medium shadow-lg relative overflow-hidden group"
                onClick={handleDownloadCV}
                variants={buttonVariants}
                initial="idle"
                animate={downloadState}
                whileHover="hover"
                whileTap="tap"
              >
                {/* Icône et animation pour état de téléchargement */}
                <motion.div
                  className="relative z-10 flex items-center"
                  animate={{
                    y: downloadState === 'downloading' ? [0, -5, 5, 0] : 0
                  }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  {downloadState === 'idle' && (
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  )}

                  {downloadState === 'downloading' && (
                    <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}

                  {downloadState === 'success' && (
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}

                  <span>
                    {downloadState === 'idle' && "Télécharger mon CV"}
                    {downloadState === 'downloading' && "Téléchargement..."}
                    {downloadState === 'success' && "CV téléchargé !"}
                  </span>
                </motion.div>

                {/* Effet de fond (pour style "ondes") */}
                <motion.div
                  className="absolute inset-0 w-full h-full bg-white opacity-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={downloadState === 'success' ? {
                    scale: 10,
                    opacity: 0.2,
                  } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </div>
          </div>

          {/* Right column - Experience tabs - ANIMÉ */}
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h3
              className="text-2xl font-bold text-secondary-900 dark:text-white mb-6"
              variants={parcoursHeaderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Mon parcours
              </motion.span>
            </motion.h3>

            {/* Tabs navigation - ANIMÉ */}
            <motion.div
              className="flex border-b border-secondary-200 dark:border-secondary-700 mb-6"
              variants={tabsContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  className={`py-3 px-4 font-medium text-sm transition-colors border-b-2 -mb-px ${activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300'
                    }`}
                  onClick={() => setActiveTab(tab.id)}
                  variants={tabItemVariants}
                  custom={index}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </motion.div>

            {/* Tab content - ANIMÉ AVEC TRANSITIONS */}
            <AnimatePresence mode="wait">
              {/* Education Tab */}
              {activeTab === 'education' && (
                <motion.div
                  key="education"
                  className="space-y-6"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ staggerChildren: 0.15 }}
                >
                  {tabContents.education.map((item, index) => (
                    <motion.div
                      key={index}
                      className="relative pl-8 pb-6"
                      variants={timelineItemVariants}
                      custom={index}
                      whileHover={{ x: 5 }}
                    >
                      {/* Vertical line with animation */}
                      {index !== tabContents.education.length - 1 && (
                        <motion.div
                          className="absolute top-0 bottom-0 left-3 w-px bg-primary-200 dark:bg-primary-800/50"
                          initial={{ height: 0 }}
                          animate={{ height: '100%' }}
                          transition={{ duration: 0.5, delay: 0.3 * index }}
                        />
                      )}

                      {/* Dot with animation */}
                      <motion.div
                        className="absolute top-0 left-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500 dark:border-primary-600"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 5, stiffness: 100, delay: 0.1 * index }}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                      />

                      <motion.div
                        className="card hover:border-primary-400 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 * index }}
                        whileHover={{
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                          y: -5
                        }}
                      >
                        <h4 className="text-lg font-bold text-secondary-900 dark:text-white">{item.degree}</h4>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">{item.institution}</p>
                        <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-3">{item.period}</p>
                        <p className="text-secondary-600 dark:text-secondary-300">{item.description}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Experience Tab */}
              {activeTab === 'experience' && (
                <motion.div
                  key="experience"
                  className="space-y-6"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ staggerChildren: 0.15 }}
                >
                  {tabContents.experience.map((item, index) => (
                    <motion.div
                      key={index}
                      className="relative pl-8 pb-6"
                      variants={timelineItemVariants}
                      custom={index}
                      whileHover={{ x: 5 }}
                    >
                      {/* Vertical line with animation */}
                      {index !== tabContents.experience.length - 1 && (
                        <motion.div
                          className="absolute top-0 bottom-0 left-3 w-px bg-primary-200 dark:bg-primary-800/50"
                          initial={{ height: 0 }}
                          animate={{ height: '100%' }}
                          transition={{ duration: 0.5, delay: 0.3 * index }}
                        />
                      )}

                      {/* Dot with animation */}
                      <motion.div
                        className="absolute top-0 left-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500 dark:border-primary-600"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 5, stiffness: 100, delay: 0.1 * index }}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                      />

                      <motion.div
                        className="card hover:border-primary-400 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 * index }}
                        whileHover={{
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                          y: -5
                        }}
                      >
                        <h4 className="text-lg font-bold text-secondary-900 dark:text-white">{item.title}</h4>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">{item.company}</p>
                        <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-3">{item.period}</p>
                        <p className="

 text-secondary-600 dark:text-secondary-300">{item.description}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Certifications Tab */}
              {activeTab === 'certifications' && (
                <motion.div
                  key="certifications"
                  className="space-y-6"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ staggerChildren: 0.15 }}
                >
                  {tabContents.certifications.map((item, index) => (
                    <motion.div
                      key={index}
                      className="relative pl-8 pb-6"
                      variants={timelineItemVariants}
                      custom={index}
                      whileHover={{ x: 5 }}
                    >
                      {/* Vertical line with animation */}
                      {index !== tabContents.certifications.length - 1 && (
                        <motion.div
                          className="absolute top-0 bottom-0 left-3 w-px bg-primary-200 dark:bg-primary-800/50"
                          initial={{ height: 0 }}
                          animate={{ height: '100%' }}
                          transition={{ duration: 0.5, delay: 0.3 * index }}
                        />
                      )}

                      {/* Dot with animation */}
                      <motion.div
                        className="absolute top-0 left-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500 dark:border-primary-600"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 5, stiffness: 100, delay: 0.1 * index }}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                      />

                      <motion.div
                        className="card hover:border-primary-400 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 * index }}
                        whileHover={{
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                          y: -5
                        }}
                      >
                        <h4 className="text-lg font-bold text-secondary-900 dark:text-white">{item.name}</h4>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">{item.issuer}</p>
                        <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-3">{item.date}</p>
                        <p className="text-secondary-600 dark:text-secondary-300">{item.description}</p>
                      </motion.div>
                    </motion.div>
                  ))}

                  {/* Note supplémentaire avec animation */}
                  <motion.div
                    className="pl-8"
                    variants={noteVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <p className="text-secondary-600 dark:text-secondary-300 italic">
                      Je suis actuellement en formation et continue à acquérir de nouvelles certifications au fur et à mesure de mon parcours.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;