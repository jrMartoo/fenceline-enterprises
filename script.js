// ============================================
// MOBILE HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
    // Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});
});

// ============================================
// BACK TO TOP
// ============================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// HERO SLIDESHOW - FIXED!
// ============================================
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

// Hide all slides except the first one
function showSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

// Go to next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
    updateDots();
}

// Create dots
const dotsContainer = document.getElementById('slideDots');
if (dotsContainer) {
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
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// Auto-advance every 4 seconds
let slideInterval = setInterval(nextSlide, 4000);

// Pause on hover
const hero = document.getElementById('hero');
hero.addEventListener('mouseenter', () => clearInterval(slideInterval));
hero.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 4000);
});

// Show first slide
showSlide(0);

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
    const totalSlides = slides.length;

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
        const dots = dotsCarousel.querySelectorAll('.dot');
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