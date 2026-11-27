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

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll('.project-card').forEach((card, cardIndex) => {
    const paragraphs = [...card.querySelectorAll('.project-desc')];
    const length = paragraphs.reduce((total, paragraph) => total + paragraph.textContent.length, 0);
    if (length > 200) {
        const description = document.createElement('div');
        description.className = 'project-description';
        description.id = 'project-description-' + cardIndex;
        paragraphs[0].before(description);
        description.append(...paragraphs);

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'description-toggle';
        toggle.setAttribute('aria-controls', description.id);
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'View full description';
        description.after(toggle);
        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'false';
            toggle.setAttribute('aria-expanded', String(expanded));
            toggle.textContent = expanded ? 'Show less' : 'View full description';
            description.classList.toggle('expanded', expanded);
        });
    }

    const media = card.querySelector('.project-image');
    const mainImage = media?.querySelector('img');
    const galleryButton = media?.querySelector('.gallery-btn');
    if (!mainImage || !galleryButton) return;

    const thumbnails = [...card.querySelectorAll('.thumb')];
    const cardImages = thumbnails.map((thumbnail) => thumbnail.src);
    if (!cardImages.length) cardImages.push(mainImage.src);
    const cardVideos = [...card.querySelectorAll('.video-link')].map((link) => link.href);
    const slides = [
        ...cardImages.map((src, index) => ({ src, imageIndex: index })),
        ...cardVideos.map((src) => ({ src }))
    ];
    const preview = document.createElement('video');
    preview.className = 'project-preview';
    preview.muted = true;
    preview.playsInline = true;
    preview.loop = true;
    preview.preload = 'none';
    preview.hidden = true;
    preview.setAttribute('aria-hidden', 'true');

    let position = 0;
    let lastImage = 0;
    let visible = false;
    let hovered = false;
    let paused = reducedMotion.matches;
    let timer;

    function showSlide(index) {
        position = index;
        const slide = slides[position];
        const isImage = slide.imageIndex !== undefined;
        mainImage.hidden = !isImage;
        preview.hidden = isImage;
        if (isImage) {
            lastImage = slide.imageIndex;
            mainImage.src = slide.src;
            if (preview.hasAttribute('src')) {
                preview.pause();
                preview.removeAttribute('src');
                preview.load();
            }
        } else {
            if (preview.src !== slide.src) preview.src = slide.src;
        }
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.parentElement.setAttribute('aria-pressed', String(isImage && index === lastImage));
        });
    }

    function schedule() {
        clearTimeout(timer);
        if (!visible || paused || document.hidden || gallery.open || videoDialog.open || hovered || media.contains(document.activeElement)) {
            if (!preview.hidden) preview.pause();
            return;
        }
        if (!preview.hidden) preview.play().catch(() => {});
        timer = setTimeout(() => {
            showSlide((position + 1) % slides.length);
            schedule();
        }, 5000);
    }

    thumbnails.forEach((thumbnail, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'thumb-button';
        button.setAttribute('aria-label', 'Show image ' + (index + 1));
        button.setAttribute('aria-pressed', String(index === 0));
        thumbnail.replaceWith(button);
        button.append(thumbnail);
        button.addEventListener('click', () => {
            showSlide(index);
            schedule();
        });
    });

    galleryButton.addEventListener('click', () => {
        images = cardImages;
        imageDescription = mainImage.alt;
        showImage(lastImage);
        gallery.showModal();
        document.dispatchEvent(new Event('portfolio-media-change'));
    });

    if (slides.length < 2 || !('IntersectionObserver' in window)) return;

    media.prepend(preview);
    const rotation = document.createElement('button');
    rotation.type = 'button';
    rotation.className = 'rotation-toggle';
    function updateRotationLabel() {
        rotation.textContent = paused ? 'Play rotation' : 'Pause rotation';
    }
    updateRotationLabel();
    media.querySelector('.project-overlay').prepend(rotation);
    rotation.addEventListener('click', () => {
        paused = !paused;
        updateRotationLabel();
        schedule();
    });
    media.addEventListener('mouseenter', () => { hovered = true; schedule(); });
    media.addEventListener('mouseleave', () => { hovered = false; schedule(); });
    media.addEventListener('focusin', schedule);
    media.addEventListener('focusout', () => setTimeout(schedule, 0));
    document.addEventListener('visibilitychange', schedule);
    document.addEventListener('portfolio-media-change', schedule);
    reducedMotion.addEventListener('change', (event) => {
        paused = event.matches;
        updateRotationLabel();
        schedule();
    });
    new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        schedule();
    }, { threshold: 0.25 }).observe(media);
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
        document.dispatchEvent(new Event('portfolio-media-change'));
    });
});
document.getElementById('video-modal-close').addEventListener('click', () => videoDialog.close());
videoDialog.addEventListener('close', () => {
    video.pause();
    video.removeAttribute('src');
    video.load();
    document.dispatchEvent(new Event('portfolio-media-change'));
});

gallery.addEventListener('close', () => document.dispatchEvent(new Event('portfolio-media-change')));
