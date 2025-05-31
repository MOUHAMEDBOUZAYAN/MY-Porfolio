// src/utils/emailService.js
import emailjs from '@emailjs/browser'

// Configuration EmailJS
const EMAIL_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_qede2b7',
  templateId: {
    admin: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_w8ltyde',
    autoReply: import.meta.env.VITE_EMAILJS_REPLY_TEMPLATE_ID || 'template_z4f5cel'
  },
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'iUtUq3faFI-b5105a'
}

// Initialiser EmailJS avec votre clé publique
export const initEmailJS = () => {
  try {
    emailjs.init(EMAIL_CONFIG.publicKey)
    console.log('✅ EmailJS initialisé avec succès')
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation d\'EmailJS:', error)
  }
}

// Fonction pour envoyer un email à l'administrateur (vous)
export const sendEmailToAdmin = async (formData) => {
  try {
    const templateParams = {
      // Informations du contact
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Non renseigné',
      company: formData.company || 'Non renseigné',
      project_type: getProjectTypeLabel(formData.projectType),
      
      // Message
      subject: formData.subject,
      message: formData.message,
      
      // Informations système
      sent_date: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      
      // Email de destination (le vôtre)
      to_email: 'mohammedbouzi177@gmail.com',
      to_name: 'Mouhamed Bouzyane'
    }

    const result = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId.admin,
      templateParams
    )

    console.log('✅ Email admin envoyé:', result)
    return { success: true, data: result }
  } catch (error) {
    console.error('❌ Erreur envoi email admin:', error)
    return { success: false, error: error.text || error.message }
  }
}

// Fonction pour envoyer un email de confirmation à l'utilisateur
export const sendAutoReplyToUser = async (formData) => {
  try {
    const templateParams = {
      // Informations de l'utilisateur
      to_name: formData.name,
      to_email: formData.email,
      
      // Informations du message original
      original_subject: formData.subject,
      project_type: getProjectTypeLabel(formData.projectType),
      
      // Informations de confirmation
      confirmation_date: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      
      // Vos informations de contact
      admin_name: 'Mouhamed Bouzyane',
      admin_email: 'mohammedbouzi177@gmail.com',
      admin_phone: '+212 690 815 605',
      
      // Message personnalisé
      response_time: '24-48 heures',
      website_url: window.location.origin
    }

    const result = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId.autoReply,
      templateParams
    )

    console.log('✅ Email de confirmation envoyé:', result)
    return { success: true, data: result }
  } catch (error) {
    console.error('❌ Erreur envoi email de confirmation:', error)
    return { success: false, error: error.text || error.message }
  }
}

// Fonction principale pour envoyer les deux emails
export const sendContactEmails = async (formData) => {
  try {
    console.log('📧 Envoi des emails en cours...')
    
    // Envoyer les deux emails en parallèle
    const [adminResult, userResult] = await Promise.allSettled([
      sendEmailToAdmin(formData),
      sendAutoReplyToUser(formData)
    ])

    // Analyser les résultats
    const results = {
      admin: adminResult.status === 'fulfilled' ? adminResult.value : { success: false, error: adminResult.reason },
      user: userResult.status === 'fulfilled' ? userResult.value : { success: false, error: userResult.reason }
    }

    // Vérifier le succès global
    const adminSuccess = results.admin.success
    const userSuccess = results.user.success

    if (adminSuccess && userSuccess) {
      console.log('✅ Tous les emails ont été envoyés avec succès')
      return {
        success: true,
        message: 'Votre message a été envoyé avec succès ! Vous allez recevoir une confirmation par email.',
        details: results
      }
    } else if (adminSuccess && !userSuccess) {
      console.log('⚠️ Email admin envoyé, mais erreur pour la confirmation utilisateur')
      return {
        success: true,
        message: 'Votre message a été envoyé avec succès ! (Note: la confirmation automatique pourrait avoir un délai)',
        details: results
      }
    } else if (!adminSuccess && userSuccess) {
      console.log('⚠️ Confirmation utilisateur envoyée, mais erreur pour l\'email admin')
      return {
        success: false,
        message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou me contacter directement.',
        details: results
      }
    } else {
      console.log('❌ Échec de l\'envoi des deux emails')
      return {
        success: false,
        message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou me contacter directement par email.',
        details: results
      }
    }
  } catch (error) {
    console.error('❌ Erreur générale lors de l\'envoi des emails:', error)
    return {
      success: false,
      message: 'Une erreur technique est survenue. Veuillez réessayer plus tard.',
      error: error.message
    }
  }
}

// Fonction utilitaire pour convertir le type de projet en libellé
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

// Fonction pour tester la configuration EmailJS
export const testEmailJSConfiguration = async () => {
  try {
    console.log('🧪 Test de la configuration EmailJS...')
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+33 6 12 34 56 78',
      company: 'Test Company',
      projectType: 'web-development',
      subject: 'Test de configuration EmailJS',
      message: 'Ceci est un message de test pour vérifier la configuration EmailJS.'
    }

    // Tester seulement l'email admin pour éviter d'envoyer un email de confirmation à un faux email
    const result = await sendEmailToAdmin(testData)
    
    if (result.success) {
      console.log('✅ Test EmailJS réussi')
      return { success: true, message: 'Configuration EmailJS valide' }
    } else {
      console.log('❌ Test EmailJS échoué')
      return { success: false, message: 'Erreur de configuration EmailJS', error: result.error }
    }
  } catch (error) {
    console.error('❌ Erreur lors du test EmailJS:', error)
    return { success: false, message: 'Erreur lors du test', error: error.message }
  }
}

// Exporter toutes les fonctions
export default {
  initEmailJS,
  sendEmailToAdmin,
  sendAutoReplyToUser,
  sendContactEmails,
  testEmailJSConfiguration
}