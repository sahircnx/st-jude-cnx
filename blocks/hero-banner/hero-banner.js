export default function decorate(block) {
    const rows = [...block.children];

    // --- Parse authored content from block table ---
    let backgroundPicture = null;
    let headingText = '';
    const ctas = [];
    let teaserLink = null;

    if (rows.length > 0) {
        const firstRow = rows[0];
        const cells = [...firstRow.children];

        // Cell 0: background image (picture/img)
        if (cells[0]) {
            const pic = cells[0].querySelector('picture');
            if (pic) {
                backgroundPicture = pic;
            } else {
                const img = cells[0].querySelector('img');
                if (img) {
                    backgroundPicture = img;
                }
            }
        }

        // Cell 1: heading text (H1)
        if (cells[1]) {
            const h1 = cells[1].querySelector('h1');
            if (h1) {
                headingText = h1.textContent.trim();
            } else {
                headingText = cells[1].textContent.trim();
            }
        }
    }

    // Row 1+: CTA links
    rows.slice(1).forEach((row) => {
        const cells = [...row.children];
        cells.forEach((cell) => {
            const anchor = cell.querySelector('a');
            if (anchor) {
                ctas.push({ href: anchor.href, text: anchor.textContent.trim() });
            } else {
                const text = cell.textContent.trim();
                if (text) {
                    teaserLink = { href: '#', text };
                }
            }
        });
    });

    // If last CTA cell was plain text, treat as teaser
    if (ctas.length > 3 && !teaserLink) {
        teaserLink = ctas.pop();
    }

    // --- Fallback defaults ---
    if (!headingText) {
        headingText = 'Finding cures. Saving children.';
    }
    if (ctas.length === 0) {
        ctas.push(
            { href: '/refer-a-patient', text: 'Refer a Patient' },
            { href: '/research', text: 'Explore Our Research' },
            { href: '/donate', text: 'Donate Now' },
        );
    }

    // --- Build hero structure ---
    block.textContent = '';

    // Hero image section
    const heroImageWrapper = document.createElement('div');
    heroImageWrapper.className = 'hero-banner-image-wrapper';

    if (backgroundPicture) {
        const cloned = backgroundPicture.cloneNode(true);
        if (cloned.tagName === 'PICTURE') {
            const img = cloned.querySelector('img');
            if (img) {
                img.className = 'hero-banner-bg';
                img.setAttribute('loading', 'eager');
            }
        } else {
            cloned.className = 'hero-banner-bg';
            cloned.setAttribute('loading', 'eager');
        }
        heroImageWrapper.appendChild(cloned);
    }

    // Semi-transparent heading overlay
    const headingOverlay = document.createElement('div');
    headingOverlay.className = 'hero-banner-heading-overlay';

    const h1 = document.createElement('h1');
    h1.className = 'hero-banner-heading';
    h1.textContent = headingText;
    headingOverlay.appendChild(h1);

    heroImageWrapper.appendChild(headingOverlay);
    block.appendChild(heroImageWrapper);

    // CTA bar below hero image
    const ctaBar = document.createElement('div');
    ctaBar.className = 'hero-banner-cta-bar';

    ctas.forEach((cta, index) => {
        const a = document.createElement('a');
        a.href = cta.href;
        a.textContent = cta.text;
        a.className = 'hero-banner-cta';

        if (index < 2) {
            a.classList.add('hero-banner-cta-blue');
        } else if (index === 2) {
            a.classList.add('hero-banner-cta-red');
        }

        ctaBar.appendChild(a);
    });

    if (teaserLink) {
        const teaser = document.createElement('a');
        teaser.href = teaserLink.href;
        teaser.textContent = teaserLink.text;
        teaser.className = 'hero-banner-cta hero-banner-cta-teaser';
        ctaBar.appendChild(teaser);
    }

    block.appendChild(ctaBar);
}
