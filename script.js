// ============================================
// MOBILE HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// BACK TO TOP
// ============================================
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 400);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// HERO SLIDESHOW
// ============================================
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function showSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
    updateDots();
}

// Create dots
const dotsContainer = document.getElementById('slideDots');
if (dotsContainer && heroSlides.length > 0) {
    heroSlides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            updateDots();
        });
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// Auto-advance every 4 seconds
let slideInterval = setInterval(nextSlide, 4000);

// Pause on hover
const heroSection = document.getElementById('hero');
if (heroSection) {
    heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSection.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 4000);
    });
}

// Show first slide
if (heroSlides.length > 0) {
    showSlide(0);
}

// ============================================
// GALLERY CAROUSEL
// ============================================
const track = document.getElementById('carouselTrack');
const dotsCarousel = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let carouselIndex = 0;

if (track) {
    const slides = track.querySelectorAll('.carousel-slide');

    // Create dots
    if (dotsCarousel) {
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.dataset.index = index;
            dot.addEventListener('click', () => goToCarousel(index));
            dotsCarousel.appendChild(dot);
        });
    }

    function goToCarousel(index) {
        const dots = dotsCarousel ? dotsCarousel.querySelectorAll('.dot') : [];
        const slideWidth = slides[0].getBoundingClientRect().width;

        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        track.style.transform = `translateX(-${index * slideWidth}px)`;
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
        carouselIndex = index;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToCarousel(carouselIndex - 1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToCarousel(carouselIndex + 1));
    }

    // Auto-advance carousel
    let carouselInterval = setInterval(() => goToCarousel(carouselIndex + 1), 5000);

    const carouselWrapper = document.querySelector('.carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => clearInterval(carouselInterval));
        carouselWrapper.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(() => goToCarousel(carouselIndex + 1), 5000);
        });
    }

    // Recalculate on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${carouselIndex * slideWidth}px)`;
        }, 200);
    });

    // Show first slide
    goToCarousel(0);
}

// ============================================
// QUOTE FORM
// ============================================
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = quoteForm.querySelector('input[placeholder="Full Name"]')?.value || 'Customer';
        alert(`Thank you, ${name}! We'll get back to you within 24 hours.`);
        quoteForm.reset();
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
const hiddenElements = document.querySelectorAll('.scroll-hidden');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

hiddenElements.forEach((el) => observer.observe(el));

// ============================================
// SCROLL PROGRESS BAR
// ============================================
const progressBar = document.getElementById('scrollProgress');

if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// ============================================
// PARALLAX EFFECT ON HERO
// ============================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
       const scrolled = window.scrollY;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});
