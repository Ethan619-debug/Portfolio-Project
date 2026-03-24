function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

// Theme Toggle - Desktop and Mobile
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');
const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
const themeIconMobile = document.getElementById('theme-icon-mobile');

function applyTheme(theme) {
    document.body.classList.toggle('light-theme', theme === 'light');
    document.body.classList.toggle('dark-theme', theme === 'dark');
    if (theme === 'light') {
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun transition-transform duration-500 rotate-180 text-yellow-400';
            themeText.textContent = 'Light Mode';
        }
        if (themeIconMobile) {
            themeIconMobile.className = 'fas fa-sun transition-transform duration-500 text-yellow-400';
        }
    } else {
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon transition-transform duration-500 text-slate-300';
            themeText.textContent = 'Dark Mode';
        }
        if (themeIconMobile) {
            themeIconMobile.className = 'fas fa-moon transition-transform duration-500 text-slate-300';
        }
    }
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const current = localStorage.getItem('theme') || 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}

if (themeToggleBtnMobile) {
    themeToggleBtnMobile.addEventListener('click', toggleTheme);
}

// System Preference Detection (Feature 11)
function detectSystemPreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    return 'dark';
}

const initialTheme = detectSystemPreference();
applyTheme(initialTheme);

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Toggle mobile menu
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('show');
    });
}

// Close mobile menu when nav link clicked
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('show');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('show');
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Project Card Interactions
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    // Tooltip show/hide on hover
    card.addEventListener('mouseenter', () => {
        const tooltip = card.querySelector('.tech-tooltip');
        if (tooltip) {
            tooltip.classList.remove('hidden');
        }
    });

    card.addEventListener('mouseleave', () => {
        const tooltip = card.querySelector('.tech-tooltip');
        if (tooltip) {
            tooltip.classList.add('hidden');
        }
    });

    // Card click handler - Open Modal (Feature 6)
    card.addEventListener('click', (e) => {
        const projectTitle = card.getAttribute('data-title');
        const projectTech = card.getAttribute('data-tech');
        const projectUrl = card.getAttribute('data-url');
        
        // Populate modal with project data
        document.getElementById('modal-title').textContent = projectTitle;
        document.getElementById('modal-description').textContent = `Detailed information about ${projectTitle}. Click the GitHub or Live Demo link to view the project.`;
        document.getElementById('modal-image').src = card.querySelector('.project-image').src;
        
        // Populate tech stack
        const techStackDiv = document.getElementById('modal-tech');
        techStackDiv.innerHTML = '';
        projectTech.split(',').forEach(tech => {
            const techTag = document.createElement('span');
            techTag.className = 'bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm';
            techTag.textContent = tech.trim();
            techStackDiv.appendChild(techTag);
        });
        
        // Set project links
        const githubLink = document.getElementById('modal-github');
        const demoLink = document.getElementById('modal-demo');
        
        if (projectUrl && projectUrl !== '#') {
            githubLink.href = projectUrl;
            demoLink.href = projectUrl;
        } else {
            githubLink.style.opacity = '0.5';
            demoLink.style.opacity = '0.5';
        }
        
        // Show modal
        document.getElementById('project-modal').classList.remove('hidden');
    });
});

// Modal Controls (Feature 6)
const projectModal = document.getElementById('project-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalOverlay = document.querySelector('.modal-overlay');

// Close modal when X button clicked
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        projectModal.classList.add('hidden');
    });
}

// Close modal when clicking outside (on overlay)
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            projectModal.classList.add('hidden');
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) {
        projectModal.classList.add('hidden');
    }
});

// Back to Top Button (Feature: Floating Navigation)
const backToTopBtn = document.getElementById('back-to-top');

// Show/hide back to top button on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Smooth scroll to top on click
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Skeleton Loader - Image Loading Handler
const projectImages = document.querySelectorAll('.project-image');

projectImages.forEach(img => {
    // Check if image is already cached and loaded
    if (img.complete) {
        img.classList.add('loaded');
    }
    
    // Handle image load event
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
    
    // Handle image error
    img.addEventListener('error', () => {
        console.warn(`Failed to load image: ${img.src}`);
        img.classList.add('loaded'); // Remove skeleton even on error
    });
});
