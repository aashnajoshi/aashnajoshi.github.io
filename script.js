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
            const icon = toggleButton.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-moon', mode === 'light');
                icon.classList.toggle('fa-sun', mode === 'dark');
            }
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

    // Disable right-click for protected elements
    document.querySelectorAll('.prevent-right-click').forEach(element => {
        element.addEventListener('contextmenu', e => e.preventDefault());
    });

    // Restoring collapsible functionality
    document.querySelectorAll('.collapsible-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('i');

            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.classList.add('rotate-180');
            } else {
                content.classList.add('hidden');
                icon.classList.remove('rotate-180');
            }
        });
    });
});
