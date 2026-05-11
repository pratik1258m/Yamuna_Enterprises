// Global Helper Functions - Defined outside for immediate access by Alpine.js/onclick
window.flipCard = function (id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('flipped');
};

window.openLightbox = function (event, src) {
    if (event) event.stopPropagation();
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    if (lb && lbImg) {
        lbImg.src = src;
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeLightbox = function () {
    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.classList.remove('active');
        document.body.style.overflow = '';
    }
};



(function () {

    // Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    gsap.registerPlugin(ScrollTrigger);

    // Navbar & Scroll Progress
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');

    function updateScrollUI() {
        const scrollTop = lenis.scroll;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollProgress) scrollProgress.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';

        if (navbar) navbar.classList.toggle('scrolled', scrollTop > 40);

        // Active Link Highlighting
        const sections = ['home', 'about', 'products', 'why-us', 'faq', 'contact'];
        let current = 'home';
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el && scrollTop + 200 >= el.offsetTop) current = id;
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }

    lenis.on('scroll', updateScrollUI);
    updateScrollUI();


    // Typed.js
    const typedEl = document.getElementById('typed-strings');
    const typedStrings = typedEl?.textContent.split('^').map(s => s.trim()).filter(s => s.length > 0);
    if (typedStrings && typeof Typed !== 'undefined') {
        new Typed('#typed-output', {
            strings: typedStrings,
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // Swiper
    if (typeof Swiper !== 'undefined') {
        const testimonialSlides = document.querySelectorAll('.testimonial-swiper .swiper-slide').length;
        new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: testimonialSlides > 1,
            autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { 
                    slidesPerView: 3, 
                    spaceBetween: 28,
                    loop: testimonialSlides > 3 // Disable loop on desktop if only 3 slides
                }
            }
        });

        new Swiper('.whyUsSwiper', {
            slidesPerView: 1.2,
            spaceBetween: 20,
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2.2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
            }
        });

        // Product Swiper for Machines
        new Swiper('.productSwiper', {
            slidesPerView: 1.1,
            spaceBetween: 20,
            grabCursor: true,
            centeredSlides: false,
            pagination: {
                el: '.product-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2.2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                }
            }
        });
    }

    // CountUp.js with IntersectionObserver
    const countupObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            if (typeof countUp !== 'undefined' && countUp.CountUp) {
                const cu = new countUp.CountUp(el, target, {
                    duration: 2.2,
                    useEasing: true,
                    easingFn: (t, b, c, d) => c * (1 - Math.pow(2, -10 * t / d)) + b
                });
                if (!cu.error) cu.start();
            } else {
                // Fallback if CountUp fails
                el.innerText = target;
            }
            countupObserver.unobserve(el);
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('[data-countup]').forEach(el => countupObserver.observe(el));

    // GSAP Revelations
    gsap.set('.reveal-item, .hero-image-wrapper, .stat-reveal, .about-image-wrapper, .about-text-wrapper > *, .product-reveal, .feature-item, .process-card, .testimonial-wrapper, .faq-item, .contact-info-wrapper, .contact-form-wrapper', { opacity: 0, y: 30 });

    const reveal = (selector, y = 30, stagger = 0.1, start = 'top 95%') => {
        ScrollTrigger.batch(selector, {
            onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: stagger, ease: 'power2.out', overwrite: true }),
            start: start,
            once: true
        });
    };

    reveal('.reveal-item', 40, 0.12);
    reveal('.hero-image-wrapper', 0, 0);
    reveal('.stat-reveal', 35, 0.1);
    reveal('.about-image-wrapper', 0, 0);
    reveal('.about-text-wrapper > *', 30, 0.1);
    reveal('.product-reveal', 50, 0.1);
    reveal('.feature-item', 40, 0.08);
    reveal('.process-card', 50, 0.15);
    reveal('.testimonial-wrapper', 40, 0);
    reveal('.faq-item', 30, 0.08);
    reveal('.contact-info-wrapper', 0, 0);
    reveal('.contact-form-wrapper', 0, 0);

    // Header specific animations
    ['.products-header', '.why-header', '.process-header', '.testimonial-header', '.faq-header', '.contact-header'].forEach(h => {
        if (document.querySelector(h)) {
            gsap.from(h, { opacity: 0, y: 30, duration: 0.8, scrollTrigger: { trigger: h, start: 'top 95%', once: true } });
        }
    });

    // Refresh ScrollTrigger on load
    window.addEventListener('load', () => {
        setTimeout(() => ScrollTrigger.refresh(), 500);
    });

    // Click-to-flip support (Global)
    document.addEventListener('click', (e) => {
        const wrapper = e.target.closest('.flip-wrapper');
        if (!wrapper) return;
        // Don't flip if clicking interactive elements inside the card
        if (e.target.closest('a') || e.target.closest('button')) return;
        const inner = wrapper.querySelector('.flip-inner');
        if (inner) inner.classList.toggle('flipped');
    });

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = target.getBoundingClientRect().top + lenis.scroll - 90;
                lenis.scrollTo(offset, { duration: 1.2 });
            }
        });
    });

    // Accessibility & Prefers Reduced Motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
        gsap.globalTimeline.timeScale(0.1); // Slow down significantly
        lenis.destroy();
    }

    // FAQ Toggle function (Manual implementation)
    function toggleFaq(btn) {
        const item = btn.closest('.faq-item');
        if (!item) return;
        const isOpen = item.classList.contains('open');

        // Close other open items
        document.querySelectorAll('.faq-item.open').forEach(el => {
            if (el !== item) {
                el.classList.remove('open');
                const t = el.querySelector('.faq-trigger');
                if (t) t.setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle current item
        item.classList.toggle('open');
        btn.setAttribute('aria-expanded', !isOpen);
    }
    window.toggleFaq = toggleFaq;

    // Close lightbox on escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

})();