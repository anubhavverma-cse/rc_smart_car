/* =========================================================
   IoT SMART RC CAR PORTFOLIO
   SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const loader = document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("hide");
            }

        }, 700);

    });


    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add("navbar-scrolled");

        } else {

            navbar.classList.remove("navbar-scrolled");

        }

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const navigationLinks =
        document.querySelectorAll(
            '.navigation a[href^="#"], .nav-button[href^="#"]'
        );

    navigationLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".project-overview-grid, " +
            ".hardware-card, " +
            ".gallery-item, " +
            ".video-wrapper, " +
            ".working-step, " +
            ".specification-table, " +
            ".future-card, " +
            ".developer-card"
        );


    revealElements.forEach((element, index) => {

        element.classList.add("scroll-hidden");

        element.style.transitionDelay =
            `${Math.min(index * 0.06, 0.35)}s`;

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "scroll-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(
            ".navigation a"
        );


    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursor =
        document.createElement("div");

    cursor.className =
        "custom-cursor";


    const cursorDot =
        document.createElement("div");

    cursorDot.className =
        "custom-cursor-dot";


    if (window.innerWidth > 900) {

        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);


        document.addEventListener(
            "mousemove",
            event => {

                cursor.style.left =
                    `${event.clientX}px`;

                cursor.style.top =
                    `${event.clientY}px`;


                cursorDot.style.left =
                    `${event.clientX}px`;

                cursorDot.style.top =
                    `${event.clientY}px`;

            }
        );


        const interactiveElements =
            document.querySelectorAll(
                "a, button, .gallery-item, .hardware-card"
            );


        interactiveElements.forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursor.classList.add(
                        "cursor-hover"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursor.classList.remove(
                        "cursor-hover"
                    );

                }
            );

        });

    }


    /* =====================================================
       HERO IMAGE PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    const heroImage =
        document.querySelector(".main-car-image");


    if (
        heroVisual &&
        heroImage &&
        window.innerWidth > 900
    ) {

        heroVisual.addEventListener(
            "mousemove",
            event => {

                const rect =
                    heroVisual.getBoundingClientRect();


                const mouseX =
                    event.clientX - rect.left;

                const mouseY =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateY =
                    ((mouseX - centerX) /
                        centerX) * 5;


                const rotateX =
                    ((mouseY - centerY) /
                        centerY) * -4;


                heroImage.style.transform =
                    `scale(1.03)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                heroImage.style.transform =
                    "scale(1) rotateX(0deg) rotateY(0deg)";

            }
        );

    }


    /* =====================================================
       BACKGROUND GLOW FOLLOW MOUSE
    ===================================================== */

    const glowOne =
        document.querySelector(".glow-one");

    const glowTwo =
        document.querySelector(".glow-two");


    document.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 700) {
                return;
            }


            if (glowOne) {

                glowOne.style.transform =
                    `translate(
                        ${event.clientX * 0.015}px,
                        ${event.clientY * 0.015}px
                    )`;

            }


            if (glowTwo) {

                glowTwo.style.transform =
                    `translate(
                        ${event.clientX * -0.01}px,
                        ${event.clientY * -0.01}px
                    )`;

            }

        }
    );


    /* =====================================================
       HARDWARE CARD 3D TILT
    ===================================================== */

    const hardwareCards =
        document.querySelectorAll(
            ".hardware-card"
        );


    hardwareCards.forEach(card => {

        if (window.innerWidth < 800) {
            return;
        }


        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) * -4;


                const rotateY =
                    ((x - centerX) /
                        centerX) * 4;


                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";

            }
        );

    });


    /* =====================================================
       GALLERY LIGHTBOX
    ===================================================== */

    const lightbox =
        document.getElementById(
            "imageLightbox"
        );


    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );


    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );


    const galleryImages =
        document.querySelectorAll(
            ".gallery-item img"
        );


    galleryImages.forEach(image => {

        image.addEventListener(
            "click",
            () => {

                if (!lightbox || !lightboxImage) {
                    return;
                }


                lightboxImage.src =
                    image.src;


                lightboxImage.alt =
                    image.alt;


                lightbox.classList.add(
                    "active"
                );


                document.body.classList.add(
                    "lightbox-open"
                );

            }
        );

    });


    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "lightbox-open"
        );


        setTimeout(() => {

            if (lightboxImage) {
                lightboxImage.src = "";
            }

        }, 300);

    }


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeLightbox();

            }

        }
    );


    /* =====================================================
       VIDEO
    ===================================================== */

    const video =
        document.getElementById(
            "projectVideo"
        );


    const videoOverlay =
        document.querySelector(
            ".video-overlay"
        );


    if (video) {

        video.addEventListener(
            "play",
            () => {

                if (videoOverlay) {

                    videoOverlay.classList.add(
                        "video-playing"
                    );

                }

            }
        );


        video.addEventListener(
            "pause",
            () => {

                if (videoOverlay) {

                    videoOverlay.classList.remove(
                        "video-playing"
                    );

                }

            }
        );

    }


    /* =====================================================
       GALLERY HOVER INFORMATION
    ===================================================== */

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    galleryItems.forEach(item => {

        item.addEventListener(
            "mouseenter",
            () => {

                item.classList.add(
                    "gallery-active"
                );

            }
        );


        item.addEventListener(
            "mouseleave",
            () => {

                item.classList.remove(
                    "gallery-active"
                );

            }
        );

    });


    /* =====================================================
       NUMBER COUNTER
    ===================================================== */

    const numbers =
        document.querySelectorAll(
            ".step-number"
        );


    numbers.forEach(number => {

        number.style.opacity = "0.8";

    });


    /* =====================================================
       MOUSE HOVER FOR BUTTONS
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".primary-button, .secondary-button, .nav-button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "mouseenter",
            () => {

                button.classList.add(
                    "button-hover"
                );

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.classList.remove(
                    "button-hover"
                );

            }
        );

    });


    /* =====================================================
       IMAGE FALLBACK
    ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );


                console.warn(
                    "Image not found:",
                    image.src
                );

            }
        );

    });


    /* =====================================================
       LAZY IMAGE LOADING
    ===================================================== */

    images.forEach(image => {

        if (
            !image.hasAttribute("loading") &&
            !image.classList.contains("main-car-image")
        ) {

            image.setAttribute(
                "loading",
                "lazy"
            );

        }

    });


    /* =====================================================
       TYPING EFFECT FOR HERO
    ===================================================== */

    const heroSmallTitle =
        document.querySelector(
            ".hero-small-title"
        );


    if (heroSmallTitle) {

        const originalText =
            heroSmallTitle.textContent.trim();


        heroSmallTitle.textContent = "";


        let characterIndex = 0;


        function typeText() {

            if (
                characterIndex <
                originalText.length
            ) {

                heroSmallTitle.textContent +=
                    originalText.charAt(
                        characterIndex
                    );


                characterIndex++;


                setTimeout(
                    typeText,
                    45
                );

            }

        }


        setTimeout(
            typeText,
            900
        );

    }


    /* =====================================================
       HERO BADGE PULSE
    ===================================================== */

    const statusDot =
        document.querySelector(
            ".status-dot"
        );


    if (statusDot) {

        setInterval(
            () => {

                statusDot.classList.toggle(
                    "pulse"
                );

            },
            900
        );

    }


    /* =====================================================
       SCROLL PROGRESS BAR
    ===================================================== */

    const progressBar =
        document.createElement(
            "div"
        );


    progressBar.className =
        "scroll-progress";


    document.body.appendChild(
        progressBar
    );


    function updateScrollProgress() {

        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;


        progressBar.style.width =
            `${progress}%`;

    }


    window.addEventListener(
        "scroll",
        updateScrollProgress
    );


    updateScrollProgress();


    /* =====================================================
       SECTION NUMBER PARALLAX
    ===================================================== */

    const sectionNumbers =
        document.querySelectorAll(
            ".section-number"
        );


    window.addEventListener(
        "scroll",
        () => {

            sectionNumbers.forEach(number => {

                const rect =
                    number.getBoundingClientRect();


                const offset =
                    (window.innerHeight / 2 -
                        rect.top) * 0.03;


                number.style.transform =
                    `translateY(${offset}px)`;

            });

        }
    );


    /* =====================================================
       REDUCE MOTION SUPPORT
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        document.documentElement.style
            .scrollBehavior = "auto";


        revealElements.forEach(element => {

            element.classList.add(
                "scroll-visible"
            );

            element.style.transition =
                "none";

        });

    }


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%c IoT SMART RC CAR ",
        "background:#00e5ff;color:#000;font-size:16px;font-weight:900;padding:8px;"
    );


    console.log(
        "Arduino Uno + HC-05 + HC-SR04 + L298N + Servo"
    );


    console.log(
        "Portfolio by Anubhav verma"
    );

});