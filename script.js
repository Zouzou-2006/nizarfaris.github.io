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
    "AI APPLICATION BUILDER",
    "CSE @ OHIO STATE"
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 50;

  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 20;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 30;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 500; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 200; // Pause before next word
    }
    
    setTimeout(type, typingSpeed);
  }

  // Start typing instantly
  setTimeout(type, 100);

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
        transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
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
      }, 50);
      
      // Animate out after delay
      setTimeout(() => {
        alertBox.style.transform = 'translateX(400px)';
        setTimeout(() => {
          if (document.body.contains(alertBox)) {
            document.body.removeChild(alertBox);
          }
        }, 200);
      }, 2500);
      
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

  // ===== AI CHATBOT FUNCTIONALITY =====
  
  const chatButton = document.getElementById('chatButton');
  const chatModal = document.getElementById('chatModal');
  const chatClose = document.getElementById('chatClose');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatMessages = document.getElementById('chatMessages');

  // Knowledge base about Nizar (keep in sync with the resume)
  const knowledgeBase = {
    agentauditor: {
      keywords: ['agent auditor', 'auditor', 'hackathon', 'ubc', 'solana', 'x402', 'usdc', 'blockchain', 'crypto payment'],
      response: "**Agent Auditor** is Nizar's lead project (UBC 2026 Hackathon, team of 4, in progress). He's the technical lead and top code contributor. 🛡️\n\nIt's a set of spending controls for an AI agent that buys data in USDC on Solana devnet. The agent never holds the wallet key, so every payment has to pass through a gateway Nizar built:\n\n• Default-deny finance rules and human approval over $0.50\n• x402 pay-per-request payments, with each order saved before any money moves\n• A memo guard that refuses to sign any payment whose on-chain memo doesn't match its order\n• A six-table Supabase schema with row-level security, a live audit dashboard, and a read-only Claude copilot\n\n**Stack**: TypeScript, Next.js, React, Solana, x402, Supabase, Claude API, Vitest, GitHub Actions\n\nDemo: agentauditor-kappa.vercel.app · Code: github.com/Zouzou-2006/Agent-Auditor"
    },
    predaq: {
      keywords: ['predaq', 'program review', 'gemini', 'azure', 'assistant service'],
      response: "At his Cincinnati State co-op, Nizar built **the AI assistant inside PreDAQ**, the college's program-review system, from scratch in C#/.NET. 🤖\n\nIt answers user questions about the system. He launched it on the **Google Gemini API** and later migrated it to **Azure OpenAI**."
    },
    machinelearning: {
      keywords: ['machine learning', 'ml', 'ai', 'artificial intelligence', 'llm', 'openai', 'claude'],
      response: "Nizar's AI work is **applied LLM engineering**: building real features on top of model APIs.\n\n• **PreDAQ assistant**: a production C#/.NET service, launched on Gemini and migrated to Azure OpenAI\n• **Agent Auditor**: a read-only Claude copilot that uses tool calls over live audit data\n• **Pantry Pal**: a human-in-the-loop OpenAI Vision workflow that identifies pantry items from photos\n\nHe also holds an **AI Foundations Certificate** from UC Digital Futures (ExLAI)."
    },
    skills: {
      keywords: ['skill', 'skills', 'technology', 'technologies', 'tech stack', 'stack', 'programming', 'tools', 'what can you do', 'what do you know'],
      response: "Nizar's toolkit:\n\n• **Languages**: C#, Python, Java, TypeScript, JavaScript, SQL, C, C++\n• **Frameworks**: ASP.NET Core MVC, .NET, Next.js, React, Node.js, Express, Razor, Bootstrap\n• **Databases**: SQL Server, PostgreSQL (Supabase), MongoDB (Mongoose)\n• **AI, Data & Web3**: Azure OpenAI, Gemini API, OpenAI API, Claude API, Power BI, Tableau, Solana, x402\n• **Tools**: Git, GitHub Actions, Vitest, Visual Studio, VS Code, Vite, REST APIs, Agile/Scrum"
    },
    projects: {
      keywords: ['project', 'projects', 'portfolio', 'built', 'created', 'developed', 'app', 'application'],
      response: "Nizar's projects:\n\n**1. Agent Auditor**: spending controls for an AI agent's USDC payments on Solana (UBC 2026 Hackathon, technical lead)\n\n**2. AlgoVision**: code-structure visualizer built at MakeUC 2025 (React, TypeScript, Tree-sitter, Three.js)\n\n**3. Pantry Pal**: inventory platform for a campus food pantry, with an OpenAI Vision scanning workflow (capstone, team of 4)\n\n**4. Axel's GPR**: live business site with a bilingual chatbot (Node.js, Express, MongoDB)\n\n**5. VehicleRental**: Java OOP rental system (Java, JDBC, SQL Server)\n\nAsk me about any of them by name!"
    },
    experience: {
      keywords: ['experience', 'intern', 'internship', 'job', 'jobs', 'work experience', 'position', 'co-op', 'coop', 'employer', 'worked'],
      response: "**Software Developer Co-op**, Cincinnati State Technical & Community College (Jan – Aug 2026)\n• Built PreDAQ's AI assistant from scratch in C#/.NET (Gemini, later Azure OpenAI)\n• Developed ASP.NET Core MVC features in C# and SQL Server in an Agile/Scrum team\n• Built Power BI and Tableau dashboards and Python automation tools\n\n**Web Developer**, Axel's GPR (Feb 2026 – Present)\n• Built a live painting and renovation business site: Node.js/Express REST API, MongoDB, bilingual chatbot\n\n**Sales Associate**, The Home Depot, Flooring & Millwork (part-time, Dec 2024 – Present)"
    },
    clubs: {
      keywords: ['club', 'clubs', 'crypto club', 'quant', 'trading', 'builders', 'activities', 'extracurricular', 'organization'],
      response: "Nizar is a member of the **Ohio State University Crypto Club** (Fall 2026 – Present):\n\n• **Quant Trading Team**: develops strategy logic and works through backtesting and evaluation\n• **Builders cohort**: on the Collectors team of the club's Research Pipeline project, and competing in the UBC 2026 Hackathon with a club team (Agent Auditor)"
    },
    education: {
      keywords: ['education', 'school', 'university', 'college', 'study', 'studying', 'student', 'degree', 'major', 'graduate', 'graduation'],
      response: "🎓 **The Ohio State University**: B.S. Computer Science and Engineering, expected May 2029\n\n🎓 **Cincinnati State Technical & Community College**: A.A.S. Software Engineering Technology, **4.0 GPA**, Dean's List every term (Fall 2024 – Summer 2026)\n\n📜 **AI Foundations Certificate**, University of Cincinnati Digital Futures (ExLAI), 2025"
    },
    gpa: {
      keywords: ['gpa', 'grade', 'grades', '4.0', 'straight a', 'dean', 'honor', 'honors'],
      response: "Nizar earned a **4.0 GPA** in his A.A.S. in Software Engineering Technology at Cincinnati State, with Dean's List every term from Fall 2024 through Summer 2026. 📚"
    },
    linkedin: {
      keywords: ['linkedin', 'linked in'],
      response: "Connect with Nizar on LinkedIn: **linkedin.com/in/nizar-faris** 💼"
    },
    github: {
      keywords: ['github', 'git hub', 'repositories', 'repos', 'source code'],
      response: "Nizar's code is on GitHub: **github.com/Zouzou-2006** 🐙\n\nStart with **Agent Auditor**, his strongest project."
    },
    contact: {
      keywords: ['contact', 'email', 'reach', 'connect', 'hire', 'phone', 'call'],
      response: "You can reach Nizar through:\n\n📧 **Email**: farisnizaradam@gmail.com\n📱 **Phone**: (513) 462-9937\n💼 **LinkedIn**: linkedin.com/in/nizar-faris\n🐙 **GitHub**: github.com/Zouzou-2006\n\nHe's open to internships and collaboration."
    },
    location: {
      keywords: ['location', 'where', 'live', 'based', 'city', 'columbus', 'cincinnati', 'ohio'],
      response: "Nizar is based in **Columbus, Ohio**, where he studies at Ohio State. He's open to Columbus-area and remote opportunities. Go Bucks! 🌰"
    },
    about: {
      keywords: ['about', 'who', 'tell me', 'introduce', 'yourself', 'summary'],
      response: "Nizar Faris is a **Computer Science and Engineering student at The Ohio State University** and a software developer.\n\n✨ Built a production AI assistant during his Cincinnati State co-op\n✨ Technical lead on **Agent Auditor**, spending controls for AI agent payments on Solana\n✨ Full-stack range across C#/.NET, TypeScript/Next.js, Node.js, and SQL\n✨ 4.0 GPA in his A.A.S., Dean's List every term\n\nHe's looking for software engineering and AI internships."
    },
    resume: {
      keywords: ['resume', 'cv', 'curriculum vitae'],
      response: "Hit the **Download Resume** button at the top of the page for the PDF. 📄\n\nThe short version: CSE at Ohio State (expected May 2029), a software developer co-op where he built a production AI assistant, technical lead on Agent Auditor, and a 4.0 A.A.S. from Cincinnati State."
    },
    name: {
      keywords: ['name', 'called', 'full name', 'first name', 'last name', 'surname'],
      response: "His name is **Nizar Faris**. 🌟"
    },
    languages: {
      keywords: ['speak', 'spoken', 'bilingual', 'multilingual', 'what languages', 'arabic', 'french'],
      response: "Nizar speaks **English, Arabic, and French**. 🗣️\n\nIn code: C#, Python, Java, TypeScript, JavaScript, SQL, C, and C++."
    },
    availability: {
      keywords: ['available', 'availability', 'when can you start', 'start date'],
      response: "Nizar is looking for **software engineering and AI internships** and co-ops. 🚀\n\nEmail **farisnizaradam@gmail.com** to talk about timing and arrangements."
    },
    salary: {
      keywords: ['salary', 'compensation', 'wage', 'pay rate'],
      response: "Nizar is happy to discuss compensation for a specific role. Reach him at **farisnizaradam@gmail.com**."
    },
    citizenship: {
      keywords: ['citizen', 'citizenship', 'visa', 'work authorization', 'authorized to work', 'sponsorship'],
      response: "For work authorization questions, please ask Nizar directly at **farisnizaradam@gmail.com**."
    },
    algovision: {
      keywords: ['algovision', 'makeuc', 'code structure', 'visualizer', 'tree-sitter'],
      response: "**AlgoVision** was built at MakeUC 2025 as a team project. 🚀\n\nIt's a browser-only tool that parses Python and C# with Tree-sitter (WASM) in a Web Worker, builds a language-agnostic intermediate representation, and renders control-flow graphs, call graphs, and class diagrams.\n\nNizar reworked the interactive UI, including the 3D graph view (Three.js), toolbar, layout, and rendering performance.\n\nCode: github.com/Zouzou-2006/AlgoVision-MakeUC-2025-"
    },
    pantrypal: {
      keywords: ['pantry pal', 'pantry', 'scanner', 'inventory', 'capstone', 'vision'],
      response: "**Pantry Pal** is an inventory platform for Cincinnati State's campus food pantry, built as a team-of-4 capstone. 🥫\n\n**Nizar's part**:\n• A human-in-the-loop **OpenAI Vision** workflow that identifies pantry items from photos for staff to confirm\n• Co-developed the frontend and the Chart.js reporting pages\n• Contributed to a QR-code flow that opens the scanner on a phone\n\n**Stack**: ASP.NET Core MVC, C#, SQL Server, OpenAI Vision API, Chart.js"
    },
    axelsgpr: {
      keywords: ['axel', 'gpr', 'mongodb', 'renovation', 'painting'],
      response: "**Axel's GPR** is a live website for a painting and renovation business. Nizar built the layout, front end, and backend; a partner contributed content and photos. 🌐\n\n• Node.js/Express REST endpoints with MongoDB/Mongoose for estimates, bookings, and gallery uploads\n• Admin routes protected with HTTP Basic Auth\n• A bilingual rule-based chatbot with 11 keyword-defined intents that auto-detects Spanish"
    },
    vehiclerental: {
      keywords: ['vehiclerental', 'vehicle rental', 'java oop', 'jdbc'],
      response: "**VehicleRental** is a Java OOP project: an abstract vehicle class hierarchy (car, motorbike, trailer) using inheritance and polymorphism, with a JDBC data-access layer to SQL Server. 🚗"
    },
    hobbies: {
      keywords: ['hobby', 'hobbies', 'free time', 'like to do', 'enjoy', 'for fun'],
      response: "Outside of class and code, Nizar builds side projects, competes in hackathons, works on trading strategies with the OSU Crypto Club, and does strength training. 💪"
    },
    strength: {
      keywords: ['strength', 'workout', 'gym', 'fitness', 'exercise', 'lifting', 'muscle'],
      response: "Nizar is into **strength training**. 💪 Same idea as debugging: keep showing up and push through until it works."
    },
    coffee: {
      keywords: ['coffee', 'caffeine', 'tea'],
      response: "Like every programmer, Nizar runs on caffeine and semicolons. ☕"
    },
    bugs: {
      keywords: ['bug', 'bugs', 'error', 'debug', 'debugging'],
      response: "Nizar doesn't write bugs, he writes *undocumented features*. 🐛✨\n\nSeriously though: his hackathon team's project ships with a 456-test suite, so the bugs don't get far."
    }
  };

  // Match whole words/phrases only, so short keywords like "ai" don't fire inside "email"
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const keywordMatches = (text, keyword) =>
    new RegExp('(^|[^a-z0-9])' + escapeRegex(keyword) + '($|[^a-z0-9])').test(text);

  // Toggle chat modal
  chatButton.addEventListener('click', () => {
    chatModal.classList.toggle('active');
    if (chatModal.classList.contains('active')) {
      chatInput.focus();
      // Hide notification badge when chat is opened
      const notification = document.getElementById('chatNotification');
      if (notification) {
        notification.classList.add('hidden');
      }
    }
  });

  chatClose.addEventListener('click', () => {
    chatModal.classList.remove('active');
  });

  // Send message function
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Get bot response (instant for performance)
    setTimeout(() => {
      hideTypingIndicator();
      const botResponse = getBotResponse(message);
      addMessage(botResponse, 'bot');
    }, 50);
  }

  // Add message to chat
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    if (sender === 'bot') {
      avatar.innerHTML = '<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3C!-- Laurel Wreath --%3E%3Cpath fill=\'%2300ff88\' d=\'M70 25c-5 2-8 5-10 8l-8 4c-3 2-5 3-8 3-2 0-4-1-6-2-3-2-5-5-6-8 3 0 6 1 9 3 3 1 5 2 8 2 4 0 7-2 10-4l8-4c5-3 11-4 17-2 6 2 11 6 14 12-3-1-6-2-9-3-4-1-8-2-11-2-3 0-5 1-8 3zm60 0c5 2 8 5 10 8l8 4c3 2 5 3 8 3 2 0 4-1 6-2 3-2 5-5 6-8-3 0-6 1-9 3-3 1-5 2-8 2-4 0-7-2-10-4l-8-4c-5-3-11-4-17-2-6 2-11 6-14 12 3-1 6-2 9-3 4-1 8-2 11-2 3 0 5 1 8 3z\'/%3E%3Cpath fill=\'%2300ff88\' d=\'M65 30l-6 8-6 6c-2 2-5 3-8 3s-6-1-8-3c-3-2-5-5-6-9 4 2 8 3 12 3 4 0 8-1 11-3l6-6 6-8c3-4 8-7 13-8 6-1 11 0 16 3-4 0-7 1-11 3-3 2-6 4-9 7-2 2-4 5-5 8l-5-4zm70 0l6 8 6 6c2 2 5 3 8 3s6-1 8-3c3-2 5-5 6-9-4 2-8 3-12 3-4 0-8-1-11-3l-6-6-6-8c-3-4-8-7-13-8-6-1-11 0-16 3 4 0 7 1 11 3 3 2 6 4 9 7 2 2 4 5 5 8l5-4z\'/%3E%3Cpath fill=\'%2300ff88\' d=\'M60 35l-5 9-5 7c-2 3-5 5-9 6-3 1-7 0-10-1-3-2-6-5-7-9 4 3 9 4 14 4 5-1 9-3 12-6l5-7 5-9c2-5 6-9 11-11 5-3 11-3 17-1-4 1-8 3-11 5-4 3-7 6-9 10-1 3-2 6-3 9l-5-6zm80 0l5 9 5 7c2 3 5 5 9 6 3 1 7 0 10-1 3-2 6-5 7-9-4 3-9 4-14 4-5-1-9-3-12-6l-5-7-5-9c-2-5-6-9-11-11-5-3-11-3-17-1 4 1 8 3 11 5 4 3 7 6 9 10 1 3 2 6 3 9l5-6z\'/%3E%3C!-- Head --%3E%3Cpath fill=\'%23ff003c\' d=\'M100 50c-25 0-45 20-45 45v20c0 8 2 15 6 22 4 6 10 11 17 14v4c0 8 7 15 15 15h14c8 0 15-7 15-15v-4c7-3 13-8 17-14 4-7 6-14 6-22V95c0-25-20-45-45-45z\'/%3E%3C!-- Nose and Features --%3E%3Cpath fill=\'%230ef\' d=\'M100 105v15l-3 3c-2 2-4 3-7 3-2 0-4-1-6-3l-2-3c2 2 4 3 7 3 3 0 6-1 8-3l3-3v-12zm-15-20c-3 0-6 3-6 6s3 6 6 6 6-3 6-6-3-6-6-6zm30 0c-3 0-6 3-6 6s3 6 6 6 6-3 6-6-3-6-6-6z\'/%3E%3C!-- Toga/Shoulders --%3E%3Cpath fill=\'%23ff003c\' d=\'M100 165c-20 0-38-8-50-20v30c0 8 6 15 14 15h72c8 0 14-7 14-15v-30c-12 12-30 20-50 20z\'/%3E%3Cpath fill=\'%230ef\' d=\'M60 150c-5-5-8-10-10-16h20c2 6 5 11 10 16H60zm80 0c5-5 8-10 10-16h-20c-2 6-5 11-10 16h20z\'/%3E%3C!-- Base/Pedestal --%3E%3Crect fill=\'%230ef\' x=\'50\' y=\'185\' width=\'100\' height=\'10\' rx=\'2\'/%3E%3Crect fill=\'%23ff003c\' x=\'55\' y=\'192\' width=\'90\' height=\'6\' rx=\'1\'/%3E%3C/svg%3E" alt="Ceasar" style="width: 100%; height: 100%;">';
    } else {
      avatar.innerHTML = '<i class="fas fa-user"></i>';
    }

    const content = document.createElement('div');
    content.className = 'message-content';
    
    // Convert markdown-style formatting to HTML
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    
    content.innerHTML = `<p>${formattedText}</p>`;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);
    
    // Smooth instant scroll
    requestAnimationFrame(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Show typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot-message typing-message';
    typingDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-robot"></i>
      </div>
      <div class="message-content">
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Hide typing indicator
  function hideTypingIndicator() {
    const typingMessage = chatMessages.querySelector('.typing-message');
    if (typingMessage) {
      typingMessage.remove();
    }
  }

  // Get bot response based on keywords
  function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Check each knowledge category
    for (const category in knowledgeBase) {
      const data = knowledgeBase[category];
      if (data.keywords.some(keyword => keywordMatches(lowerMessage, keyword))) {
        return data.response;
      }
    }

    // Fun personality responses
    if (lowerMessage.match(/\b(hi|hello|hey|greetings|sup|yo)\b/)) {
      const greetings = [
        "Hello! 👋 I'm Nizar's AI assistant. Ask me about his **experience**, **projects**, **Agent Auditor**, or **skills**!",
        "Hey there! 🚀 I'm the AI version of Nizar, except I don't need coffee to function. Ask me anything!",
        "Greetings, human! 🤖 Try asking about Nizar's **AI work**, his **clubs**, or his **education**!"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    if (lowerMessage.match(/\b(thanks|thank you|thx|ty)\b/)) {
      const thanks = [
        "You're welcome! Feel free to ask me anything else! Unlike real Nizar, I never get tired of answering questions! 😊",
        "No problem! Want to know more? I've got unlimited battery life and unlimited sass! ⚡",
        "Anytime! I'm here 24/7, unlike Nizar who needs sleep and coffee breaks! 😄"
      ];
      return thanks[Math.floor(Math.random() * thanks.length)];
    }

    if (lowerMessage.match(/\b(bye|goodbye|see you|later|cya)\b/)) {
      const farewells = [
        "Goodbye! Don't hesitate to reach out to Nizar if you have any opportunities! He accepts payment in internships and coffee! ☕👋",
        "See you later! Remember: Nizar is available for hire. Side effects may include clean code and dad jokes! 😂",
        "Catch you on the flip side! Pro tip: Mention you chatted with his AI and he'll be impressed! 🚀"
      ];
      return farewells[Math.floor(Math.random() * farewells.length)];
    }

    if (lowerMessage.match(/\b(joke|funny|humor|laugh)\b/)) {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛 Nizar knows this all too well!",
        "A SQL query walks into a bar, walks up to two tables and asks... 'Can I JOIN you?' 😂 (Nizar laughed at this)",
        "There are 10 types of people in the world: those who understand binary and those who don't. Nizar is definitely type 1! 💻"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }

    if (lowerMessage.match(/\b(smart|intelligent|genius|clever)\b/)) {
      return "Oh, you want to know if Nizar is smart? Well, he built this chatbot, so clearly he's a genius! 🧠 Or maybe he just asked ChatGPT... we'll never know! 😂 Ask me about his **skills** or **projects** for proof!";
    }

    if (lowerMessage.match(/\b(hire|recruit|opportunity)\b/)) {
      return "YES! Hire him! He's available, talented, and comes with a free AI assistant (that's me! 🤖). He's seeking **internships** and is ready to turn coffee into code! Check his **contact** info!";
    }

    // Default response with personality
    const defaults = [
      "Hmm, I'm not sure about that one! 🤔 Try asking about Nizar's **experience**, **projects**, **Agent Auditor**, **skills**, **education**, or **clubs**.",
      "That's outside my knowledge base! I can tell you about his **AI work**, **projects**, **experience**, or how to **contact** him.",
      "Error 404: Answer not found! 😅 Ask me about **Agent Auditor**, **PreDAQ**, **skills**, or his **resume**."
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
  }

  // Event listeners
  chatSend.addEventListener('click', sendMessage);
  
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Close chat with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatModal.classList.contains('active')) {
      chatModal.classList.remove('active');
    }
  });
});