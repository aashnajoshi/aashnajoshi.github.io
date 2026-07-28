document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("dark-mode");
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const scrollTopBtn = document.getElementById("scroll-top");
    const navLinks = document.querySelectorAll("#nav-menu a");
    const sections = document.querySelectorAll("section[id]");

    // Theme
    const updateThemeIcon = (dark) => {
        const icon = themeToggle?.querySelector("i");
        if (!icon) return;

        icon.classList.toggle("fa-moon", !dark);
        icon.classList.toggle("fa-sun", dark);
    };

    const setTheme = (theme) => {
        const dark = theme === "dark";
        body.classList.toggle("dark-mode", dark);
        localStorage.setItem("theme", theme);
        updateThemeIcon(dark);
    };

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const savedTheme = localStorage.getItem("theme");

    setTheme(savedTheme || (systemTheme.matches ? "dark" : "light"));

    themeToggle?.addEventListener("click", () => {
        const dark = body.classList.contains("dark-mode");
        setTheme(dark ? "light" : "dark");
    });

    systemTheme.addEventListener("change", (event) => {
        if (!localStorage.getItem("theme")) {
            setTheme(event.matches ? "dark" : "light");
        }
    });

    // Mobile menu
    const setMenuState = (open) => {
        if (!mobileMenu || !menuToggle) return;

        mobileMenu.classList.toggle("hidden", !open);
        mobileMenu.setAttribute("aria-hidden", String(!open));
        menuToggle.setAttribute("aria-expanded", String(open));

        const icon = menuToggle.querySelector("i");
        icon?.classList.toggle("fa-bars", !open);
        icon?.classList.toggle("fa-times", open);
    };

    menuToggle?.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        setMenuState(!isOpen);
    });

    mobileMenu?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setMenuState(false);
    });

    // Scroll to top
    const updateScrollButton = () => {
        if (!scrollTopBtn) return;

        const visible = window.scrollY > 400;
        scrollTopBtn.classList.toggle("scale-100", visible);
        scrollTopBtn.classList.toggle("opacity-100", visible);
        scrollTopBtn.classList.toggle("pointer-events-auto", visible);
        scrollTopBtn.classList.toggle("pointer-events-none", !visible);
    };

    let ticking = false;

    window.addEventListener(
        "scroll",
        () => {
            if (ticking) return;

            window.requestAnimationFrame(() => {
                updateScrollButton();
                ticking = false;
            });

            ticking = true;
        },
        { passive: true }
    );

    updateScrollButton();

    scrollTopBtn?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Active navigation
    if (sections.length && navLinks.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    navLinks.forEach((link) => link.classList.remove("active"));

                    const activeLink = document.querySelector(
                        `#nav-menu a[href="#${entry.target.id}"]`
                    );
                    activeLink?.classList.add("active");
                });
            },
            { threshold: 0.5 }
        );

        sections.forEach((section) => observer.observe(section));
    }
});