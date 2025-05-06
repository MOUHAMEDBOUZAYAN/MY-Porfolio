// src/animations/slideIn.js
export const slideUp = {
    hidden: { 
      opacity: 0,
      y: 30 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };
  
  export const slideDown = {
    hidden: { 
      opacity: 0,
      y: -30 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };
  
  export const slideLeft = {
    hidden: { 
      opacity: 0,
      x: 30 
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      x: -30,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };
  
  export const slideRight = {
    hidden: { 
      opacity: 0,
      x: -30 
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      x: 30,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };