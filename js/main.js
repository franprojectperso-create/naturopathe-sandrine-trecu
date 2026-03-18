/* ============================================================
   SANDRINE TRECU - NATUROPATHE
   JavaScript principal
   ============================================================ */

// Activer les animations CSS uniquement si JS est disponible
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // NAVIGATION STICKY
    // ===========================
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // ===========================
    // MENU MOBILE
    // ===========================
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.nav-mobile');
    const overlay    = document.querySelector('.nav-overlay');

    function toggleMenu(open) {
        hamburger.classList.toggle('open', open);
        mobileMenu.classList.toggle('open', open);
        overlay.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            toggleMenu(!mobileMenu.classList.contains('open'));
        });
    }
    if (overlay)    overlay.addEventListener('click', () => toggleMenu(false));
    if (mobileMenu) mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

    // ===========================
    // ACTIVE NAV LINK
    // ===========================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ===========================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ===========================
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        reveals.forEach(el => revealObserver.observe(el));
    }

    // ===========================
    // SMOOTH SCROLL (ancres)
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = (nav ? nav.offsetHeight : 0) + 20;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });

    // ===========================
    // HERO PARALLAX (léger)
    // ===========================
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            if (y < window.innerHeight) {
                heroContent.style.transform = `translateY(${y * 0.12}px)`;
                heroContent.style.opacity = 1 - (y / window.innerHeight) * 0.6;
            }
        }, { passive: true });
    }

    // ===========================
    // FORMULAIRE DE CONTACT
    // ===========================
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn     = this.querySelector('button[type="submit"]');
            const success = document.getElementById('form-success');
            const origText = btn.textContent;

            // Validation basique
            let valid = true;
            this.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#e05252';
                    valid = false;
                } else {
                    field.style.borderColor = '';
                }
            });
            if (!valid) return;

            btn.textContent = 'Envoi en cours…';
            btn.disabled = true;

            // Simulation d'envoi (à remplacer par votre backend / service mail)
            setTimeout(() => {
                if (success) success.style.display = 'block';
                this.reset();
                btn.textContent = 'Message envoyé ✓';

                setTimeout(() => {
                    btn.textContent = origText;
                    btn.disabled = false;
                    if (success) success.style.display = 'none';
                }, 5000);
            }, 1400);
        });

        // Réinitialise la couleur au focus
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('focus', () => { field.style.borderColor = ''; });
        });
    }

    // ===========================
    // COMPTEUR ANIMÉ (stats)
    // ===========================
    function animateCount(el) {
        const target = parseInt(el.dataset.count, 10);
        const duration = 1400;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;
        const interval = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current + (el.dataset.suffix || '');
            if (current >= target) clearInterval(interval);
        }, 16);
    }

    const counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    countObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(el => countObserver.observe(el));
    }

});
