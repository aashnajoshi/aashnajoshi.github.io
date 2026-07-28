document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const themeToggle = document.getElementById("dark-mode");
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const scrollTop = document.getElementById("scroll-top");


    /* Theme */

    const setTheme = (theme) => {

        const dark = theme === "dark";

        body.classList.toggle(
            "dark-mode",
            dark
        );

        localStorage.setItem(
            "theme",
            theme
        );


        const icon = themeToggle?.querySelector("i");

        if (icon) {

            icon.classList.toggle(
                "fa-moon",
                !dark
            );

            icon.classList.toggle(
                "fa-sun",
                dark
            );

        }

    };


    const savedTheme = localStorage.getItem("theme");

    const preferredTheme =
        savedTheme ||
        (
            window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
        );


    setTheme(preferredTheme);



    themeToggle?.addEventListener(
        "click",
        () => {

            const isDark =
                body.classList.contains("dark-mode");


            setTheme(
                isDark
                    ? "light"
                    : "dark"
            );

        }
    );



    /* Mobile Menu */

    const toggleMenu = () => {

        if (!mobileMenu || !menuToggle) return;


        const open =
            mobileMenu.classList.toggle("hidden");


        menuToggle.setAttribute(
            "aria-expanded",
            String(!open)
        );


        const icon =
            menuToggle.querySelector("i");


        icon?.classList.toggle(
            "fa-bars",
            open
        );


        icon?.classList.toggle(
            "fa-times",
            !open
        );

    };


    menuToggle?.addEventListener(
        "click",
        toggleMenu
    );


    mobileMenu?.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.add(
                        "hidden"
                    );

                    menuToggle?.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon =
                        menuToggle?.querySelector("i");

                    icon?.classList.remove(
                        "fa-times"
                    );

                    icon?.classList.add(
                        "fa-bars"
                    );

                }
            );

        });



    /* Disable context menu */

    document
        .querySelectorAll(".prevent-right-click")
        .forEach(element => {

            element.addEventListener(
                "contextmenu",
                event => event.preventDefault()
            );

        });



    /* Scroll To Top */

    const updateScrollButton = () => {

        if (!scrollTop) return;


        const visible =
            window.scrollY >= 400;


        scrollTop.classList.toggle(
            "scale-100",
            visible
        );


        scrollTop.classList.toggle(
            "opacity-100",
            visible
        );


        scrollTop.classList.toggle(
            "pointer-events-auto",
            visible
        );


        scrollTop.classList.toggle(
            "pointer-events-none",
            !visible
        );

    };


    window.addEventListener(
        "scroll",
        updateScrollButton,
        {
            passive: true
        }
    );


    updateScrollButton();


    scrollTop?.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

});