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