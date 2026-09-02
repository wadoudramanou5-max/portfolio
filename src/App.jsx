import { useEffect } from 'react';
import React from 'react';
import hero from './assets/jj.jpeg';
import project1 from './assets/projet.png';
import project2 from './assets/blog.png';
import './App.css';

// Données statiques
const technologies = [
  { name: 'HTML', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg' },
  { name: 'PHP', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Python', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'React Native', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Flutter', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'MySQL', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg' },
  { name: 'MongoDB', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg' },
];

const services = [
  { name: 'Application web', description: 'Conception et développement d\'applications web modernes pour digitaliser votre entreprise. Je vous permet de quitter le papier et de passer au numérique.' },
  { name: 'Développement mobile', description: 'Applications mobiles pour iOS et Android.' },
  { name: 'UI/UX Design', description: 'Conception d\'interfaces utilisateur intuitives.' },
  { name: 'SEO', description: 'Optimisation pour les moteurs de recherche.' },
];

const testimonials = [
  { quote: 'Wadoud est un développeur exceptionnel. Son travail a transformé notre entreprise.', author: 'John Doe', position: 'CEO, TechCorp' },
  { quote: 'Grâce à Wadoud, notre application est devenue un succès. Son expertise est inestimable.', author: 'Jane Smith', position: 'CTO, Innovatech' },
  { quote: 'Wadoud a dépassé nos attentes. Son professionnalisme et sa créativité sont remarquables.', author: 'Alice Johnson', position: 'Product Manager, WebSolutions' },
];

const projects = [
  {
    name: 'Beauty-shop',
    description: 'Beauty Shop — Boutique en ligne conçue pour aider un petit commerce de cosmétiques à exister sur le web et à toucher des clients au-delà de sa boutique physique. Elle résout le problème du manque de visibilité et de la difficulté de contact pour les petits vendeurs, en offrant une vitrine simple où les clients peuvent découvrir les produits et commander directement, sans démarche compliquée.',
    image: project1,
    link: 'https://beauty-shop-mauve.vercel.app'
  },
  {
    name: 'BlogSphere',
    description: 'BlogSphere — Plateforme de blog en ligne qui répond au besoin de partager facilement des idées et des connaissances avec une communauté, sans avoir à gérer soi-même un site complexe. Elle permet à n\'importe quel utilisateur de créer un compte, de rédiger et publier ses propres articles, et de s\'interagir avec d\'autres blogueurs — offrant ainsi un espace d\'expression accessible à tous, du débutant au blogueur confirmé.',
    image: project2,
    link: 'https://blog-a0yr.onrender.com/'
  },
  // Vous pouvez ajouter un troisième projet réel ou supprimer cette entrée
  // {
  //   name: 'Autre projet',
  //   description: 'Description de votre troisième projet.',
  //   image: project1,
  //   link: 'https://exemple.com'
  // },
];

function App() {
  // Animation au scroll et ancres
  useEffect(() => {
    const sections = document.querySelectorAll('#accueil, #competences, #services, #temoignages, #projets, #contact');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => observer.observe(section));

    const handleAnchorClick = (e) => {
      const link = e.currentTarget;
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    return () => {
      sections.forEach(section => observer.unobserve(section));
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <span className="logo">Wadoud.Dev</span>
        <div className="nav-links">
          <a href="#accueil">Accueil</a>
          <a href="#competences">Compétences</a>
          <a href="#services">Services</a>
          <a href="#projets">Projets</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Accueil */}
      <section id="accueil" className="container">
        <div className="left-column">
          <h1>Développeur <br /> fullstack</h1>
          <p>
            Je conçois des applications <em>web</em> élégantes et fonctionnelles pour lancer votre entreprise.
          </p>
          <p>Développeur fullstack passionné par la création d'expériences numériques exceptionnelles.</p>
          <div className="button-container">
            <a href="#projets">Voir mes projets</a>
            <a href="#contact">Me contacter</a>
          </div>
        </div>
        <div className="right">
          <img src={hero} alt="Photo de Wadoud" />
        </div>
      </section>

      {/* Compétences */}
      <section id="competences" className="container">
        <h2>Langages et outils</h2>
        <div className="technologies">
          {technologies.map((tech, index) => (
            <div className="card" key={index}>
              <img src={tech.image} alt={tech.name} />
              <p>{tech.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container">
        <h2>Services</h2>
        <div className="services">
          {services.map((service, index) => (
            <div className="card" key={index}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Témoignages */}
      <section id="temoignages" className="container">
        <h2>Ce qu'ils disent de moi</h2>
        <div className="testimonials">
          {testimonials.map((testimonial, index) => (
            <div className="card" key={index}>
              <p>"{testimonial.quote}"</p>
              <p>- {testimonial.author}</p>
              <p>{testimonial.position}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projets */}
      <section id="projets" className="container">
        <h2>Projets déjà réalisés</h2>
        <div className="project-image">
          {projects.map((project, index) => (
            <div className="card" key={index}>
              <img src={project.image} alt={project.name} />
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                Voir le projet
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container">
        <h2>Parlons de votre projet</h2>
        <p>
          Que vous ayez besoin d'une application web ou d'un site internet, je suis là pour vous aider à concrétiser votre idée.
          Contactez-moi et je vous répondrai sous 24 heures.
        </p>
        <div className="contact-links">
          <a href="mailto:wadoudramanou5@gmail.com">wadoudramanou5@gmail.com</a>
          <a href="https://wa.me/0197249886" target="_blank" rel="noopener noreferrer">
            Me contacter sur WhatsApp
          </a>
        </div>
        <hr />
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Wadoud.Dev. Tous droits réservés.</p>
      </footer>
    </>
  );
}

export default App;