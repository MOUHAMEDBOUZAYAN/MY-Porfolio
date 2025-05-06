src/data/projects.js
const projects = [
  {
    id: 1,
    title: "E-commerce moderne",
    description: "Plateforme e-commerce complète avec panier d'achat, paiement Stripe et gestion des commandes. Interface utilisateur intuitive et responsive.",
    image: "/assets/images/projects/ecommerce.jpg",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    category: "fullstack",
    githubLink: "https://github.com/username/ecommerce-project",
    liveLink: "https://ecommerce-project.netlify.app",
    featured: true
  },
  {
    id: 2,
    title: "Application météo",
    description: "Application météo en temps réel avec géolocalisation, prévisions sur 5 jours et visualisations dynamiques des conditions météorologiques.",
    image: "/assets/images/projects/weather-app.jpg",
    technologies: ["React", "API OpenWeatherMap", "Chart.js", "Tailwind CSS"],
    category: "frontend",
    githubLink: "https://github.com/username/weather-app",
    liveLink: "https://weather-app-project.netlify.app",
    featured: true
  },
  {
    id: 3,
    title: "Portfolio personnel",
    description: "Site portfolio moderne et animé présentant mes projets et compétences avec un design élégant et responsive.",
    image: "/assets/images/projects/portfolio.jpg",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    category: "frontend",
    githubLink: "https://github.com/username/portfolio",
    liveLink: "https://my-portfolio.com",
    featured: true
  },
  {
    id: 4,
    title: "Dashboard administrateur",
    description: "Tableau de bord administrateur complet avec statistiques en temps réel, gestion des utilisateurs et visualisation de données.",
    image: "/assets/images/projects/dashboard.jpg",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "Chart.js"],
    category: "fullstack",
    githubLink: "https://github.com/username/admin-dashboard",
    liveLink: "https://admin-dashboard.netlify.app",
    featured: false
  },
  {
    id: 5,
    title: "Application de gestion de tâches",
    description: "Application drag-and-drop pour organiser vos tâches avec des fonctionnalités de rappel, catégorisation et statistiques de productivité.",
    image: "/assets/images/projects/task-app.jpg",
    technologies: ["React", "Firebase", "Tailwind CSS", "React Beautiful DnD"],
    category: "frontend",
    githubLink: "https://github.com/username/task-manager",
    liveLink: "https://task-manager-app.netlify.app",
    featured: false
  },
  {
    id: 6,
    title: "Blog personnel",
    description: "Plateforme de blog avec CMS headless, commentaires et partage sur réseaux sociaux. Optimisé pour le SEO.",
    image: "/assets/images/projects/blog.jpg",
    technologies: ["Next.js", "Strapi CMS", "Tailwind CSS", "MySQL"],
    category: "fullstack",
    githubLink: "https://github.com/username/personal-blog",
    liveLink: "https://my-blog.com",
    featured: false
  }
];

export default projects;