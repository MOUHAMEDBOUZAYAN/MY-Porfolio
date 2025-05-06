// src/hooks/useScrollPosition.js
import { useState, useEffect } from 'react'

export const useScrollPosition = (threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > threshold)
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)
    
    // Initial check
    handleScroll()
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])
  
  return { isScrolled }
}