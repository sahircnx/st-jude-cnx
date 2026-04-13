export default function decorate(block) {
    const rows = [...block.children];
    const grid = document.createElement('div');
    grid.classList.add('feature-cards-grid');

    rows.forEach((row) => {
        const cells = [...row.children];
        if (cells.length < 2) return;

        const imageCell = cells[0];
        const contentCell = cells[1];

        // Extract image
        const pic = imageCell.querySelector('picture');
        const img = pic ? pic.querySelector('img') : imageCell.querySelector('img');

        // Extract heading link and description
        const headingEl = contentCell.querySelector('h1, h2, h3, h4, h5, h6');
        const linkEl = contentCell.querySelector('a');
        const descEl = contentCell.querySelector('p:not(:has(a))') || contentCell.querySelector('p:last-of-type');

        const href = linkEl ? linkEl.getAttribute('href') : '#';
        let headingText = '';
        if (headingEl) {
            headingText = headingEl.textContent;
        } else if (linkEl) {
            headingText = linkEl.textContent;
        }
        const descText = descEl ? descEl.textContent : '';

        // Build card
        const card = document.createElement('a');
        card.classList.add('feature-card');
        card.href = href;

        // Card image wrapper
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('feature-card-image');
        if (pic) {
            imageWrapper.appendChild(pic.cloneNode(true));
        } else if (img) {
            imageWrapper.appendChild(img.cloneNode(true));
        }

        // Card body
        const body = document.createElement('div');
        body.classList.add('feature-card-body');

        const heading = document.createElement('h3');
        heading.classList.add('feature-card-heading');
        heading.textContent = headingText;

        const description = document.createElement('p');
        description.classList.add('feature-card-description');
        description.textContent = descText;

        body.appendChild(heading);
        body.appendChild(description);

        card.appendChild(imageWrapper);
        card.appendChild(body);
        grid.appendChild(card);
    });

    block.textContent = '';
    block.classList.add('feature-cards');
    block.appendChild(grid);
}
