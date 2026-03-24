function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

const themeToggleBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
    document.body.classList.toggle('light-theme', theme === 'light');
    document.body.classList.toggle('dark-theme', theme === 'dark');
    if (themeToggleBtn) {
        themeToggleBtn.textContent = theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
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
