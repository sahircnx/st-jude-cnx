export default function decorate(block) {
    const cards = [...block.children];
    if (!cards.length) return;

    // Build carousel structure
    const wrapper = document.createElement('div');
    wrapper.className = 'story-carousel-wrapper';

    const track = document.createElement('div');
    track.className = 'story-carousel-track';

    cards.forEach((card) => {
        const slide = document.createElement('div');
        slide.className = 'story-carousel-slide';

        const imageDiv = card.children[0];
        const contentDiv = card.children[1];

        if (imageDiv) imageDiv.className = 'story-carousel-image';
        if (contentDiv) contentDiv.className = 'story-carousel-content';

        // Style the CTA link
        if (contentDiv) {
            const lastP = [...contentDiv.querySelectorAll('p')].pop();
            if (lastP) {
                const link = lastP.querySelector('a');
                if (link) {
                    lastP.className = 'story-carousel-cta';
                }
            }
        }

        while (card.firstElementChild) slide.append(card.firstElementChild);
        track.append(slide);
    });

    wrapper.append(track);

    // Navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'story-carousel-prev';
    prevBtn.setAttribute('aria-label', 'Previous');
    prevBtn.innerHTML = '<svg width="14" height="24" viewBox="0 0 14 24" fill="none"><path d="M12 2L2 12L12 22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'story-carousel-next';
    nextBtn.setAttribute('aria-label', 'Next');
    nextBtn.innerHTML = '<svg width="14" height="24" viewBox="0 0 14 24" fill="none"><path d="M2 2L12 12L2 22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    // Carousel state
    let currentIndex = 0;
    const totalSlides = track.children.length;

    function updateCarousel(animate = true) {
        const slideEl = track.querySelector('.story-carousel-slide');
        if (!slideEl) return;
        const slideWidth = slideEl.offsetWidth;
        const gap = 24;
        const offset = currentIndex * (slideWidth + gap);
        track.style.transition = animate ? 'transform 0.4s ease' : 'none';
        track.style.transform = `translateX(-${offset}px)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex <= 0 ? totalSlides - 1 : currentIndex - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex >= totalSlides - 1 ? 0 : currentIndex + 1;
        updateCarousel();
    });

    // Touch/swipe support
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextBtn.click();
            } else {
                prevBtn.click();
            }
        }
        isDragging = false;
    }, { passive: true });

    block.textContent = '';
    block.append(prevBtn, wrapper, nextBtn);

    // Initialize
    updateCarousel(false);
    window.addEventListener('resize', () => updateCarousel(false));
}
