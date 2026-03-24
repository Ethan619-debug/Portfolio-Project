function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');

function applyTheme(theme) {
    document.body.classList.toggle('light-theme', theme === 'light');
    document.body.classList.toggle('dark-theme', theme === 'dark');
    if (theme === 'light') {
        themeIcon.className = 'fas fa-sun transition-transform duration-500 rotate-180 text-yellow-400';
        themeText.textContent = 'Light Mode';
    } else {
        themeIcon.className = 'fas fa-moon transition-transform duration-500 text-slate-300';
        themeText.textContent = 'Dark Mode';
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

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

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

    // Card click handler
    card.addEventListener('click', (e) => {
        const projectUrl = card.getAttribute('data-url');
        const projectTitle = card.getAttribute('data-title');
        
        if (projectUrl && projectUrl !== '#') {
            window.location.href = projectUrl;
        } else {
            console.log(`Clicked on: ${projectTitle}`);
            // Can be extended to show a modal with project details
        }
    });
});
