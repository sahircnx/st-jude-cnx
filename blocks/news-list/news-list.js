import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
    const columns = [];

    /* Each row in the block table represents one column of news content */
    [...block.children].forEach((row) => {
        const cell = row.firstElementChild;
        if (!cell) return;

        const links = [...cell.querySelectorAll('a')];
        if (links.length === 0) return;

        const columnData = {
            featured: null,
            subItems: [],
            bottomLink: null,
        };

        links.forEach((link, index) => {
            const picture = link.closest('p')?.querySelector('picture')
                || link.previousElementSibling?.querySelector?.('picture')
                || link.querySelector('picture');

            /* Also check if a picture exists right before the link's parent paragraph */
            let associatedPicture = picture;
            if (!associatedPicture) {
                const parentP = link.closest('p');
                if (parentP) {
                    let prev = parentP.previousElementSibling;
                    while (prev && !prev.querySelector('picture')) {
                        prev = prev.previousElementSibling;
                    }
                    if (prev && prev.querySelector('picture') && !prev.dataset.claimed) {
                        associatedPicture = prev.querySelector('picture');
                        prev.dataset.claimed = 'true';
                    }
                }
            }

            if (index === 0 && associatedPicture) {
                /* First link with image = featured item */
                columnData.featured = {
                    href: link.href,
                    text: link.textContent.trim(),
                    picture: associatedPicture,
                };
            } else if (associatedPicture && index < links.length - 1) {
                /* Middle links with images = sub items */
                columnData.subItems.push({
                    href: link.href,
                    text: link.textContent.trim(),
                    picture: associatedPicture,
                });
            } else if (!associatedPicture && index === links.length - 1) {
                /* Last link without image = bottom "see more" link */
                columnData.bottomLink = {
                    href: link.href,
                    text: link.textContent.trim(),
                };
            } else if (associatedPicture) {
                /* Any other link with image = sub item */
                columnData.subItems.push({
                    href: link.href,
                    text: link.textContent.trim(),
                    picture: associatedPicture,
                });
            } else {
                /* Fallback: link without image that isn't last = sub item with no thumbnail */
                columnData.subItems.push({
                    href: link.href,
                    text: link.textContent.trim(),
                    picture: null,
                });
            }
        });

        columns.push(columnData);
    });

    /* Build the new DOM structure */
    const grid = document.createElement('div');
    grid.className = 'news-list-grid';

    columns.forEach((col) => {
        const column = document.createElement('div');
        column.className = 'news-list-column';

        /* Featured card */
        if (col.featured) {
            const featured = document.createElement('div');
            featured.className = 'news-list-featured';

            const imgLink = document.createElement('a');
            imgLink.href = col.featured.href;
            imgLink.className = 'news-list-featured-image-link';

            const pic = col.featured.picture.cloneNode(true);
            const img = pic.querySelector('img');
            if (img) {
                const optimized = createOptimizedPicture(img.src, img.alt || col.featured.text, false, [{ width: '800' }]);
                imgLink.append(optimized);
            } else {
                imgLink.append(pic);
            }
            featured.append(imgLink);

            const heading = document.createElement('a');
            heading.href = col.featured.href;
            heading.className = 'news-list-featured-heading';
            heading.textContent = col.featured.text;
            featured.append(heading);

            column.append(featured);
        }

        /* Sub items list */
        if (col.subItems.length > 0) {
            const list = document.createElement('div');
            list.className = 'news-list-items';

            col.subItems.forEach((item) => {
                const row = document.createElement('div');
                row.className = 'news-list-item';

                if (item.picture) {
                    const thumbLink = document.createElement('a');
                    thumbLink.href = item.href;
                    thumbLink.className = 'news-list-item-thumb-link';

                    const pic = item.picture.cloneNode(true);
                    const img = pic.querySelector('img');
                    if (img) {
                        const optimized = createOptimizedPicture(img.src, img.alt || item.text, false, [{ width: '200' }]);
                        optimized.querySelector('img')?.classList.add('news-list-item-thumb');
                        thumbLink.append(optimized);
                    } else {
                        thumbLink.append(pic);
                    }
                    row.append(thumbLink);
                }

                const headingLink = document.createElement('a');
                headingLink.href = item.href;
                headingLink.className = 'news-list-item-heading';
                headingLink.textContent = item.text;
                row.append(headingLink);

                list.append(row);
            });

            column.append(list);
        }

        /* Bottom link */
        if (col.bottomLink) {
            const bottomLink = document.createElement('a');
            bottomLink.href = col.bottomLink.href;
            bottomLink.className = 'news-list-bottom-link';
            bottomLink.textContent = col.bottomLink.text;
            column.append(bottomLink);
        }

        grid.append(column);
    });

    block.textContent = '';
    block.append(grid);
}
