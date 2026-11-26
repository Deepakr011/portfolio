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
    ]
};

const filterGroup = document.querySelector('.filter-tabs');
const filters = filterGroup.querySelectorAll('button');
const projects = document.querySelectorAll('#projects .project-card');
const filterStatus = document.getElementById('filter-status');

filterGroup.hidden = false;
filterGroup.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;

    filters.forEach((filter) => {
        filter.setAttribute('aria-pressed', String(filter === button));
    });

    let count = 0;
    projects.forEach((project) => {
        const matches = button.dataset.filter === 'all' || project.dataset.category === button.dataset.filter;
        project.hidden = !matches;
        if (matches) count++;
    });
    filterStatus.textContent = count + ' projects shown';
});

const gallery = document.getElementById('lightbox');
const galleryImage = document.getElementById('lightbox-img');
const galleryCounter = document.getElementById('lightbox-counter');
const videoDialog = document.getElementById('video-modal');
const video = document.getElementById('video-player');
let images = [];
let imageIndex = 0;
let imageDescription = '';

function showImage(index) {
    imageIndex = (index + images.length) % images.length;
    galleryImage.src = images[imageIndex];
    galleryImage.alt = imageDescription + ', image ' + (imageIndex + 1);
    galleryCounter.textContent = (imageIndex + 1) + ' / ' + images.length;
}

document.querySelectorAll('.project-card').forEach((card) => {
    const mainImage = card.querySelector('.project-image img');
    const galleryButton = card.querySelector('.gallery-btn');
    const thumbs = card.querySelectorAll('.thumb');
    if (!mainImage || !galleryButton) return;

    const project = galleryButton.dataset.project;
    thumbs.forEach((thumb) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'thumb-button';
        button.setAttribute('aria-label', 'Show image ' + (Number(thumb.dataset.index) + 1));
        button.setAttribute('aria-pressed', String(thumb.classList.contains('active')));
        thumb.replaceWith(button);
        button.append(thumb);

        button.addEventListener('click', () => {
            const index = Number(thumb.dataset.index);
            const src = projectImages[project]?.[index];
            if (!src) return;
            mainImage.src = src;
            galleryButton.dataset.index = index;
            thumbs.forEach((item) => {
                item.parentElement.setAttribute('aria-pressed', String(item === thumb));
            });
        });
    });

    galleryButton.addEventListener('click', () => {
        images = projectImages[project];
        if (!images?.length) return;
        imageDescription = mainImage.alt;
        showImage(Number(galleryButton.dataset.index));
        gallery.showModal();
    });
});

document.getElementById('lightbox-close').addEventListener('click', () => gallery.close());
document.getElementById('lightbox-prev').addEventListener('click', () => showImage(imageIndex - 1));
document.getElementById('lightbox-next').addEventListener('click', () => showImage(imageIndex + 1));
gallery.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showImage(imageIndex - 1);
    if (event.key === 'ArrowRight') showImage(imageIndex + 1);
});

document.querySelectorAll('.video-link').forEach((link) => {
    link.addEventListener('click', (event) => {
        if (typeof videoDialog.showModal !== 'function') return;
        event.preventDefault();
        video.src = link.dataset.src;
        videoDialog.showModal();
    });
});
document.getElementById('video-modal-close').addEventListener('click', () => videoDialog.close());
videoDialog.addEventListener('close', () => {
    video.pause();
    video.removeAttribute('src');
    video.load();
});
