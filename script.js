// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('section');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animate nav items
    navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navLinksItems.forEach(link => {
            link.style.animation = '';
        });
    }
});

// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navbar.classList.toggle('nav-open');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('nav-open');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navbar.classList.contains('nav-open')) {
        navbar.classList.remove('nav-open');
    }
});

// Smooth scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                navLinksItems.forEach(link => {
                    link.style.animation = '';
                });
            }
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class based on scroll position
    if (currentScroll > scrollThreshold) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Active section highlight
function highlightActiveSection() {
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Intersection Observer for animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            if (entry.target.classList.contains('skill-bar')) {
                animateSkillBar(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.fade-out').forEach(element => {
    observer.observe(element);
});

document.querySelectorAll('.skill-bar').forEach(bar => {
    observer.observe(bar);
});

// Animate skill bars
function animateSkillBar(bar) {
    const progress = bar.querySelector('.skill-progress');
    const targetWidth = progress.getAttribute('data-progress');
    progress.style.width = targetWidth + '%';
}

// Typing effect
function typeWriter(element, text, speed = 50, delay = 0) {
    if (!element) return;
    
    setTimeout(() => {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }, delay);
}

// Initialize typing effects
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    const cyberText = document.querySelector('.cyber-text');
    
    if (heroTitle) {
        const titleText = heroTitle.textContent;
        typeWriter(heroTitle, titleText, 70);
    }
    
    if (cyberText) {
        const subtitleText = cyberText.textContent;
        typeWriter(cyberText, subtitleText, 50, 1500);
    }
});

// Project hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
    });
});

// Form validation and submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const name = this.querySelector('input[name="name"]');
        const email = this.querySelector('input[name="email"]');
        const message = this.querySelector('textarea[name="message"]');
        
        // Basic validation
        if (!name.value || !email.value || !message.value) {
            showFormError('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showFormError('Please enter a valid email address');
            return;
        }
        
        // Show success message
        showFormSuccess();
        
        // Reset form after delay
        setTimeout(() => {
            this.reset();
        }, 3000);
    });
}

// Form feedback functions
function showFormError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    
    contactForm.insertBefore(errorDiv, contactForm.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

function showFormSuccess() {
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.backgroundColor = 'var(--secondary-color)';
    submitBtn.style.color = 'var(--bg-color)';
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.style.color = '';
    }, 3000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Particles Animation
function createParticles() {
    const particles = document.querySelector('.particles');
    const numberOfParticles = 50;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--x', `${Math.random() * 100}%`);
        particle.style.setProperty('--y', `${Math.random() * 100}%`);
        particle.style.setProperty('--duration', `${Math.random() * 20 + 10}s`);
        particle.style.setProperty('--delay', `${Math.random() * 5}s`);
        particle.style.setProperty('--size', `${Math.random() * 2 + 1}px`);
        particle.style.setProperty('--opacity', `${Math.random() * 0.5 + 0.2}`);
        particles.appendChild(particle);
    }
}

// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.querySelector('.typing');
    const texts = [
        "Cyber Security Intern",
        "Ethical Hacker",
        "Penetration Tester",
        "Bug Hunter"
    ];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = texts[currentTextIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, currentCharIndex);
            currentCharIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, currentCharIndex);
            currentCharIndex++;
        }

        // Set typing speed
        let typingSpeed = isDeleting ? 50 : 150;

        // Handle text completion or deletion
        if (!isDeleting && currentCharIndex === currentText.length) {
            // Pause at the end of typing
            typingSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            // Move to next text
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            // Pause before starting new text
            typingSpeed = 500;
        }

        // Continue the animation
        setTimeout(typeText, typingSpeed);
    }

    // Initialize animations
    createParticles();
    typeText();

    // Animate stats when they come into view
    const stats = document.querySelectorAll('.stat');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        stat.style.transform = 'translateY(20px)';
        stat.style.opacity = '0';
        stat.style.transition = 'all 0.6s ease-out';
        observer.observe(stat);
    });
});

// Stats Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const numberElement = stat.querySelector('.number');
        let current = 0;
        const increment = target / 50; // Divide animation into 50 steps
        const duration = 2000; // 2 seconds
        const stepTime = duration / 50;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                numberElement.textContent = target;
                clearInterval(counter);
            } else {
                numberElement.textContent = Math.floor(current);
            }
        }, stepTime);
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
});

// Add this CSS to your styles.css file for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
