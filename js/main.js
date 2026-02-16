// ============================================
// THEME
// ============================================
const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// ============================================
// NAVBAR
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
});

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);

        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// TYPING EFFECT
// ============================================
const roles = [
    'build AI tools.',
    'create web apps.',
    'design games.',
    'automate things.',
    'solve problems.',
    'break & fix things.'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let speed = 80;
const roleText = document.getElementById('role-text');

function typeRole() {
    const current = roles[roleIndex];

    if (isDeleting) {
        roleText.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        speed = 40;
    } else {
        roleText.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        speed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
        speed = 2500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }

    setTimeout(typeRole, speed);
}

typeRole();

// ============================================
// SCROLL REVEAL
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Counter animation
            entry.target.querySelectorAll('.metric-num').forEach(counter => {
                animateCounter(counter);
            });
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    if (!target) return;

    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 16);
}

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> <span>Sent! I\'ll reply soon 🚀</span>';
        btn.style.background = '#00e5a0';
        btn.style.opacity = '1';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
        }, 3000);
    }, 1500);
});

// ============================================
// PAGE LOAD
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    // Trigger hero reveals with stagger
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 300 + i * 150);
    });
});

// ============================================
// PARALLAX EFFECT (subtle)
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    if (scrolled < window.innerHeight) {
        const heroRight = document.querySelector('.hero-right');
        if (heroRight) {
            heroRight.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }

    // Orb parallax
    document.querySelectorAll('.orb').forEach((orb, i) => {
        const speed = (i + 1) * 0.02;
        orb.style.transform += ` translateY(${scrolled * speed}px)`;
    });
});