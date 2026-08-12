import { useState, useEffect } from 'react';
import React from 'react';
import hero from './assets/jj.jpeg';
import project1 from './assets/projet.png';
import project2 from './assets/blog.png';

import './App.css';

const technologies = [
  {name: 'HTML', image: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg'},
  {name: 'CSS', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg'},
  {name: 'JavaScript', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png'},
  {name: 'React', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'},
  {name: 'Node.js', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg'},
  {name: 'PHP', image: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg'},
  {name: 'Python', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg'},
  {name: 'React Native', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/React_Native_Logo_Wide.svg'},
  {name: 'Flutter', image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Flutter_logo.svg'},
  {name: 'MySQL', image: 'https://upload.wikimedia.org/wikipedia/commons/6/62/MySQL.svg'},
  {name: 'MongoDB', image: 'https://upload.wikimedia.org/wikipedia/en/4/45/MongoDB-Logo.svg'},
];

const services = [
  {name: 'Application web', description: 'Conception et développement d\'applications web modernes pour digitaliser votre entreprise . je vous permet de quitter le papier et de passer au numérique. '},
  {name: 'Développement mobile', description: 'Applications mobiles pour iOS et Android.'},
  {name: 'UI/UX Design', description: 'Conception d\'interfaces utilisateur intuitives.'},
  {name: 'SEO', description: 'Optimisation pour les moteurs de recherche.'},
];

const testimonials = [
  {quote: 'Wadoud est un développeur exceptionnel. Son travail a transformé notre entreprise.', author: 'John Doe', position: 'CEO, TechCorp'},
  {quote: 'Grâce à Wadoud, notre application est devenue un succès. Son expertise est inestimable.', author: 'Jane Smith', position: 'CTO, Innovatech'},
  {quote: 'Wadoud a dépassé nos attentes. Son professionnalisme et sa créativité sont remarquables.', author: 'Alice Johnson', position: 'Product Manager, WebSolutions'},
];

const projects = [
  {name: 'Beauty-shop', description: 'Beauty Shop — Boutique en ligne conçue pour aider un petit commerce de cosmétiques à exister sur le web et à toucher des clients au-delà de sa boutique physique. Elle résout le problème du manque de visibilité et de la difficulté de contact pour les petits vendeurs, en offrant une vitrine simple où les clients peuvent découvrir les produits et commander directement, sans démarche compliquée.', image: project1, link: 'https://beauty-shop-mauve.vercel.app'},
  {name: 'BlogSphere', description: 'BlogSphere — Plateforme de blog en ligne qui répond au besoin de partager facilement des idées et des connaissances avec une communauté, sans avoir à gérer soi-même un site complexe. Elle permet à n\'importe quel utilisateur de créer un compte, de rédiger et publier ses propres articles, et de s\'interagir avec d\'autres blogueurs — offrant ainsi un espace d\'expression accessible à tous, du débutant au blogueur confirmé.', image: project2, link: 'https://blog-a0yr.onrender.com/'},
  {name: 'Projet 3', description: '', image: project1, link: 'https://example.com/project3'},
];

function App() {
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
      <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <span className="logo">Wadoud.Dev</span>
        <div className='nav-links' style={{ display: 'flex', gap: '15px' }}>
          <a href="#accueil" style={{ textDecoration: 'none', color: 'black' }}>Acceuil</a>
          <a href="#competences" style={{ textDecoration: 'none', color: 'black' }}>Compétences</a>
          <a href="#services" style={{ textDecoration: 'none', color: 'black' }}>Services</a>
          <a href="#projets" style={{ textDecoration: 'none', color: 'black' }}>Projets</a>
          <a href="#contact" style={{ textDecoration: 'none', color: 'black' }}>Contact</a>
        </div>
      </div>

      <section id="accueil" className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
        <div className="left-column">
          <h1>Développeur <br/> fullstack</h1>
          <p>Je conçois des applications<em style={{ fontWeight: 'bold', color: 'blue' }}>web</em> élégantes et fonctionnelles pour lancer votre entreprise.</p>
          <p>Développeur fullstack passionné par la création d'expériences numériques exceptionnelles.</p>
          <div className="button-container" style={{ display: 'flex', gap: '10px' }}>
            <a href="#projets">Voir mes projets</a>
            <a href='#contact'>Me contacter</a>
          </div>
        </div>

        <div className="right">
          <img src={hero} alt="Image de présentation" style={{ width: '300px', height: '300px', objectFit: 'cover', display: 'block' }} />
        </div>
      </section>

      <section id="competences" className="container" style={{ padding: '20px' }}>
        <h2>Langages et outils</h2>
        <div className="technologies" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {technologies.map((tech, index) => (
            <div className='card' key={index} style={{ textAlign: 'center' }}>
              <img src={tech.image} alt={tech.name} style={{ width: '50px', height: '50px' }} />
              <p>{tech.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="container" style={{ padding: '20px' }}>
        <h2>Services</h2>
        <div className="services" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {services.map((service, index) => (
            <div className='card' key={index} style={{ textAlign: 'center' }}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="temoignages" className="container" style={{ padding: '20px' }}>
        <h2>Ce qu'ils disent de moi</h2>
        <div className="testimonials" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {testimonials.map((testimonial, index) => (
            <div className='card' key={index} style={{ textAlign: 'center' }}>
              <p>"{testimonial.quote}"</p>
              <p>- {testimonial.author}</p>
              <p>{testimonial.position}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projets" className="container" style={{ padding: '20px' }}>
        <h2>Projets Déjà réalisés</h2>
        <div className="project-image" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {projects.map((project, index) => (
            <div className='card' key={index} style={{ textAlign: 'center' }}>
              <img src={project.image} alt={project.name} style={{ width: '150px', height: '150px' }} />
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <a href={project.link} style={{ textDecoration: 'none', color: 'white ', backgroundColor: 'blue', padding: '10px', borderRadius: '10px' }} target="_blank" rel="noopener noreferrer">
                Voir le projet
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="container" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Parlons de votre projet</h2>
        <p>Que vous ayez besoin d'une application web ou d'un site internet, je suis là pour vous aider à concrétiser votre idée.Contactez-moi et je vous répondrai sous 24 heures.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          <a href="mailto:wadoudramanou5@gmail.com" style={{ textDecoration: 'none', color: 'white ', backgroundColor: 'blue', padding: '10px', borderRadius: '10px' }}>
            wadoudramanou5@gmail.com
          </a>
          <a href="https://wa.me/0197249886" style={{ textDecoration: 'none', color: 'black', padding: '10px', borderRadius: '10px', backgroundColor: 'lightgreen' }} target="_blank" rel="noopener noreferrer">
            Me contacter sur WhatsApp
          </a>
        </div>
        <hr style={{ borderColor: 'black' }} />
      </section>

      <footer className="footer" style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f1f1f1' }}>
        <p>&copy; 2024 Wadoud.Dev. Tous droits réservés.</p>
      </footer>
    </>
  );
}

export default App;