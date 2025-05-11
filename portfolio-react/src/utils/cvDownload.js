// utils/cvDownload.js

/**
 * Fonction pour télécharger le CV
 * Cette approche permet de s'assurer que le lien de téléchargement
 * est correctement configuré peu importe où le fichier PDF est stocké
 */
export const downloadCV = () => {
    return new Promise((resolve, reject) => {
      try {
        // Utiliser une URL directe pour accéder au fichier
        // Plusieurs options en fonction de l'emplacement du fichier
        
        // Option 1: Si le CV est dans le dossier public
        const pdfPath = '/assets/resume.pdf';
        
        // Option 2: Pour les applications Vite
        // const pdfPath = new URL('../assets/resume.pdf', import.meta.url).href;
        
        // Option 3: Pour les applications Create React App
        // const pdfPath = `${process.env.PUBLIC_URL}/assets/resume.pdf`;
        
        // Créer un élément de lien pour le téléchargement
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = 'Mouhamed_Bouzyane_CV.pdf';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        // Ajouter au DOM, déclencher le clic, puis retirer
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Résoudre la promesse après un court délai pour simuler le téléchargement
        setTimeout(() => {
          resolve();
        }, 1500);
      } catch (error) {
        console.error('Erreur lors du téléchargement du CV:', error);
        reject(error);
      }
    });
  };
  
  /**
   * Fonction pour ouvrir le CV dans un nouvel onglet
   * Utile comme solution de secours si le téléchargement échoue
   */
  export const openCVInNewTab = () => {
    try {
      const pdfPath = '../../src/assets/resume.pdf';
      window.open(pdfPath, '_blank', 'noopener,noreferrer');
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'ouverture du CV:', error);
      return false;
    }
  };
  
  export default { downloadCV, openCVInNewTab };