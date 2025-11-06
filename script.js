// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Typing Effect
  const typingElement = document.getElementById('typing');
  const texts = [
    "SOFTWARE ENGINEER",
    ".NET DEVELOPER", 
    "FULL-STACK DEVELOPER",
    "SQL DATABASE",
    "PROBLEM SOLVER",
    "AI ENTHUSIAST",
    "TECH INNOVATOR"
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 1000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1000);

  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll('.skill-level');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillLevel = entry.target;
        const level = skillLevel.getAttribute('data-level');
        skillLevel.style.width = level + '%';
        observer.unobserve(skillLevel);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => observer.observe(bar));

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
        
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          menuToggle.classList.remove('active');
        }
      }
    });
  });

  // See Projects button
  const seeProjectsBtn = document.getElementById('see-projects');
  if (seeProjectsBtn) {
    seeProjectsBtn.addEventListener('click', function() {
      document.getElementById('projects').scrollIntoView({
        behavior: 'smooth'
      });
    });
  }

  // Contact form submission
  const contactForm = document.getElementById('cyber-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const alertBox = document.createElement('div');
      alertBox.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        color: var(--neon-green);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        border: 1px solid var(--neon-green);
        font-family: 'Orbitron', sans-serif;
        z-index: 1000;
        box-shadow: 0 0 20px rgba(0, 255, 159, 0.3);
        transform: translateX(150%);
        transition: transform 0.5s ease;
      `;
      alertBox.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <i class="fas fa-check-circle"></i>
          <span>MESSAGE TRANSMITTED SUCCESSFULLY</span>
        </div>
      `;
      
      document.body.appendChild(alertBox);
      
      setTimeout(() => {
        alertBox.style.transform = 'translateX(0)';
      }, 100);
      
      setTimeout(() => {
        alertBox.style.transform = 'translateX(150%)';
        setTimeout(() => {
          document.body.removeChild(alertBox);
        }, 500);
      }, 5000);
      
      contactForm.reset();
    });
  }

  // Project card hover effect
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
  });

  // Parallax effect
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const gridLines = document.querySelector('.grid-lines');
    const orbs = document.querySelectorAll('.orb');
    
    if (gridLines) {
      gridLines.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    orbs.forEach((orb, index) => {
      const speed = 0.1 + (index * 0.05);
      orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Update footer year
  const yearElement = document.querySelector('footer .footer-copy');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace(/\d{4}/, currentYear);
  }
  
});
