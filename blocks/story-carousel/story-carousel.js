export default function decorate(block) {
    const rows = [...block.children];
    if (rows.length < 2) return;

    // Row 0: section heading
    const headingRow = rows[0];
    const headingText = headingRow.textContent.trim();

    // Rows 1+: story slides
    const slideData = rows.slice(1).map((row) => {
        const cells = [...row.children];
        const imageCell = cells[0];
        const contentCell = cells[1];

        const picture = imageCell ? imageCell.querySelector('picture') : null;
        const img = picture ? picture.querySelector('img') : null;

        const heading = contentCell ? contentCell.querySelector('h3') : null;
        const paragraphs = contentCell ? [...contentCell.querySelectorAll('p')] : [];
        const link = contentCell ? contentCell.querySelector('a') : null;

        // Determine quote, attribution, and CTA from paragraphs
        let quote = '';
        let attribution = '';
        let ctaText = '';
        let ctaHref = '#';

        paragraphs.forEach((p) => {
            const anchor = p.querySelector('a');
            if (anchor) {
                ctaText = anchor.textContent.trim();
                ctaHref = anchor.href || '#';
            } else if (!quote) {
                quote = p.textContent.trim();
            } else {
                attribution = p.textContent.trim();
            }
        });

        // Fallback: if link found outside paragraphs
        if (!ctaText && link) {
            ctaText = link.textContent.trim();
            ctaHref = link.href || '#';
        }

        return {
            picture,
            img,
            heading: heading ? heading.textContent.trim() : '',
            quote,
            attribution,
            ctaText,
            ctaHref,
        };
    });

    // Clear block
    block.textContent = '';

    // Section heading
    const sectionHeading = document.createElement('h2');
    sectionHeading.classList.add('story-carousel-heading');
    sectionHeading.textContent = headingText;
    block.append(sectionHeading);

    // Carousel container
    const carousel = document.createElement('div');
    carousel.classList.add('story-carousel-viewport');

    // Slides track
    const track = document.createElement('div');
    track.classList.add('story-carousel-track');

    slideData.forEach((slide) => {
        const slideEl = document.createElement('div');
        slideEl.classList.add('story-carousel-slide');

        // Image half
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('story-carousel-slide-image');
        if (slide.picture) {
            imageWrapper.append(slide.picture);
        } else if (slide.img) {
            imageWrapper.append(slide.img);
        }

        // Content half
        const content = document.createElement('div');
        content.classList.add('story-carousel-slide-content');

        if (slide.heading) {
            const h3 = document.createElement('h3');
            h3.textContent = slide.heading;
            content.append(h3);
        }

        if (slide.quote) {
            const quoteP = document.createElement('p');
            quoteP.classList.add('story-carousel-quote');
            quoteP.textContent = slide.quote;
            content.append(quoteP);
        }

        if (slide.attribution) {
            const attrP = document.createElement('p');
            attrP.classList.add('story-carousel-attribution');
            attrP.textContent = slide.attribution;
            content.append(attrP);
        }

        if (slide.ctaText) {
            const cta = document.createElement('a');
            cta.classList.add('story-carousel-cta');
            cta.href = slide.ctaHref;
            cta.textContent = slide.ctaText;
            content.append(cta);
        }

        slideEl.append(imageWrapper);
        slideEl.append(content);
        track.append(slideEl);
    });

    carousel.append(track);

    // Arrow buttons
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('story-carousel-arrow', 'story-carousel-arrow-prev');
    prevBtn.setAttribute('aria-label', 'Previous slide');
    prevBtn.textContent = '\u2039';

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('story-carousel-arrow', 'story-carousel-arrow-next');
    nextBtn.setAttribute('aria-label', 'Next slide');
    nextBtn.textContent = '\u203A';

    carousel.append(prevBtn);
    carousel.append(nextBtn);
    block.append(carousel);

    // Carousel logic
    let currentIndex = 0;
    const totalSlides = slideData.length;

    function updateSlide() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlide();
    });
}
