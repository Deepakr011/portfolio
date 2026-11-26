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

    const cardImages = Array.from(thumbs, (thumb) => thumb.src);
    if (!cardImages.length) cardImages.push(mainImage.src);
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
            const src = cardImages[index];
            if (!src) return;
            mainImage.src = src;
            galleryButton.dataset.index = index;
            thumbs.forEach((item) => {
                item.parentElement.setAttribute('aria-pressed', String(item === thumb));
            });
        });
    });

    galleryButton.addEventListener('click', () => {
        images = cardImages;
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
