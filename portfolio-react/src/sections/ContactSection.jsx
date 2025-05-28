// src/sections/ContactSection.jsx
import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const formRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        success: false,
        message: 'Veuillez remplir tous les champs obligatoires.'
      })
      return
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        success: false,
        message: 'Veuillez entrer une adresse email valide.'
      })
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate form submission
    try {
      // In a real application, replace this with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSubmitStatus({
        success: true,
        message: 'Votre message a été envoyé avec succès ! Je vous contacterai dès que possible.'
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Une erreur est survenue. Veuillez réessayer plus tard.'
      })
    } finally {
      setIsSubmitting(false)
      
      // Auto-clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    }
  }
  
  // Add animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
          }
        })
      },
      { threshold: 0.1 }
    )
    
    const elements = document.querySelectorAll('.contact-animate')
    elements.forEach((el) => observer.observe(el))
    
    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

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
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="contact" className="py-20" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title mb-12 text-center">Me contacter</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Left column - Contact info */}
          <motion.div 
            className="md:col-span-2 contact-animate"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-10">
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                Discutons de votre projet
              </h3>
              <p className="text-secondary-600 dark:text-secondary-300 mb-6">
                N'hésitez pas à me contacter pour discuter de vos projets, poser des questions ou simplement dire bonjour. Je suis toujours ouvert à de nouvelles opportunités et collaborations.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/30 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mb-1">Email</h4>
                    <a 
                      href="mailto:mohammedbouzi177@gmail.com" 
                      className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      mohammedbouzi177@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/30 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mb-1">Téléphone</h4>
                    <a 
                      href="tel:+212690815605" 
                      className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      +212 690 815 605
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/30 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mb-1">Localisation</h4>
                    <p className="text-secondary-600 dark:text-secondary-300">
                      Beni Mellal, Maroc
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Social links */}
              <div className="mt-10">
                <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Suivez-moi</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/MOUHAMEDBOUZAYAN" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 p-3 rounded-full shadow-md transition-all hover:-translate-y-1"
                    aria-label="GitHub"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                    </svg>
                  </a>
                  <a 
                    href="https://linkedin.com/in/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 p-3 rounded-full shadow-md transition-all hover:-translate-y-1"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a 
                    href="https://twitter.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 p-3 rounded-full shadow-md transition-all hover:-translate-y-1"
                    aria-label="Twitter"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right column - Contact form */}
          <motion.div 
            className="md:col-span-3 contact-animate"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                Envoyez-moi un message
              </h3>
              
              {/* Status message */}
              {submitStatus && (
                <div className={`rounded-lg p-4 mb-6 ${
                  submitStatus.success 
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                    : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Votre email"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Sujet de votre message"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Votre message"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      
      
      
    </section>
  )
}

export default ContactSection