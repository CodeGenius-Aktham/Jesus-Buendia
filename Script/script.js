/**
 * ARCHIVO DE LÓGICA PRINCIPAL - LANDING PAGE PROFESIONAL
 * Tecnologías: GSAP, ScrollTrigger, SplitType, Intersection Observer
 */

// --- 1. CONFIGURACIÓN Y ESTADO GLOBAL ---
const CONFIG = {
    palabras: ["Economía Aplicada", "Marketing Estratégico", "Comercio B2B", "Crecimiento Empresarial"],
    velEscritura: 70,
    velBorrado: 35,
    pausaPalabra: 2800
};

let currentWordIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

// --- 2. EFECTO TYPING (Hero Section) ---
function typeEffect() {
    const textElement = document.getElementById("changing-text");
    if (!textElement) return;

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

// --- 3. GESTIÓN DE NAVEGACIÓN Y SCROLL ---
function handleNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (current && link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// --- 4. SISTEMA DE PARTÍCULAS (Canvas Vision 360) ---
const particleSystem = {
    canvas: null,
    ctx: null,
    particles: [],
    
    init() {
        this.canvas = document.getElementById('vision-360-particles');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    },

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.particles = Array.from({ length: 120 }, () => ({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.5 + 0.2
        }));
    },

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.x < 0) p.x = this.canvas.width;
            if (p.y > this.canvas.height) p.y = 0;
            if (p.y < 0) p.y = this.canvas.height;

            this.ctx.fillStyle = `rgba(53, 84, 207, ${p.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        requestAnimationFrame(() => this.animate());
    }
};

// --- 5. ANIMACIONES GSAP (ScrollTrigger) ---
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Timeline Hero Sticky
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

    if (document.querySelector(".dark-method-title")) {
        tl.to(".dark-method-title", { scale: 0.4, opacity: 0, filter: "blur(20px)", duration: 2 })
          .to(".card", { opacity: 1, scale: 1, stagger: 0.2, duration: 1.5 }, "-=1")
          .to(".hero-description", { opacity: 1, y: 0, duration: 1 })
          .addLabel("exit")
          .to(".card-1", { x: -300, y: -300, opacity: 0, duration: 1.5 }, "exit")
          .to(".card-2", { x: 300, y: -300, opacity: 0, duration: 1.5 }, "exit")
          .to(".card-3", { x: -300, y: 300, opacity: 0, duration: 1.5 }, "exit")
          .to(".card-4", { x: 300, y: 300, opacity: 0, duration: 1.5 }, "exit")
          .to(".hero-description", { opacity: 0, scale: 0.9, duration: 1 }, "exit")
          .to(".ready-section", { backgroundColor: "#07061a", duration: 1 }, "exit");
    }

    // Animación Métricas (Barras)
    gsap.to(".bar-fill", {
        scrollTrigger: { trigger: ".results-visual", start: "top 70%" },
        width: (i, el) => el.getAttribute('data-width'),
        duration: 2,
        stagger: 0.2,
        ease: "power4.out"
    });

    // Contadores Numéricos GSAP para sección resultados
    gsap.from(".counter", {
        scrollTrigger: { trigger: ".results-section", start: "top 70%" },
        textContent: 0,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        stagger: 0.2
    });

    // Intro Hero Text (SplitType)
    if (document.querySelector('#main-title')) {
        const title = new SplitType('#main-title', { types: 'chars' });
        gsap.to(title.chars, {
            opacity: 1, y: 0, rotateX: 0, stagger: 0.04, duration: 1.2, ease: "expo.out", delay: 0.2
        });
        gsap.to('#main-desc', { opacity: 1, y: 0, duration: 1, delay: 0.8 });
    }
}

// --- 6. LÓGICA ESPECÍFICA "SOBRE MI" (Intersection Observer & Numbers) ---
function initSobreMi() {
    // Definir variables de color si no están en el CSS para asegurar que funcionen
    document.documentElement.style.setProperty('--sobremi-accent', '#006aff');
    document.documentElement.style.setProperty('--sobremi-dark', '#07061a');
    document.documentElement.style.setProperty('--sobremi-gray', '#f8f9fa');
    document.documentElement.style.setProperty('--sobremi-border', '#eee');

    // Función de contador para los números de impacto
    const startCounter = (el) => {
        const target = parseInt(el.getAttribute('data-val'));
        if (isNaN(target)) return;
        
        let current = 0;
        const duration = 2000; // 2 segundos
        const stepTime = 30;
        const increment = target / (duration / stepTime);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target + (target > 50 ? '+' : '');
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, stepTime);
    };

    // Observer para revelación de elementos y disparo de contadores
    const sobreMiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('sobremi-visible');
                
                // Buscar contadores dentro del elemento revelado
                const counters = entry.target.querySelectorAll('.sobremi-counter, .sobremi-impact-item h3');
                counters.forEach(counter => {
                    if (!counter.dataset.started) {
                        counter.dataset.started = "true";
                        startCounter(counter);
                    }
                });
            }
        });
    }, { threshold: 0.15 });

    // Observar secciones y elementos de impacto
    document.querySelectorAll('.sobremi-reveal, .sobremi-impact-item, .sobremi-value-card').forEach(el => {
        sobreMiObserver.observe(el);
    });
}

// --- 7. INICIALIZACIÓN ---
window.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    particleSystem.init();
    initGSAPAnimations();
    initSobreMi();
    
    // Parallax mouse para el canvas
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        const canvas = document.getElementById('vision-360-particles');
        if (canvas) gsap.to(canvas, { x: x, y: y, duration: 2.5, ease: "sine.out" });
    });
});

window.addEventListener('scroll', () => {
    handleNavigation();
    
    // Parallax suave para el texto gigante de fondo (.sobremi-hero-bg-text)
    const bgText = document.querySelector('.sobremi-hero-bg-text');
    if (bgText) {
        const scroll = window.pageYOffset;
        bgText.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.15}px))`;
    }
});