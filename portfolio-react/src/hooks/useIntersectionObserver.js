// src/hooks/useIntersectionObserver.js
export const useIntersectionObserver = () => {
  const options = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.1, // Trigger when 10% of the element is visible
  }

  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        // Stop observing once the animation has played
        observer.unobserve(entry.target)
      }
    })
  }

  // Create the observer
  const observer = new IntersectionObserver(handleIntersection, options)

  // Observe all elements with the animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll, .stagger-animation').forEach(element => {
    observer.observe(element)
  })

  return observer
}