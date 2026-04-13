export default function decorate(block) {
    const rows = [...block.children];
    if (!rows.length) return;

    // Row 0: section heading
    const headingRow = rows[0];
    const headingText = headingRow.querySelector('div')?.textContent?.trim() || 'Join our mission';

    // Rows 1+: cards
    const cardData = rows.slice(1).map((row) => {
        const cells = [...row.children];
        const imageCell = cells[0];
        const contentCell = cells[1];

        const picture = imageCell?.querySelector('picture');
        const img = imageCell?.querySelector('img');

        const link = contentCell?.querySelector('a');
        const heading = contentCell?.querySelector('h1, h2, h3, h4, h5, h6');
        const headingTextContent = heading?.textContent?.trim() || '';
        const href = link?.href || heading?.querySelector('a')?.href || '#';

        // Description: first <p> that is not the heading's parent or the link itself
        let description = '';
        const paragraphs = contentCell?.querySelectorAll('p');
        if (paragraphs) {
            const matchedP = [...paragraphs].find(
                (p) => !p.querySelector('a, h1, h2, h3, h4, h5, h6') && p.textContent.trim() !== headingTextContent,
            );
            if (matchedP) {
                description = matchedP.textContent.trim();
            }
        }
        // Fallback: if heading had a link, description might be sibling text
        if (!description && contentCell) {
            const allP = [...contentCell.querySelectorAll('p')];
            const fallbackP = allP.find(
                (p) => p.textContent.trim() && p.textContent.trim() !== headingTextContent,
            );
            if (fallbackP) {
                description = fallbackP.textContent.trim();
            }
        }

        return {
            picture, img, headingText: headingTextContent, href, description,
        };
    });

    // Clear block
    block.textContent = '';

    // Section heading
    const sectionHeading = document.createElement('h2');
    sectionHeading.classList.add('mission-cards-heading');
    sectionHeading.textContent = headingText;
    block.append(sectionHeading);

    // Card grid
    const grid = document.createElement('div');
    grid.classList.add('mission-cards-grid');

    cardData.forEach((card) => {
        const cardLink = document.createElement('a');
        cardLink.classList.add('mission-card-link');
        cardLink.href = card.href;

        const cardEl = document.createElement('div');
        cardEl.classList.add('mission-card');

        // Image
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('mission-card-image');
        if (card.picture) {
            imageWrapper.append(card.picture);
        } else if (card.img) {
            imageWrapper.append(card.img);
        }
        cardEl.append(imageWrapper);

        // Body
        const body = document.createElement('div');
        body.classList.add('mission-card-body');

        const h3 = document.createElement('h3');
        h3.classList.add('mission-card-heading');
        h3.textContent = card.headingText;
        body.append(h3);

        if (card.description) {
            const desc = document.createElement('p');
            desc.classList.add('mission-card-description');
            desc.textContent = card.description;
            body.append(desc);
        }

        cardEl.append(body);
        cardLink.append(cardEl);
        grid.append(cardLink);
    });

    block.append(grid);
    block.classList.add('mission-cards-ready');
}
