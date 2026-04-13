export default function decorate(block) {
    const rows = [...block.children];
    const row = rows[0];
    if (!row) return;

    const cells = [...row.children];
    const imageCell = cells[0];
    const contentCell = cells[1];

    // Extract background image
    const picture = imageCell?.querySelector('picture');
    const img = picture?.querySelector('img');

    // Extract content elements
    const title = contentCell?.querySelector('h2');
    const subtitle = contentCell?.querySelector('h3');
    const description = contentCell?.querySelector('p:not(:has(a))') || contentCell?.querySelector('p');
    const ctaLink = contentCell?.querySelector('a');

    // Build banner structure
    block.textContent = '';

    // Background image
    if (picture) {
        picture.classList.add('global-banner-bg');
        if (img) {
            img.classList.add('global-banner-bg-img');
        }
        block.append(picture);
    }

    // Text overlay
    const overlay = document.createElement('div');
    overlay.classList.add('global-banner-overlay');

    if (title) {
        title.classList.add('global-banner-title');
        overlay.append(title);
    }

    if (subtitle) {
        subtitle.classList.add('global-banner-subtitle');
        overlay.append(subtitle);
    }

    if (description) {
        description.classList.add('global-banner-description');
        overlay.append(description);
    }

    if (ctaLink) {
        ctaLink.classList.add('global-banner-cta');
        overlay.append(ctaLink);
    }

    block.append(overlay);
}
