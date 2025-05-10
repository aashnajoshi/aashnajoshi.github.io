document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggleButton = document.getElementById('dark-mode');
    const savedMode = localStorage.getItem('lightMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialMode = savedMode || (systemPrefersDark ? 'dark' : 'light');

    const applyTheme = (mode) => {
        body.setAttribute('data-light-mode', mode);
        body.classList.toggle('dark-mode', mode === 'dark');
        if (toggleButton) {
            toggleButton.classList.toggle('fa-moon', mode === 'light');
            toggleButton.classList.toggle('fa-sun', mode === 'dark');
            localStorage.setItem('lightMode', mode);
        }
    };
    applyTheme(initialMode);

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const currentMode = body.getAttribute('data-light-mode');
            const newMode = currentMode === 'light' ? 'dark' : 'light';
            applyTheme(newMode);
        });
    }

    document.querySelectorAll('.prevent-right-click').forEach(element => {
        element.addEventListener('contextmenu', e => e.preventDefault());
    });
});