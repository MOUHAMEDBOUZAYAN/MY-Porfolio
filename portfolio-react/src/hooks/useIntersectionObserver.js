// src/hooks/useIntersectionObserver.js
import { useEffect } from 'react'

export const useIntersectionObserver = (options = {}) => {
  useEffect(() => {
    const defaultOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
      ...options
    }
    
    // Elements with these classes will be animated
    const animateOnScrollElems = document.querySelectorAll('.animate-on-scroll')
    const staggerAnimationElems = document.querySelectorAll('.stagger-animation > *')
    
    // Create the observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add visible class to trigger animations
          entry.target.classList.add('is-visible')
          
          // Only observe once
          observer.unobserve(entry.target)
        }
      })
    }, defaultOptions)
    
    // Observe animated elements
    animateOnScrollElems.forEach((elem, index) => {
      // Add initial class for CSS transitions
      elem.classList.add('initially-hidden')
      
      // Start observing
      observer.observe(elem)
    })
    
    // Observe staggered animation elements
    staggerAnimationElems.forEach((elem, index) => {
      // Add class with increasing delay based on index
      elem.classList.add('stagger-item')
      elem.style.transitionDelay = `${index * 0.1}s`
      
      // Start observing
      observer.observe(elem)
    })
    
    // Cleanup
    return () => {
      if (animateOnScrollElems) {
        animateOnScrollElems.forEach(elem => observer.unobserve(elem))
      }
      
      if (staggerAnimationElems) {
        staggerAnimationElems.forEach(elem => observer.unobserve(elem))
      }
    }
  }, [options])
}