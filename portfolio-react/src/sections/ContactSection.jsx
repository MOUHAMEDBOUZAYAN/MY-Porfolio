// src/sections/ContactSection.jsx
import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'

const ContactSection = () => {
  // EmailJS Configuration (embedded directly)
  const EMAIL_CONFIG = {
    serviceId: 'service_9wwgnxp',
    templateId: {
      admin: 'template_w8ltyde',        // Template for you to receive user info
      autoReply: 'template_z4f5cel'    // Template for user thank you message
    },
    publicKey: 'iUtUq3faFI-b5105a'
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    company: '',
    projectType: 'web-development'
  })
  
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  
  const formRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" })

  // Initialize EmailJS
  useEffect(() => {
    const initEmailJS = async () => {
      try {
        await emailjs.init(EMAIL_CONFIG.publicKey)
        console.log('✅ EmailJS initialized successfully with public key:', EMAIL_CONFIG.publicKey)
        console.log('📧 Service ID:', EMAIL_CONFIG.serviceId)
        console.log('📝 Template IDs:', EMAIL_CONFIG.templateId)
        
        // EmailJS ready for use
        console.log('✅ EmailJS is ready to send emails')
      } catch (error) {
        console.error('❌ EmailJS initialization error:', error)
      }
    }
    
    initEmailJS()
  }, [])

  // Utility function to get project type label
  const getProjectTypeLabel = (projectType) => {
    const types = {
      'web-development': 'Développement Web',
      'mobile-app': 'Application Mobile',
      'e-commerce': 'E-commerce',
      'redesign': 'Refonte de site',
      'consulting': 'Conseil',
      'maintenance': 'Maintenance',
      'other': 'Autre'
    }
    return types[projectType] || 'Non spécifié'
  }

  // Send email to admin (you)
  const sendEmailToAdmin = async (formData) => {
    try {
      const templateParams = {
        // User information
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Non renseigné',
        company: formData.company || 'Non renseigné',
        project_type: getProjectTypeLabel(formData.projectType),
        
        // Message
        subject: formData.subject,
        message: formData.message,
        
        // System information
        date: new Date().toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        
        // Your email (destination)
        to_email: 'mohammedbouzi177@gmail.com',
        to_name: 'Mouhamed Bouzayane'
      }

      const result = await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId.admin,
        templateParams
      )

      console.log('✅ Admin email sent:', result)
      return { success: true, data: result }
    } catch (error) {
      console.error('❌ Admin email error:', error)
      console.error('❌ Error details:', {
        status: error.status,
        text: error.text,
        message: error.message,
        serviceId: EMAIL_CONFIG.serviceId,
        templateId: EMAIL_CONFIG.templateId.admin
      })
      return { success: false, error: error.text || error.message || 'Erreur inconnue' }
    }
  }

  // Send thank you email to user
  const sendAutoReplyToUser = async (formData) => {
    try {
      const templateParams = {
        // User information
        to_name: formData.name,
        to_email: formData.email,
        
        // Original message info
        original_subject: formData.subject,
        project_type: getProjectTypeLabel(formData.projectType),
        
        // Confirmation info
        confirmation_date: new Date().toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        
        // Your contact information
        admin_name: 'Mouhamed Bouzyane',
        admin_email: 'mohammedbouzi177@gmail.com',
        admin_phone: '+212 690 815 605',
        
        // Custom message
        response_time: '24-48 heures',
        website_url: window.location.origin
      }

      const result = await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId.autoReply,
        templateParams
      )

      console.log('✅ User confirmation email sent:', result)
      return { success: true, data: result }
    } catch (error) {
      console.error('❌ User confirmation email error:', error)
      console.error('❌ Error details:', {
        status: error.status,
        text: error.text,
        message: error.message,
        serviceId: EMAIL_CONFIG.serviceId,
        templateId: EMAIL_CONFIG.templateId.autoReply
      })
      return { success: false, error: error.text || error.message || 'Erreur inconnue' }
    }
  }

  // Main function to send both emails
  const sendContactEmails = async (formData) => {
    try {
      console.log('📧 Sending contact emails...')
      
      // Send both emails in parallel
      const [adminResult, userResult] = await Promise.allSettled([
        sendEmailToAdmin(formData),
        sendAutoReplyToUser(formData)
      ])

      // Analyze results
      const results = {
        admin: adminResult.status === 'fulfilled' ? adminResult.value : { success: false, error: adminResult.reason },
        user: userResult.status === 'fulfilled' ? userResult.value : { success: false, error: userResult.reason }
      }

      // Check overall success
      const adminSuccess = results.admin.success
      const userSuccess = results.user.success

      if (adminSuccess && userSuccess) {
        console.log('✅ All emails sent successfully')
        return {
          success: true,
          message: 'Votre message a été envoyé avec succès ! Vous allez recevoir une confirmation par email.',
          details: results
        }
      } else if (adminSuccess && !userSuccess) {
        console.log('⚠️ Admin email sent, but user confirmation failed')
        return {
          success: true,
          message: 'Votre message a été envoyé avec succès ! (Note: la confirmation automatique pourrait avoir un délai)',
          details: results
        }
      } else if (!adminSuccess && userSuccess) {
        console.log('⚠️ User confirmation sent, but admin email failed')
        return {
          success: false,
          message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou me contacter directement.',
          details: results
        }
      } else {
        console.log('❌ Both emails failed')
        return {
          success: false,
          message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou me contacter directement par email.',
          details: results
        }
      }
    } catch (error) {
      console.error('❌ General email sending error:', error)
      return {
        success: false,
        message: 'Une erreur technique est survenue. Veuillez réessayer plus tard.',
        error: error.message
      }
    }
  }

  // Validation rules - useMemo to avoid re-creations
  const validationRules = useMemo(() => ({
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
      message: {
        required: 'Le nom est obligatoire',
        minLength: 'Le nom doit contenir au moins 2 caractères',
        maxLength: 'Le nom ne peut pas dépasser 50 caractères',
        pattern: 'Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets'
      }
    },
    email: {
      required: true,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      maxLength: 100,
      message: {
        required: 'L\'email est obligatoire',
        pattern: 'Veuillez entrer une adresse email valide',
        maxLength: 'L\'email ne peut pas dépasser 100 caractères'
      }
    },
    phone: {
      required: false,
      pattern: /^(\+?\d{1,4}[\s-]?)?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}$/,
      message: {
        pattern: 'Veuillez entrer un numéro de téléphone valide'
      }
    },
    subject: {
      required: true,
      minLength: 5,
      maxLength: 100,
      message: {
        required: 'Le sujet est obligatoire',
        minLength: 'Le sujet doit contenir au moins 5 caractères',
        maxLength: 'Le sujet ne peut pas dépasser 100 caractères'
      }
    },
    message: {
      required: true,
      minLength: 20,
      maxLength: 1000,
      message: {
        required: 'Le message est obligatoire',
        minLength: 'Le message doit contenir au moins 20 caractères',
        maxLength: 'Le message ne peut pas dépasser 1000 caractères'
      }
    },
    company: {
      required: false,
      maxLength: 100,
      message: {
        maxLength: 'Le nom de l\'entreprise ne peut pas dépasser 100 caractères'
      }
    }
  }), [])

  // Project types - useMemo to avoid re-creations
  const projectTypes = useMemo(() => [
    { value: 'web-development', label: 'Développement Web' },
    { value: 'mobile-app', label: 'Application Mobile' },
    { value: 'e-commerce', label: 'E-commerce' },
    { value: 'redesign', label: 'Refonte de site' },
    { value: 'consulting', label: 'Conseil' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'other', label: 'Autre' }
  ], [])

  // Validate single field - useCallback to avoid re-creations
  const validateField = useCallback((name, value) => {
    const rules = validationRules[name]
    if (!rules) return null

    // Required validation
    if (rules.required && (!value || value.trim() === '')) {
      return rules.message.required
    }

    // Skip other validations if field is empty and not required
    if (!rules.required && (!value || value.trim() === '')) {
      return null
    }

    // Min length validation
    if (rules.minLength && value.length < rules.minLength) {
      return rules.message.minLength
    }

    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength) {
      return rules.message.maxLength
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.message.pattern
    }

    return null
  }, [validationRules])

  // Validate entire form
  const validateForm = useCallback((data = formData) => {
    const newErrors = {}
    let valid = true

    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, data[field])
      if (error) {
        newErrors[field] = error
        valid = false
      }
    })

    return { errors: newErrors, isValid: valid }
  }, [formData, validateField, validationRules])

  // Handle input change - useCallback for performance optimization
  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    
    // Update form data
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [name]: true }))
    
    // Validate field only if it was already touched or has content
    if (touched[name] || value.length > 0) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }, [touched, validateField])

  // Handle input blur - useCallback
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [validateField])

  // Check form validity - useMemo to calculate only when necessary
  const isFormValid = useMemo(() => {
    const { isValid } = validateForm()
    return isValid
  }, [validateForm])

  // Handle form submission with EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Mark all fields as touched
    const allTouched = Object.keys(validationRules).reduce((acc, field) => {
      acc[field] = true
      return acc
    }, {})
    setTouched(allTouched)
    
    // Final validation
    const { errors: formErrors, isValid } = validateForm()
    setErrors(formErrors)
    
    if (!isValid) {
      setSubmitStatus({
        success: false,
        message: 'Veuillez corriger les erreurs dans le formulaire.'
      })
      
      // Focus on first error field
      const firstErrorField = Object.keys(formErrors)[0]
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField)
        element?.focus()
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      console.log('📧 Sending contact form...', formData)
      
      // Send emails via EmailJS
      const result = await sendContactEmails(formData)
      
      if (result.success) {
        setSubmitStatus({
          success: true,
          message: result.message
        })
        
        // Reset form after success
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          company: '',
          projectType: 'web-development'
        })
        setErrors({})
        setTouched({})
        
        console.log('✅ Form sent successfully:', result.details)
      } else {
        setSubmitStatus({
          success: false,
          message: result.message
        })
        console.error('❌ Sending error:', result.error)
      }
      
    } catch (error) {
      console.error('❌ Unexpected error while sending form:', error)
      setSubmitStatus({
        success: false,
        message: 'Une erreur technique inattendue est survenue. Veuillez réessayer ou me contacter directement.'
      })
    } finally {
      setIsSubmitting(false)
      
      // Auto-clear status after 8 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 8000)
    }
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
            className="md:col-span-2"
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
            className="md:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                Envoyez-moi un message
              </h3>
              
              {/* Enhanced status message */}
              {submitStatus && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-lg p-4 mb-6 ${
                    submitStatus.success 
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800' 
                      : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-start">
                    {submitStatus.success ? (
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{submitStatus.success ? 'Message envoyé !' : 'Erreur d\'envoi'}</p>
                      <p className="mt-1">{submitStatus.message}</p>
                      {submitStatus.success && (
                        <p className="mt-2 text-sm opacity-80">
                          📧 Vous devriez recevoir un email de confirmation dans quelques minutes.
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
              
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                          errors.name && touched.name 
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                            : touched.name && !errors.name && formData.name
                              ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                              : 'border-secondary-200 dark:border-secondary-700 focus:ring-primary-500 focus:border-primary-500'
                        } bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-2`}
                        placeholder="Votre nom et prénom"
                        required
                        disabled={isSubmitting}
                      />
                      
                      {/* Success/Error icons */}
                      {touched.name && !errors.name && formData.name && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      
                      {errors.name && touched.name && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {errors.name && touched.name && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 dark:text-red-400"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>
                  
                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Adresse email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                          errors.email && touched.email 
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                            : touched.email && !errors.email && formData.email
                              ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                              : 'border-secondary-200 dark:border-secondary-700 focus:ring-primary-500 focus:border-primary-500'
                        } bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-2`}
                        placeholder="votre@email.com"
                        required
                        disabled={isSubmitting}
                      />
                      
                      {touched.email && !errors.email && formData.email && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      
                      {errors.email && touched.email && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {errors.email && touched.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 dark:text-red-400"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  {/* Phone Input */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-3 rounded-lg border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="+212 6XX XXX XXX"
                      disabled={isSubmitting}
                    />
                    {errors.phone && touched.phone && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 dark:text-red-400"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </div>
                  
                  {/* Company Input */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-3 rounded-lg border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Nom de votre entreprise"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                {/* Project Type Select */}
                {!isSubmitting && (
                  <div className="mb-6">
                    <label htmlFor="projectType" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Type de projet
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      {projectTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                {/* Subject Input */}
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Sujet <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                        errors.subject && touched.subject 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                          : 'border-secondary-200 dark:border-secondary-700 focus:ring-primary-500 focus:border-primary-500'
                      } bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-2`}
                      placeholder="Objet de votre message"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  {errors.subject && touched.subject && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 dark:text-red-400"
                    >
                      {errors.subject}
                    </motion.p>
                  )}
                </div>
                
                {/* Message Textarea */}
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 resize-none ${
                        errors.message && touched.message 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                          : 'border-secondary-200 dark:border-secondary-700 focus:ring-primary-500 focus:border-primary-500'
                      } bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-2`}
                      placeholder="Décrivez votre projet en détail..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  {errors.message && touched.message && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 dark:text-red-400"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                  
                  {/* Character count */}
                  {formData.message && (
                    <div className="mt-1 text-xs text-secondary-500 dark:text-secondary-400 text-right">
                      {formData.message.length}/1000
                    </div>
                  )}
                </div>
                
                {/* Form submission button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className={`w-full px-6 py-4 rounded-lg font-medium transition-all transform shadow-lg flex items-center justify-center ${
                    isSubmitting || !isFormValid
                      ? 'bg-secondary-400 dark:bg-secondary-600 text-secondary-600 dark:text-secondary-400 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700 text-white hover:scale-105 hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                
                {/* Form validation summary */}
                {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                  >
                    <div className="flex items-center text-red-800 dark:text-red-200 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Veuillez corriger les erreurs ci-dessus avant d'envoyer le formulaire.
                    </div>
                  </motion.div>
                )}
                
                {/* Privacy notice */}
                <div className="mt-6 p-4 bg-secondary-50 dark:bg-secondary-700/50 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-secondary-500 dark:text-secondary-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div className="text-sm text-secondary-600 dark:text-secondary-300">
                      <p className="font-medium mb-1">Protection de vos données</p>
                      <p>
                        Vos informations personnelles sont protégées et ne seront utilisées que pour répondre à votre demande. 
                        Elles ne seront jamais partagées avec des tiers.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection