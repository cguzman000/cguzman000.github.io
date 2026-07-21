// Interactive Logic & Theme Management for cguzman000.github.io

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initNavbarScroll();
  initThemePicker();
  initSkillsFilter();
  initStatsCounter();
  initMobileMenu();
});

/* 1. Typewriter Animation */
const typewriterWords = [
  "Desarrollador Flutter & Mobile",
  "Ingeniero de Software Frontend",
  "Creador de Soluciones Web",
  "Entusiasta del Código Limpio"
];

function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const speed = 100;
  const delay = 1800;

  function type() {
    const currentWord = typewriterWords[wordIdx];
    
    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
    }

    let currentSpeed = speed;
    if (isDeleting) currentSpeed /= 2;

    if (!isDeleting && charIdx === currentWord.length) {
      currentSpeed = delay;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % typewriterWords.length;
      currentSpeed = 400;
    }

    setTimeout(type, currentSpeed);
  }

  type();
}

/* 2. Navbar Scroll Behavior & Active Link Highlighting */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Toggle background blur on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active menu item based on section in viewport
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* 3. Dynamic Color Accent Theme Picker */
function initThemePicker() {
  const dots = document.querySelectorAll('.color-dot');
  
  // Load stored hue or default to 190 (Cyan)
  const savedHue = localStorage.getItem('portfolio_hue') || '190';
  setThemeHue(savedHue);

  dots.forEach(dot => {
    if (dot.dataset.hue === savedHue) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }

    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const hue = dot.dataset.hue;
      setThemeHue(hue);
      localStorage.setItem('portfolio_hue', hue);
      showToast(`Tema actualizado`);
    });
  });
}

function setThemeHue(hue) {
  document.documentElement.style.setProperty('--hue', hue);
}

/* 4. Skills Filtering Logic */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skills-filter .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      skillCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

/* 5. Animated Stats Counters */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(num => {
          const target = parseInt(num.dataset.target);
          let count = 0;
          const increment = Math.ceil(target / 40);
          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            if (num.textContent.includes('%')) {
              num.textContent = `${count}%`;
            } else {
              num.textContent = `${count}+`;
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) observer.observe(statsSection);
}

/* 6. Toast Feedback Notification */
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function copyToClipboard(text, successMessage) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMessage || 'Copiado al portapapeles');
  }).catch(() => {
    showToast('Error al copiar');
  });
}

function copyProjectInfo(name) {
  showToast(`Información del proyecto: ${name}`);
}

/* 7. Contact Form Handler */
function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  showToast(`¡Gracias ${name}! Tu mensaje ha sido registrado.`);
  event.target.reset();
}

/* 8. Mobile Menu Toggle */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isVisible = navLinks.style.display === 'flex';
    if (isVisible) {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'rgba(7, 9, 14, 0.95)';
      navLinks.style.backdropFilter = 'blur(16px)';
      navLinks.style.padding = '1.5rem';
      navLinks.style.borderBottom = '1px solid var(--glass-border)';
    }
  });
}
