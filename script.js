// ==================== NAVBAR ====================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('.section, .hero');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== COUNTER ANIMATION ====================
const statNumbers = document.querySelectorAll('.stat-number');
let countersStarted = false;

function animateCounters() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + '+';
            }
        };
        updateCounter();
    });
}

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            animateCounters();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

// ==================== FILTER TABS ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'none';
                card.offsetHeight;
                card.style.animation = `fadeInUp 0.5s ease ${index * 0.05}s forwards`;
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ==================== THUMBNAIL GALLERY ====================
const projectImages = {
    'agriculture': [
        'images/agriculture/IMG_2433.jpg',
        'images/agriculture/IMG_1795.jpg',
        'images/agriculture/IMG_1791.jpg',
        'images/agriculture/IMG_2434.jpg',
        'images/agriculture/IMG_2454.jpg'
    ],
    'innovation': [
        'images/innovation/IMG_2592.jpg',
        'images/innovation/IMG_2591.jpg',
        'images/innovation/IMG_1718.jpg',
        'images/innovation/IMG_1717.jpg',
        'images/innovation/IMG_1714.jpg',
        'images/innovation/IMG_1708.jpg',
        'images/innovation/IMG_1675.jpg',
        'images/innovation/IMG_1526.jpg'
    ],
    'christy-ai': [
        'images/products/christy-ai/IMG_2322.jpg',
        'images/products/christy-ai/IMG_2271.jpg',
        'images/products/christy-ai/IMG_2224.jpg',
        'images/products/christy-ai/IMG_2219.jpg',
        'images/products/christy-ai/IMG_2218.jpg',
        'images/products/christy-ai/B7ACEF3C-C9D5-46B1-8D0E-884588A011C7.jpg'
    ],
    'ayurvedic': [
        'images/products/ayurvedic/07462d84-5c67-4916-afb8-1d735f685ebf.jpg',
        'images/products/ayurvedic/36E498A6-B053-469D-A266-6E15897FCF07.jpg',
        'images/products/ayurvedic/IMG_2385.jpg',
        'images/products/ayurvedic/IMG_2388.jpg',
        'images/products/ayurvedic/0A4E623B-61DE-446B-B946-6E0C2550202E.jpg',
        'images/products/ayurvedic/9aa29d40-de13-463e-b1ee-2a851f0b7e68.jpg',
        'images/products/ayurvedic/8BD70BD9-9731-49EE-A45C-8CBB4AC82CBB.jpg',
        'images/products/ayurvedic/IMG_2337.jpg',
        'images/products/ayurvedic/IMG_2386.jpg',
        'images/products/ayurvedic/6beef1e7-09a6-4792-b2c8-1893601cf0d0.jpg',
        'images/products/ayurvedic/4863d265-38e9-43a4-9f7c-6feed5f39a7b.jpg'
    ],
    'nir-soil': [
        'images/products/nir-soil/IMG_2345.jpg',
        'images/products/nir-soil/IMG_2354.jpg',
        'images/products/nir-soil/IMG_2354b.jpg',
        'images/products/nir-soil/IMG_2355.jpg',
        'images/products/nir-soil/IMG_2356.jpg',
        'images/products/nir-soil/IMG_2356b.jpg',
        'images/products/nir-soil/IMG_2534.jpg',
        'images/products/nir-soil/IMG_2535.jpg',
        'images/products/nir-soil/IMG_2535b.jpg',
        'images/products/nir-soil/IMG_2536.jpg'
    ],
    'gmit-ai-lab': [
        'images/products/gmit-ai-lab/IMG_2423.jpg',
        'images/products/gmit-ai-lab/IMG_2424.jpg',
        'images/products/gmit-ai-lab/IMG_2426.jpg'
    ],
    'hydroponic': [
        'images/products/hydroponic/IMG_0023.jpg'
    ],
    'jnnc-hydroponic': [
        'images/products/jnnc-hydroponic/IMG_1279.jpg',
        'images/products/jnnc-hydroponic/IMG_1276.jpg',
        'images/products/jnnc-hydroponic/IMG_1191.jpg',
        'images/products/jnnc-hydroponic/IMG_1228.jpg'
    ],
    'rfid-telephone': [
        'images/products/rfid-telephone/IMG_1716.jpg',
        'images/products/rfid-telephone/IMG_1715.jpg',
        'images/products/rfid-telephone/IMG_1455.jpg',
        'images/products/rfid-telephone/IMG_1442.jpg',
        'images/products/rfid-telephone/3FAB22F2-B22F-4BB9-940B-FE4F29ED3029.jpg'
    ],
    'aiota-iot': [
        'images/products/aiota-iot/IMG_1730.jpg',
        'images/products/aiota-iot/IMG_1732.jpg',
        'images/products/aiota-iot/IMG_1735.jpg',
        'images/products/aiota-iot/IMG_1739.jpg',
        'images/products/aiota-iot/IMG_1764.jpg'
    ],
    'final-year': [
        'images/prototypes/final-year/IMG20241212220853.jpg',
        'images/prototypes/final-year/IMG20240714113109.jpg',
        'images/prototypes/final-year/IMG20241218111840.jpg',
        'images/prototypes/final-year/IMG20250124162955.jpg',
        'images/prototypes/final-year/IMG20241212134922.jpg',
        'images/prototypes/final-year/IMG20241212134922b.jpg',
        'images/prototypes/final-year/IMG20241206220602.jpg',
        'images/prototypes/final-year/IMG20240625235150.jpg',
        'images/prototypes/final-year/IMG20241212220853b.jpg',
        'images/prototypes/final-year/IMG20241220234907.jpg',
        'images/prototypes/final-year/IMG20250124163009.jpg'
    ],
    'vehicle-plate': [
        'images/prototypes/vehicle-plate/IMG_1178.jpg',
        'images/prototypes/vehicle-plate/IMG_1177.jpg',
        'images/prototypes/vehicle-plate/IMG_1168.jpg'
    ],
    'forest-security': [
        'images/prototypes/forest-security/IMG_1477.jpg',
        'images/prototypes/forest-security/IMG_1476.jpg',
        'images/prototypes/forest-security/IMG_1480.jpg',
        'images/prototypes/forest-security/IMG_1481.jpg'
    ],
    'cable-fault': [
        'images/prototypes/cable-fault/IMG_1499.jpg',
        'images/prototypes/cable-fault/IMG_1496.jpg',
        'images/prototypes/cable-fault/IMG_1494.png',
        'images/prototypes/cable-fault/IMG_1492.png'
    ],
    'medical-drip': [
        'images/prototypes/medical-drip/IMG_0844.jpg',
        'images/prototypes/medical-drip/IMG_0843.jpg',
        'images/prototypes/medical-drip/IMG_0845.jpg',
        'images/prototypes/medical-drip/IMG_0851.jpg'
    ],
    'silk-worm': [
        'images/prototypes/silk-worm/IMG_1501.jpg',
        'images/prototypes/silk-worm/IMG_1500.jpg'
    ]
};

