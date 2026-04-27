 const CONFIG = {
            palabras: ["Economía Aplicada", "Marketing Estratégico", "Comercio B2B", "Crecimiento Empresarial"],
            velEscritura: 70,
            velBorrado: 35,
            pausaPalabra: 2800
        };

        let currentWordIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        const textElement = document.getElementById("changing-text");

        function typeEffect() {
            const currentFullWord = CONFIG.palabras[currentWordIndex];
            
            if (isDeleting) {
                textElement.textContent = currentFullWord.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                textElement.textContent = currentFullWord.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }

            let typeSpeed = isDeleting ? CONFIG.velBorrado : CONFIG.velEscritura;

            if (!isDeleting && currentCharIndex === currentFullWord.length) {
                typeSpeed = CONFIG.pausaPalabra;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentWordIndex = (currentWordIndex + 1) % CONFIG.palabras.length;
                typeSpeed = 400;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        window.addEventListener('DOMContentLoaded', () => {
            setTimeout(typeEffect, 1000);
        });

        // Efecto scroll para links activos
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });


    gsap.registerPlugin(ScrollTrigger);

        // Timeline principal
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-sticky-section",
                start: "top top",
                end: "+=350%", 
                pin: true,
                scrub: 1,
                anticipatePin: 1
            }
        });

        // 1. Título sale
        tl.to(".dark-method-title", {
            scale: 0.4,
            opacity: 0,
            filter: "blur(20px)",
            duration: 2
        })
        
        // 2. Entran tarjetas
        .to(".card", {
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            duration: 1.5
        }, "-=1")

        // 3. Entra descripción central
        .to(".hero-description", {
            opacity: 1,
            y: 0,
            duration: 1
        })

        // 4. Salida de tarjetas y descripción (Despejar para la siguiente sección)
        .to(".card-1", { x: -300, y: -300, opacity: 0, duration: 1.5 }, "exit")
        .to(".card-2", { x: 300, y: -300, opacity: 0, duration: 1.5 }, "exit")
        .to(".card-3", { x: -300, y: 300, opacity: 0, duration: 1.5 }, "exit")
        .to(".card-4", { x: 300, y: 300, opacity: 0, duration: 1.5 }, "exit")
        .to(".hero-description", { opacity: 0, scale: 0.9, duration: 1 }, "exit")

        // 5. Transición a la sección final (Revelar elementos de la ready-section)
        .to(".ready-section", {
            backgroundColor: "#07061a",
            duration: 1
        }, "exit")
        
        // Animaciones de la sección final disparadas por el scroll de la principal
        const tlFinal = gsap.timeline({
            scrollTrigger: {
                trigger: ".ready-section",
                start: "top center",
                toggleActions: "play none none reverse"
            }
        });

        tlFinal.to(".ready-subtitle", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        })
        .to(".cta-button", {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.4");


        // Asegúrate de tener cargados GSAP y ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Animación de las Barras de Métricas
gsap.to(".bar-fill", {
    scrollTrigger: {
        trigger: ".results-visual",
        start: "top 70%", // Se activa cuando el elemento está al 70% del viewport
    },
    width: (i, el) => el.getAttribute('data-width'), // Toma el valor del atributo data-width
    duration: 2,
    stagger: 0.2,
    ease: "power4.out"
});

// 2. Animación de los Contadores Numéricos (+310%, -65%)
gsap.from(".counter", {
    scrollTrigger: {
        trigger: ".results-section",
        start: "top 70%",
    },
    textContent: 0,
    duration: 2,
    ease: "power2.out",
    snap: { textContent: 1 }, // Asegura que el contador use números enteros
    stagger: 0.2,
    onUpdate: function() {
        // Opcional: Si necesitas añadir prefijos/sufijos dinámicamente durante la animación
        // este bloque puede manejar el formato del texto.
    }
});