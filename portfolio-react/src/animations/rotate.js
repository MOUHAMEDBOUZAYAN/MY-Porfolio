// src/animations/rotate.js
export const rotate = {
    hidden: { 
      opacity: 0,
      rotate: -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      rotate: 10,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };