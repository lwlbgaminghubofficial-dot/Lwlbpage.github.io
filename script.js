// ========================
// Theme Toggle (Dark/Light Mode)
// ========================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light-mode';
htmlElement.classList.add(currentTheme);
updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const isLightMode = htmlElement.classList.contains('light-mode');
    
    if (isLightMode) {
        htmlElement.classList.remove('light-mode');
        htmlElement.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        htmlElement.classList.remove('dark-mode');
        htmlElement.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    }
    
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    const isDarkMode = htmlElement.classList.contains('dark-mode');
    
    if (isDarkMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ========================
// Navigation Menu Toggle
// ========================

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ========================
// Active Navigation Link
// ========================

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================
// Contact Form Submission
// ========================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    const name = contactForm.children[0].querySelector('input').value;
    const email = contactForm.children[1].querySelector('input').value;
    const subject = contactForm.children[2].querySelector('input').value;
    const message = contactForm.children[3].querySelector('textarea').value;
    
    // Show success message (in a real app, you'd send this to a server)
    showNotification('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.', 'success');
    
    // Reset form
    contactForm.reset();
});

// ========================
// Notification System
// ========================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        }
        
        .notification-success {
            background: linear-gradient(135deg, #10b981, #059669);
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        }
        
        .notification-error {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
        }
        
        .notification-info {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @media (max-width: 480px) {
            .notification {
                right: 10px;
                left: 10px;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ========================
// Smooth Scroll Animation
// ========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================
// Lazy Loading Animation
// ========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in-up animation styles
const animStyle = document.createElement('style');
animStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .project-card, .stat-item {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
    }
`;
document.head.appendChild(animStyle);

// Observe elements
document.querySelectorAll('.project-card, .stat-item').forEach(el => {
    observer.observe(el);
});

// ========================
// Parallax Scroll Effect
// ========================

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollTop * 0.5}px)`;
    }
});

// ========================
// Form Input Validation
// ========================

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--primary-color)';
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.style.borderColor = 'var(--border-color)';
        }
    });
    
    input.addEventListener('input', () => {
        if (input.value) {
            input.style.borderColor = 'var(--primary-color)';
        }
    });
});

// ========================
// Mobile Menu Close on Resize
// ========================

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ========================
// Page Load Animation
// ========================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initial opacity
document.body.style.opacity = '1';

// ========================
// Header Hide on Scroll Down
// ========================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Add navbar transition style
const navbarStyle = document.createElement('style');
navbarStyle.textContent = `
    .navbar {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(navbarStyle);

// ========================
// Console Welcome Message
// ========================

console.log('%c🎉 مرحباً بك في Portfolio الخاص بي!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cتم إنشاؤه بـ ❤️ باستخدام HTML و CSS و JavaScript', 'color: #ec4899; font-size: 14px;');
