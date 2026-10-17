
document.addEventListener("DOMContentLoaded", () => {

    // 1. MOBILE MENU
    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".navbar .nav-btn");

    function closeMenu() {
        if (!menuToggle || !navbar) return;

        navbar.classList.remove("open");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    }

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navbar.classList.toggle("open");

            document.body.classList.toggle("menu-open", isOpen);

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }
        });

        navLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }

    // 2. ACTIVE NAVIGATION LINK
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                navLinks.forEach(link => {
                    const active =
                        link.getAttribute("href") ===
                        `#${entry.target.id}`;

                    link.classList.toggle("active", active);
                });
            });
        }, {
            rootMargin: "-35% 0px -55% 0px"
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // 3. SCROLL REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll(
        ".section-heading, .about-grid, .stat-card, " +
        ".service-card, .why-card, .review-card, " +
        ".contact-item, .contact-form"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach(element => {
            element.classList.add("js-reveal");
            revealObserver.observe(element);
        });
    }

    // 4. CONTACT FORM DEMO
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            alert(
                "This is a demo website. Your enquiry has not been sent. " +
                "Connect a backend or form service to receive enquiries."
            );
        });
    }

    // 5. AUTOMATIC COPYRIGHT YEAR
    const footerText = document.querySelector(".footer-bottom p");

    if (footerText) {
        footerText.textContent = footerText.textContent.replace(
            /\d{4}/,
            new Date().getFullYear()
        );
    }

});
