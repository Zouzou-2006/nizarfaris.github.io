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

  // Knowledge base about Nizar
  const knowledgeBase = {
    skills: {
      keywords: ['skill', 'skills', 'technology', 'tech', 'language', 'programming', 'tools', 'what can you do', 'what do you know'],
      response: "Nizar is proficient in:\n\n• **Programming Languages**: C#, Python, SQL, JavaScript, HTML/CSS\n• **Frameworks & Tools**: .NET, ASP.NET, Entity Framework, Git, Visual Studio\n• **Databases**: SQL Server, MySQL\n• **AI/ML**: Machine Learning basics, AI development\n• **Other**: Agile methodology, SDLC, Problem-solving\n\nBasically, he speaks more programming languages than human languages! 🤓"
    },
    projects: {
      keywords: ['project', 'projects', 'work', 'portfolio', 'built', 'created', 'developed', 'app', 'application'],
      response: "Nizar has worked on several impressive projects:\n\n**1. DVLD Management System** - A comprehensive desktop app for driver's license management using C#, .NET, SQL Server\n\n**2. Bank Console App** - A feature-rich console banking application built with C# and SQL Server. (No, you can't use it to hack into Fort Knox 😅)\n\n**3. To-Do Task Manager** - A web-based task management app with ASP.NET Core and Entity Framework\n\nCheck out the Projects section for more details!"
    },
    education: {
      keywords: ['education', 'school', 'university', 'college', 'study', 'studying', 'student', 'degree'],
      response: "Nizar is currently a **Software Engineering Student** focusing on:\n\n• Full-stack development\n• Database design and management\n• Software architecture\n• AI and machine learning\n\nHe's actively seeking internship opportunities to apply his skills in real-world projects! (And to afford more than instant ramen 🍜)"
    },
    experience: {
      keywords: ['experience', 'intern', 'internship', 'job', 'work experience', 'position'],
      response: "Nizar is currently seeking **Software Development Internship** opportunities. He has:\n\n• Hands-on experience with .NET/C# development\n• Multiple academic and personal projects\n• Strong understanding of SDLC and Agile methodology\n• Experience with version control (Git)\n• Proven problem-solving abilities\n\nHe's based in Cincinnati, OH and ready to contribute! Warning: May debug your code AND your life choices. 😄"
    },
    contact: {
      keywords: ['contact', 'email', 'reach', 'phone', 'linkedin', 'github', 'connect', 'hire'],
      response: "You can reach Nizar through:\n\n📧 **Email**: farisnizaradam@gmail.com\n💼 **LinkedIn**: linkedin.com/in/nizar-faris\n🐙 **GitHub**: github.com/Zouzou-2006\n\nFeel free to reach out for internship opportunities or collaboration! He responds faster than a O(1) algorithm! ⚡"
    },
    location: {
      keywords: ['location', 'where', 'live', 'based', 'city'],
      response: "Nizar is based in **Cincinnati, Ohio**. He's available for local internships and open to remote opportunities as well! Fun fact: He's still trying to figure out why they call it 'Cincy' when there's clearly more than one city. 🤔"
    },
    about: {
      keywords: ['about', 'who', 'tell me', 'introduce', 'yourself'],
      response: "Nizar Faris is a passionate Software Engineering student specializing in **full-stack development** and **AI solutions**. He has:\n\n✨ Strong foundation in .NET/C# development\n✨ Experience building scalable applications\n✨ Expertise in SQL databases\n✨ Passion for AI and innovation\n✨ Excellent problem-solving skills\n\nHe's actively seeking internships to drive modernization and innovation in enterprise applications! (Translation: He wants to make cool stuff and get paid for it 🚀)"
    },
    height: {
      keywords: ['height', 'tall', 'how tall'],
      response: "He claims to be 6ft but he's really 5ft 10. Don't bring this up in person though, it's a sensitive topic. 📏😂"
    },
    ethnicity: {
      keywords: ['race', 'ethnicity', 'ethnic', 'nationality', 'moroccan', 'where from', 'heritage', 'background'],
      response: "He is Moroccan, but he's still a Caucasian guy according to the US government. The paperwork is confused, but the couscous skills are authentic! 😄"
    },
    age: {
      keywords: ['age', 'old', 'how old', 'birthday', 'born'],
      response: "He's young enough to understand TikTok trends but old enough to remember when debugging meant actual bugs in computers. 🐛 Born in 2006, making him a true digital native!"
    },
    hobbies: {
      keywords: ['hobby', 'hobbies', 'fun', 'free time', 'interest', 'like to do', 'enjoy'],
      response: "When he's not coding, Nizar enjoys:\n\n• Debugging code that worked yesterday 🐛\n• Arguing with Stack Overflow answers\n• Optimizing algorithms that didn't need optimizing\n• Pretending to understand regex\n\nJust kidding! He also loves AI/ML projects, building cool apps, and probably binge-watching tech videos at 2 AM. 🌙"
    },
    coffee: {
      keywords: ['coffee', 'caffeine', 'drink', 'tea'],
      response: "Like every programmer, Nizar runs on a steady diet of caffeine and semicolons. ☕ His code quality is directly proportional to his coffee intake. Invest in his coffee fund = invest in better code! 😂"
    },
    bugs: {
      keywords: ['bug', 'bugs', 'error', 'debug'],
      response: "Nizar doesn't write bugs, he writes *undocumented features*. 🐛✨\n\nBut seriously, he's great at debugging! He once spent 3 hours fixing a bug that was caused by a missing semicolon. We don't talk about that day. 😅"
    },
    stackoverflow: {
      keywords: ['stack overflow', 'stackoverflow', 'copy', 'paste'],
      response: "Stack Overflow? Never heard of it. Nizar writes ALL his code from scratch. Every. Single. Line.\n\n...Okay fine, he uses Stack Overflow. But he always understands the code before using it! (Most of the time... like 60%... okay maybe 50%...) 😂"
    },
    work: {
      keywords: ['work life', 'work style', 'how does he work'],
      response: "Nizar's work style:\n\n✅ Commits code with meaningful messages\n✅ Actually writes documentation\n✅ Uses descriptive variable names (no more 'x', 'temp', 'data2')\n✅ Tests his code... sometimes... okay, when it breaks in production\n\nHe's the teammate who actually reads the PR before approving! 🌟"
    },
    girlfriend: {
      keywords: ['girlfriend', 'dating', 'single', 'relationship', 'wife', 'married', 'partner', 'love life', 'romantic'],
      response: "This guy has been single since the dawn of time. 💔😂\n\nBut fear not! We're currently accepting **Girlfriend Applications**! 📝\n\nType **'girlfriend application'** to fill out the official form! Warning: Requirements include tolerance for:\n• 3 AM coding sessions\n• Endless tech talk\n• Coffee addiction\n• Debugging as a love language 💻❤️"
    },
    name: {
      keywords: ['name', 'called', 'who is he', 'who are you talking about', "what's his name"],
      response: "His name is **Nizar Faris**! 🌟\n\nFun fact: His name means 'devoted' in Arabic. Devoted to what? Probably debugging and Stack Overflow at this point! 😂"
    },
    resume: {
      keywords: ['resume', 'cv', 'curriculum vitae', 'download resume', 'see resume', 'view resume'],
      response: "Want to see Nizar's resume? 📄\n\n**📚 EDUCATION**\nA.A.S. Software Engineering | Cincinnati State | **4.0 GPA**\n\n**🏆 ACHIEVEMENTS**\n• **Co-Founder of AlgoVision** (MakeUC 2025) - AI-powered algorithm visualization\n• **4.0 GPA** - Perfect academic record\n• Multiple production-ready projects\n\n**💼 TOP PROJECTS**\n1. **AlgoVision** - AI algorithm visualizer (TypeScript, Tree-sitter)\n2. **Retail Garden Store** - Full POS system (C#, .NET, SQL)\n3. **Pomodoro Timer** - Productivity app (Full-stack)\n4. **Trading Bot** - Algorithmic trading system (Python, SQL)\n\n**🛠️ TECH STACK**\n• Languages: Python (90%), SQL (85%), Java (85%), C (80%), C++ (75%)\n• ML/AI: PyTorch, Pandas, Transformers (90%)\n• Frameworks: .NET, React, Git\n\n📧 Download full resume: **farisnizarah@gmail.com**"
    },
    fullname: {
      keywords: ['full name', 'complete name', 'first name', 'last name', 'surname'],
      response: "His full name is **Nizar Faris**. Simple, elegant, easy to pronounce (unlike some of his variable names 😅)."
    },
    phone: {
      keywords: ['phone', 'phone number', 'call', 'telephone', 'mobile'],
      response: "For his phone number, you'll need to reach out via email first! 📱\n\n📧 **Email**: farisnizaradam@gmail.com\n\nHe's more of a 'text/email person' anyway. Calling means less time for coding! 😄"
    },
    linkedin: {
      keywords: ['linkedin', 'linked in'],
      response: "Connect with Nizar on LinkedIn! 💼\n\n🔗 **linkedin.com/in/nizar-faris**\n\nHe's active there and loves connecting with fellow developers and potential employers! Just don't send him those 'make money working from home' messages. 😂"
    },
    github: {
      keywords: ['github', 'git hub', 'repositories', 'repos', 'code'],
      response: "Check out Nizar's code on GitHub! 🐙\n\n🔗 **github.com/Zouzou-2006**\n\nWarning: You might find some commit messages from 3 AM. Those are... interesting. 😅 But the code is solid!"
    },
    languages: {
      keywords: ['speak', 'languages', 'language speak', 'bilingual', 'multilingual', 'what languages'],
      response: "Nizar speaks:\n\n🗣️ **Human Languages**: English, Arabic (Moroccan dialect), French\n💻 **Programming Languages**: C#, Python, SQL, JavaScript, HTML, CSS\n\nHe's fluent in both human AND computer languages! Though he might be better at explaining algorithms than feelings. 😂"
    },
    availability: {
      keywords: ['available', 'availability', 'start', 'when can you start', 'free'],
      response: "Nizar is actively seeking **Software Development Internships** and is available to start ASAP! 🚀\n\n📅 He's flexible with:\n• Start dates\n• Work arrangements (in-person or remote)\n• Part-time or full-time positions\n\nReach out to discuss opportunities: **farisnizaradam@gmail.com**\n\nHe responds faster than his code compiles! ⚡"
    },
    salary: {
      keywords: ['salary', 'pay', 'compensation', 'wage', 'money', 'cost'],
      response: "Nizar is open to discussing compensation based on the role and responsibilities! 💰\n\nFor internships, he's flexible and focused on gaining experience. His rates are:\n\n• **Currency**: USD or coffee beans ☕\n• **Payment terms**: Negotiable\n• **Benefits**: Clean code included at no extra charge! 😄\n\nContact him to discuss: **farisnizaradam@gmail.com**"
    },
    citizenship: {
      keywords: ['citizen', 'citizenship', 'visa', 'work authorization', 'legally', 'authorized to work'],
      response: "For work authorization questions, it's best to discuss directly with Nizar! 🇺🇸\n\nHe's based in Cincinnati, OH and can clarify his work status for your specific needs.\n\n📧 Email: **farisnizarah@gmail.com**"
    },
    gpa: {
      keywords: ['gpa', 'grade', 'grades', 'academic performance', 'school performance'],
      response: "Nizar maintains a perfect **4.0 GPA** in his Software Engineering program! 📚\n\nStraight A's across the board! He's not just good at coding - he's a dedicated student who excels academically. Talk about overachiever! 🎯"
    },
    algovision: {
      keywords: ['algovision', 'algorithm visualization', 'makeuc', 'co-founder', 'startup'],
      response: "**AlgoVision** is Nizar's proudest achievement! 🚀\n\nHe **co-founded** this AI-powered platform at MakeUC 2025 that visualizes algorithm behavior and code flow in real-time.\n\n**Tech Stack**: TypeScript, JavaScript, Tree-sitter, AI\n**What it does**: Helps developers understand complex algorithms through interactive visualizations\n**Impact**: Making computer science education more accessible!\n\nIt's like having X-ray vision for code! 👀💻\n\nCheck it out: github.com/Zouzou-2006/AlgoVision-MakeUC-2025-"
    },
    tradingbot: {
      keywords: ['trading bot', 'trading', 'algorithmic trading', 'finance', 'stock'],
      response: "Nizar built an **Algorithmic Trading Bot** that analyzes live market data and executes trades! 📈💰\n\n**Features**:\n• Live market data analysis\n• Predictive logic for trades\n• Robust data pipelines\n• Automated execution\n\n**Tech**: Python, SQL, Data Analytics\n\nNo, he's not rich yet, but he's learning! 😂 The bot is more about understanding financial systems and data pipelines than making millions."
    },
    pomodorotimer: {
      keywords: ['pomodoro', 'timer', 'productivity', 'time management'],
      response: "The **Pomodoro Productivity Timer** is Nizar's full-stack masterpiece! ⏱️\n\n**Features**:\n• Customizable work/break intervals\n• Task management\n• Progress tracking\n• Clean UI/UX design\n\n**Skills Demonstrated**: Full-stack development, timing logic, data handling, UI/UX\n\nIronically, he probably spent way more time building it than he's saved using it! 😅"
    },
    retailgarden: {
      keywords: ['retail', 'garden', 'pos', 'point of sale', 'store'],
      response: "The **Retail Garden Store Application** is a complete POS system! 🌱💻\n\n**Features**:\n• Product inventory management\n• Dynamic pricing logic\n• Customer transaction handling\n• SQL database integration\n\n**Tech**: C#, .NET, SQL Server, OOP\n\nIt's a full-blown retail system! Everything from calculating mulch quantities to processing payments. Real-world application skills! 💪"
    },
    machinelearning: {
      keywords: ['machine learning', 'ml', 'ai', 'artificial intelligence', 'neural network'],
      response: "Nizar is **REALLY** into Machine Learning! 🤖\n\n**Expertise Level**: 90%\n**Tools**: PyTorch, Pandas, Transformers\n**Knowledge**: Neural networks, deep learning, data processing\n\n He's not just using ML libraries - he understands the math behind them! From backpropagation to transformers architecture. This is his passion! 🔥\n\nHe's literally building AI assistants (like me!) and algorithm visualization tools. The future is AI, and he's riding that wave! 🌊"
    },
    perfectgpa: {
      keywords: ['4.0', 'perfect', 'straight a', 'dean', 'honor'],
      response: "Yes, Nizar has a **PERFECT 4.0 GPA**! 🎓✨\n\nThat's not 'pretty good' or 'almost perfect' - it's PERFECT. Every. Single. Class.\n\n**What this means**:\n• Exceptional time management\n• Deep understanding of concepts\n• Consistent dedication\n• Academic excellence\n\nHe's proving that you can be a great developer AND a great student! No 'C's get degrees' mentality here! 💯"
    },
    cincinnati: {
      keywords: ['cincinnati', 'cincy', 'ohio', 'cincinnati state'],
      response: "Nizar is based in **Cincinnati, Ohio**! 🌆\n\n**School**: Cincinnati State Technical and Community College\n**Program**: A.A.S. Software Engineering\n**GPA**: 4.0 (flex!)\n\n**Why Cincinnati?**\nGreat tech scene, affordable living, and Skyline Chili! 🌶️\n\nHe's available for local internships or remote opportunities. Cincinnati to anywhere - he's flexible! 🚀"
    },
    moroccan: {
      keywords: ['morocco', 'couscous', 'arabic', 'north africa'],
      response: "Nizar is proudly **Moroccan**! 🇲🇦\n\n**Fun Facts**:\n• Speaks Arabic (Moroccan dialect) + French\n• Can make authentic couscous (probably)\n• Rich cultural heritage\n• US government classifies him as Caucasian (confused paperwork! 😂)\n\n**Cultural Skills**:\n• Multilingual (3 human languages + 5 programming languages)\n• Understanding of diverse perspectives\n• International mindset\n\nHe brings that global perspective to his work! 🌍"
    },
    strength: {
      keywords: ['strength', 'training', 'workout', 'gym', 'fitness', 'exercise', 'lift', 'lifting', 'bodybuilding', 'muscle'],
      response: "Nizar is into **Strength Training**! 💪🏋️\n\n**Why it matters**:\n• Discipline carries over from gym to code\n• Physical fitness = mental sharpness\n• Problem-solving under pressure (like that last rep!)\n• Goal-oriented mindset\n\n**Programming Parallel**:\nJust like debugging, you gotta keep pushing through the pain until it works! 😤\n\n**Daily Routine**:\n• Morning: Lift weights 🏋️\n• Afternoon: Lift bugs out of code 🐛\n• Evening: Lift his GPA (already at 4.0 tho!) 📚\n\nHe's building both his body AND his portfolio! Strong code, strong body! 💻💪"
    }
  };

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
      if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return data.response;
      }
    }

    // Fun personality responses
    if (lowerMessage.match(/\b(hi|hello|hey|greetings|sup|yo)\b/)) {
      const greetings = [
        "Hello! 👋 I'm Nizar's AI assistant (way cooler than ChatGPT, obviously 😎). Ask me about his **skills**, **projects**, **height** (controversial topic), or **ethnicity**!",
        "Hey there! 🚀 I'm the AI version of Nizar, except I don't need coffee to function. Ask me anything!",
        "Greetings, human! 🤖 Ready to learn about the legend that is Nizar? Try asking about his **hobbies**, **work style**, or his relationship with **Stack Overflow**!"
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

    // Girlfriend Application Form
    if (lowerMessage.includes('girlfriend application')) {
      return "**💝 OFFICIAL GIRLFRIEND APPLICATION FORM 💝**\n**Status: ACCEPTING APPLICATIONS**\n\n**━━━━ SECTION 1: BASIC QUALIFICATIONS ━━━━**\n□ Age 18+ (obviously)\n□ Can tolerate nerdy humor and bad puns\n□ Willing to date a guy who's been single since the dawn of time\n□ Understands that 'just one more line of code' = 2 hours\n\n**━━━━ SECTION 2: TECHNICAL COMPATIBILITY ━━━━**\n□ Accept being second place to VS Code & PyCharm\n□ Can you be a rubber duck debugger? (Just nod and say 'hmm')\n□ Willing to learn what 'Git push', 'merge conflict', and 'stack overflow' mean\n□ Won't judge him for talking to AI chatbots at 3 AM\n□ Can handle 3 AM 'Eureka!' moments followed by excitement\n\n**━━━━ SECTION 3: LIFESTYLE REQUIREMENTS ━━━━**\n□ Date nights = hackathons, coding sessions, tech meetups\n□ Understand coffee is a food group\n□ Accept that debugging is a love language\n□ Can survive on pizza, ramen, and Moroccan food\n□ Won't complain about monitor glow at night\n\n**━━━━ SECTION 4: PERSONALITY TRAITS ━━━━**\n□ Sense of humor (you'll need it)\n□ Patience level: EXTREME (dealing with compile errors)\n□ Can handle 'I'll fix it tomorrow' (which means next week)\n□ Appreciate intelligence and ambition\n□ Love for learning new things\n\n**━━━━ SECTION 5: CULTURAL APPRECIATION ━━━━**\n□ Ready to try Moroccan couscous (best food ever!)\n□ Can learn some Arabic phrases (bonus points!)\n□ Open to different cultures and perspectives\n□ Willing to visit Morocco someday\n\n**━━━━ SECTION 6: BONUS POINTS ━━━━**\n□ You can code (any language counts!)\n□ You make better couscous than his mom (good luck!)\n□ You actually think his height is perfect (remember, 6ft! 📏)\n□ Know the difference between Java & JavaScript\n□ Can explain why Python is named after Monty Python\n□ You're also into AI/ML (instant connection!)\n□ Can beat him at chess or video games\n\n**━━━━ SECTION 7: ABSOLUTE DEAL BREAKERS ━━━━**\n❌ Think HTML is a programming language\n❌ Ask 'Can you fix my printer?'\n❌ Prefer tabs over spaces (we use spaces, period)\n❌ Say 'just Google it' when he's explaining something\n❌ Think his projects are 'just games'\n❌ Not supportive of his career goals\n❌ Can't handle his obsession with efficiency\n\n**━━━━ APPLICATION SUBMISSION ━━━━**\n📧 **Email**: farisnizarah@gmail.com\n📋 **Subject**: 'Girlfriend Application - [Your Name]'\n📝 **Include**: Why you're interested, favorite programming joke\n\n⏱️ **Processing Time**: 2-3 business days\n*(Translation: whenever he's done debugging and checks his email)*\n\n**⚠️ IMPORTANT NOTES:**\n• He's Moroccan but US government calls him Caucasian 🤷\n• Claims to be 6ft (actually 5'10\")\n• Born 2006 (Gen Z energy!)\n• Fluent in English, Arabic, French, Python, SQL, and sarcasm\n• Currently seeking internships (so you might be dating a future tech CEO!)\n• Based in Cincinnati, OH (swing state vibes)\n\n**💡 PRO TIPS FOR APPLICANTS:**\n1. Mention you read this whole application (shows dedication)\n2. Include a programming joke in your email\n3. Don't mention the height thing\n4. Be genuine - he's smart and can tell!\n5. Show interest in his projects (they're his babies)\n\n**🎯 SELECTION CRITERIA:**\nApplications will be evaluated based on:\n• Compatibility score (calculated by AI, obviously)\n• Humor level (must appreciate dad jokes)\n• Support factor (will you cheer him on?)\n• Intelligence (sapiosexual alert!)\n• Patience meter (can you handle developer time?)\n\n**📊 CURRENT APPLICATION STATUS:**\nApplications received: 0\nSlots available: 1\nSuccess rate: TBD\nWaiting time: Unknown (but worth it!)\n\n**🏆 WHAT YOU GET IF ACCEPTED:**\n✅ A loyal, intelligent, ambitious partner\n✅ Endless tech support (actually useful kind)\n✅ Someone who actually listens (debugging requires it)\n✅ Moroccan food cooked with love\n✅ A guy with a 4.0 GPA (smart and driven!)\n✅ Future software engineer (stable career path!)\n✅ Someone who'll build you custom apps\n✅ Bilingual boyfriend (English + Arabic + coding languages)\n\n**⚠️ LEGAL DISCLAIMER:**\nBy submitting this application, you acknowledge that:\n• Nizar might forget dates when debugging\n• You'll hear 'just one more bug' at least 100 times\n• Your photos might become test data for his projects\n• Coffee dates might turn into coding sessions\n• You're signing up for dad jokes and puns\n\n**━━━━━━━━━━━━━━━━━━━━━━━**\nGood luck, applicant! May your code compile on the first try, and may the odds be ever in your favor! 🎯😂💻\n\n*P.S. - Yes, he actually made an AI create this application. If that's not commitment to efficiency, I don't know what is!* 🤖❤️";
    }

    // Default response with personality
    const defaults = [
      "Hmm, I'm not sure about that one! 🤔 But I can tell you about Nizar's **skills**, **projects**, **education**, **experience**, **height**, **ethnicity**, or **hobbies**. Pick your poison!",
      "That's outside my knowledge base! Try asking about his **work style**, relationship with **bugs**, **coffee** addiction, or his **love life**!",
      "Error 404: Answer not found! 😅 But I can help with his **skills**, **projects**, or why he's obsessed with **Stack Overflow**. What'll it be?"
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