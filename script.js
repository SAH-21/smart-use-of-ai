/* =========================================================
   SMART USE OF AI
   Sahil Thute
   Website JavaScript
   ========================================================= */


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("js-ready");


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            const isOpen = navLinks.classList.contains("open");

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

        });


        /* Close menu after clicking a link */

        const navItems = navLinks.querySelectorAll("a");

        navItems.forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            });

        });

    }


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       NAVBAR ACTIVE SECTION
    ===================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navItems = document.querySelectorAll(
        ".nav-link"
    );

    const updateActiveNavigation = () => {

        const scrollPosition =
            window.scrollY + 150;

        let currentSection = "home";

        sections.forEach((section) => {

            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (
                scrollPosition >= top &&
                scrollPosition < top + height
            ) {
                currentSection = section.id;
            }

        });


        navItems.forEach((link) => {

            const href = link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById("backToTop");

    if (backToTop) {

        const toggleBackToTop = () => {

            if (window.scrollY > 600) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        };


        window.addEventListener(
            "scroll",
            toggleBackToTop,
            { passive: true }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       IMAGE LIGHTBOX
    ===================================================== */

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const screenshotImages =
        document.querySelectorAll(
            ".screenshot-card img"
        );


    if (
        lightbox &&
        lightboxImage &&
        lightboxClose
    ) {

        screenshotImages.forEach((image) => {

            image.addEventListener("click", () => {

                lightboxImage.src = image.src;

                lightboxImage.alt =
                    image.alt || "Expanded screenshot";

                lightbox.classList.add("open");

                document.body.classList.add(
                    "no-scroll"
                );

            });

        });


        const closeLightbox = () => {

            lightbox.classList.remove("open");

            document.body.classList.remove(
                "no-scroll"
            );

        };


        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );


        lightbox.addEventListener(
            "click",
            (event) => {

                if (event.target === lightbox) {
                    closeLightbox();
                }

            }
        );


        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    lightbox.classList.contains("open")
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       VIDEO CONTROL
       Only one video plays at a time
    ===================================================== */

    const videos =
        document.querySelectorAll("video");

    videos.forEach((video) => {

        video.addEventListener(
            "play",
            () => {

                videos.forEach((otherVideo) => {

                    if (
                        otherVideo !== video &&
                        !otherVideo.paused
                    ) {

                        otherVideo.pause();

                    }

                });

            }
        );


        /* Handle video errors */

        video.addEventListener(
            "error",
            () => {

                console.warn(
                    "Video could not be loaded:",
                    video.currentSrc
                );

            }
        );

    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }


                event.preventDefault();

                const navbarHeight = 75;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.style.opacity = "0.25";

                console.warn(
                    "Image could not be loaded:",
                    image.src
                );

            }
        );

    });


    /* =====================================================
       BUTTON / CARD MICRO INTERACTION
    ===================================================== */

    const interactiveCards =
        document.querySelectorAll(
            ".tool-card, .feature-card"
        );

    interactiveCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.setProperty(
                    "--mouse-x",
                    "50%"
                );

            }
        );

    });


    /* =====================================================
       INITIAL PAGE LOAD
    ===================================================== */

    window.dispatchEvent(
        new Event("scroll")
    );

});