// Thumbnail click - update main image
document.querySelectorAll('.thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        const thumbsContainer = thumb.closest('.project-gallery-thumbs');
        const project = thumbsContainer.getAttribute('data-project');
        const index = parseInt(thumb.getAttribute('data-index'));
        const card = thumb.closest('.project-card');
        const mainImg = card.querySelector('.project-image img');

        thumbsContainer.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');

        const images = projectImages[project];
        if (images && images[index]) {
            mainImg.src = images[index];
        }
    });
});

// ==================== LIGHTBOX ====================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxCounter = document.getElementById('lightbox-counter');

let currentProject = '';
let currentIndex = 0;

function openLightbox(project, index) {
    currentProject = project;
    currentIndex = index;
    const images = projectImages[project];
    if (images && images[index]) {
        lightboxImg.src = images[index];
        lightboxCounter.textContent = `${index + 1} / ${images.length}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    const images = projectImages[currentProject];
    if (!images) return;

    currentIndex = (currentIndex + direction + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
    lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
}

document.querySelectorAll('.gallery-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const project = btn.getAttribute('data-project');
        const index = parseInt(btn.getAttribute('data-index'));
        openLightbox(project, index);
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
lightboxNext.addEventListener('click', () => navigateLightbox(1));

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

// ==================== VIDEO MODAL ====================
const videoModal = document.getElementById('video-modal');
const videoPlayer = document.getElementById('video-player');
const videoModalClose = document.getElementById('video-modal-close');

function openVideo(src) {
    if (!videoModal || !videoPlayer) return;
    videoPlayer.src = src;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    if (!videoModal) return;
    videoPlayer.pause();
    videoPlayer.removeAttribute('src');
    videoPlayer.load();
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('.video-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openVideo(link.getAttribute('data-src'));
    });
});

if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
}

if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) closeVideoModal();
    });
}

document.addEventListener('keydown', (e) => {
    if (videoModal && videoModal.classList.contains('active') && e.key === 'Escape') {
        closeVideoModal();
    }
});

// ==================== BACK TO TOP ====================
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== SCROLL REVEAL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

projectCards.forEach(card => scrollObserver.observe(card));

// ==================== PARTICLES ====================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(108, 92, 231, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 4}s;
        `;
        container.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
            50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

createParticles();
