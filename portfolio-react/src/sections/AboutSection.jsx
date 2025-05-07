// src/sections/AboutSection.jsx
import { useState } from 'react'
import about from '../assets/images/about-me.jpg'

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('education')
  
  // Données pour les onglets
  const tabs = [
    { id: 'education', label: 'Formation' },
    { id: 'experience', label: 'Expérience' },
    { id: 'certifications', label: 'Certifications' },
  ]
  
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
        title: 'Développeur Front-end Junior',
        company: 'Projet personnel de portfolio',
        period: '2023 - Présent',
        description: 'Création d\'un portfolio personnel en utilisant React, Tailwind CSS et des animations modernes pour mettre en valeur mes compétences et projets.',
      },
      {
        title: 'Développeur Web Stagiaire',
        company: 'Formation pratique',
        period: '2023',
        description: 'Développement de projets Web dans le cadre de la formation. Implémentation de fonctionnalités front-end et back-end avec des technologies modernes.',
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
  }

  return (
    <section id="about" className="py-20 bg-secondary-50 dark:bg-secondary-900">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          {/* Left column - Photo and intro */}
          <div className="md:w-2/5 animate-on-scroll">
            <h2 className="section-title">À propos de moi</h2>
            
            <div className="relative mb-8 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={about} 
                alt="Photo de Mouhamed Bouzyane" 
                className="w-full h-auto"
              />
              
              {/* Decorative elements */}
              <div className="absolute inset-0 border-4 border-white dark:border-secondary-800 rounded-2xl transform rotate-3 opacity-70"></div>
              <div className="absolute top-4 left-4 bg-white dark:bg-secondary-800 rounded-lg shadow-lg p-3">
                <svg className="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-secondary-700 dark:text-secondary-300">
                Actuellement en formation JavaScript à l'École Numérique Ahmed El Hansali, je suis passionné par le développement web et les technologies modernes. Je me spécialise en <span className="text-primary-600 dark:text-primary-400 font-medium">HTML/CSS</span>, <span className="text-primary-600 dark:text-primary-400 font-medium">JavaScript</span>, <span className="text-primary-600 dark:text-primary-400 font-medium">React</span> et <span className="text-primary-600 dark:text-primary-400 font-medium">Tailwind CSS</span>.
              </p>
              <p className="text-secondary-600 dark:text-secondary-400">
                Mon parcours académique en sciences m'a doté d'une approche analytique et d'une rigueur méthodologique que j'applique au développement web. Je suis à la recherche d'opportunités pour mettre en pratique mes compétences et contribuer à des projets innovants.
              </p>
            </div>
            
            {/* Personal details */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs text-secondary-500 dark:text-secondary-400">Email</h3>
                  <p className="text-secondary-900 dark:text-white">mohammedbouzi177@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs text-secondary-500 dark:text-secondary-400">Téléphone</h3>
                  <p className="text-secondary-900 dark:text-white">+212 690 815 605</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs text-secondary-500 dark:text-secondary-400">Localisation</h3>
                  <p className="text-secondary-900 dark:text-white">Beni Mellal, Maroc</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs text-secondary-500 dark:text-secondary-400">GitHub</h3>
                  <p className="text-secondary-900 dark:text-white">
                    <a href="https://github.com/MOUHAMEDBOUZAYAN" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">
                      MOUHAMEDBOUZAYAN
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Download CV button */}
            <div className="mt-8">
              <a
                href="/assets/resume.pdf"
                download
                className="inline-flex items-center px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Télécharger mon CV
              </a>
            </div>
          </div>
          
          {/* Right column - Experience tabs */}
          <div className="md:w-1/2 animate-on-scroll">
            <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
              Mon parcours
            </h3>
            
            {/* Tabs navigation */}
            <div className="flex border-b border-secondary-200 dark:border-secondary-700 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`py-3 px-4 font-medium text-sm transition-colors border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Tab content - Education */}
            <div className={`space-y-6 ${activeTab === 'education' ? 'block' : 'hidden'}`}>
              {tabContents.education.map((item, index) => (
                <div key={index} className="relative pl-8 pb-6 stagger-animation">
                  {/* Vertical line */}
                  {index !== tabContents.education.length - 1 && (
                    <div className="absolute top-0 bottom-0 left-3 w-px bg-primary-200 dark:bg-primary-800/50"></div>
                  )}
                  
                  {/* Dot */}
                  <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500 dark:border-primary-600"></div>
                  
                  <div className="card">
                    <h4 className="text-lg font-bold text-secondary-900 dark:text-white">{item.degree}</h4>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">{item.institution}</p>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-3">{item.period}</p>
                    <p className="text-secondary-600 dark:text-secondary-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Tab content - Experience */}
            <div className={`space-y-6 ${activeTab === 'experience' ? 'block' : 'hidden'}`}>
              {tabContents.experience.map((item, index) => (
                <div key={index} className="relative pl-8 pb-6 stagger-animation">
                  {/* Vertical line */}
                  {index !== tabContents.experience.length - 1 && (
                    <div className="absolute top-0 bottom-0 left-3 w-px bg-primary-200 dark:bg-primary-800/50"></div>
                  )}
                  
                  {/* Dot */}
                  <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500 dark:border-primary-600"></div>
                  
                  <div className="card">
                    <h4 className="text-lg font-bold text-secondary-900 dark:text-white">{item.title}</h4>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">{item.company}</p>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-3">{item.period}</p>
                    <p className="text-secondary-600 dark:text-secondary-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Tab content - Certifications */}
            <div className={`space-y-6 ${activeTab === 'certifications' ? 'block' : 'hidden'}`}>
              {tabContents.certifications.map((item, index) => (
                <div key={index} className="relative pl-8 pb-6 stagger-animation">
                  {/* Vertical line */}
                  {index !== tabContents.certifications.length - 1 && (
                    <div className="absolute top-0 bottom-0 left-3 w-px bg-primary-200 dark:bg-primary-800/50"></div>
                  )}
                  
                  {/* Dot */}
                  <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500 dark:border-primary-600"></div>
                  
                  <div className="card">
                    <h4 className="text-lg font-bold text-secondary-900 dark:text-white">{item.name}</h4>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">{item.issuer}</p>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-3">{item.date}</p>
                    <p className="text-secondary-600 dark:text-secondary-300">{item.description}</p>
                  </div>
                </div>
              ))}
              
              <div className="pl-8">
                <p className="text-secondary-600 dark:text-secondary-300 italic">Je suis actuellement en formation et continue à acquérir de nouvelles certifications au fur et à mesure de mon parcours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection