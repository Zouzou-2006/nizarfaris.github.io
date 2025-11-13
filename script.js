// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Enhanced Typing Effect
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
      typingSpeed = 1500; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500; // Pause before next word
    }
    
    setTimeout(type, typingSpeed);
  }

  // Start typing after a brief delay
  setTimeout(type, 1000);

  // Enhanced skill bars animation with percentages
  const skillBars = document.querySelectorAll('.skill-level');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillLevel = entry.target;
        const level = skillLevel.getAttribute('data-level');
        const skillItem = skillLevel.closest('.skill-item');
        const skillPercent = skillItem.querySelector('.skill-percent');
        
        // Instantly set skill bar width
        skillLevel.style.width = level + '%';
        
        // Set percentage immediately
        if (skillPercent) {
          skillPercent.textContent = level + '%';
        }
        
        skillObserver.unobserve(skillLevel);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px 0px 0px'
  });
  
  skillBars.forEach(bar => {
    // Add percentage element if not exists
    const skillItem = bar.closest('.skill-item');
    if (skillItem && !skillItem.querySelector('.skill-percent')) {
      const skillName = skillItem.querySelector('.skill-name');
      const percentSpan = document.createElement('span');
      percentSpan.className = 'skill-percent';
      percentSpan.textContent = '0%';
      skillName.appendChild(percentSpan);
    }
    skillObserver.observe(bar);
  });

  // Enhanced mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
      
      // Add backdrop when menu is open
      if (nav.classList.contains('active')) {
        const backdrop = document.createElement('div');
        backdrop.className = 'nav-backdrop';
        backdrop.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          z-index: 99;
          backdrop-filter: blur(5px);
        `;
        document.body.appendChild(backdrop);
        
        backdrop.addEventListener('click', function() {
          nav.classList.remove('active');
          menuToggle.classList.remove('active');
          document.body.removeChild(backdrop);
        });
      } else {
        const backdrop = document.querySelector('.nav-backdrop');
        if (backdrop) document.body.removeChild(backdrop);
      }
    });
  }

  // Enhanced smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          menuToggle.classList.remove('active');
          const backdrop = document.querySelector('.nav-backdrop');
          if (backdrop) document.body.removeChild(backdrop);
        }
      }
    });
  });

  // Enhanced See Projects button
  const seeProjectsBtn = document.getElementById('see-projects');
  if (seeProjectsBtn) {
    seeProjectsBtn.addEventListener('click', function() {
      const projectsSection = document.getElementById('projects');
      const headerHeight = document.querySelector('header').offsetHeight;
      const projectsPosition = projectsSection.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: projectsPosition,
        behavior: 'smooth'
      });
    });
  }

  // Enhanced contact form submission
  const contactForm = document.getElementById('cyber-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      
      // Create success message
      const alertBox = document.createElement('div');
      alertBox.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: rgba(10, 10, 20, 0.95);
        color: var(--primary);
        padding: 20px 25px;
        border-radius: 12px;
        border: 1.5px solid var(--primary);
        font-family: 'Orbitron', sans-serif;
        z-index: 1000;
        box-shadow: 0 0 25px rgba(0, 243, 255, 0.4);
        transform: translateX(400px);
        transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        backdrop-filter: blur(15px);
        max-width: 350px;
      `;
      alertBox.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <i class="fas fa-check-circle" style="font-size: 1.3rem;"></i>
          <div>
            <div style="font-weight: 600; margin-bottom: 5px;">TRANSMISSION SUCCESSFUL</div>
            <div style="font-size: 0.9rem; opacity: 0.8;">Thank you ${name}, your message has been sent!</div>
          </div>
        </div>
      `;
      
      document.body.appendChild(alertBox);
      
      // Animate in
      setTimeout(() => {
        alertBox.style.transform = 'translateX(0)';
      }, 100);
      
      // Animate out after delay
      setTimeout(() => {
        alertBox.style.transform = 'translateX(400px)';
        setTimeout(() => {
          if (document.body.contains(alertBox)) {
            document.body.removeChild(alertBox);
          }
        }, 600);
      }, 5000);
      
      // Reset form
      contactForm.reset();
    });
  }

  // Simplified project card interactions (using CSS transitions)
  // Removed inline style manipulation for better performance

  // Parallax disabled for performance

  // Update footer year
  const yearElement = document.querySelector('footer .footer-copy');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = `© ${currentYear} NIZAR A. FARIS. ALL SYSTEMS OPERATIONAL.`;
  }
  
  // Enhanced active navigation highlighting
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function highlightNav() {
    let currentSection = '';
    const headerHeight = document.querySelector('header').offsetHeight;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Debounced scroll for better performance
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(highlightNav);
  }, { passive: true });
  
  // Initialize highlight on load
  highlightNav();

  // Page loads instantly - no fade animation

  // Skill tag hover effects handled by CSS for better performance

  // Fade-in animations disabled for instant loading

  // Add keyboard navigation support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close mobile menu if open
      if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
        const backdrop = document.querySelector('.nav-backdrop');
        if (backdrop) document.body.removeChild(backdrop);
      }
    }
  });

  // Make entire project card clickable using data-url (avoid nested anchors)
  document.addEventListener('click', (e) => {
    const linkClick = e.target.closest('.project-link');
    if (linkClick) return; // Use default anchor behavior
    const card = e.target.closest('.project-card');
    if (card && card.dataset.url) {
      window.open(card.dataset.url, '_blank');
    }
  });
});