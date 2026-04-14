import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * decorate the block
 * @param {Element} block the block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'promo-cards-item';
    moveInstrumentation(row, li);
    
    // Each row has one cell with image and one with text
    // Or just all content in cells
    const cells = [...row.children];
    
    cells.forEach((div) => {
      if (div.querySelector('picture')) {
        div.className = 'promo-cards-image';
        const img = div.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          img.closest('picture').replaceWith(optimizedPic);
        }
      } else {
        div.className = 'promo-cards-content';
        const heading = div.querySelector('h1, h2, h3, h4, h5, h6, p strong');
        if (heading) {
          heading.className = 'promo-cards-heading';
        }
      }
      li.append(div);
    });
    ul.append(li);
  });
  block.replaceChildren(ul);
}
