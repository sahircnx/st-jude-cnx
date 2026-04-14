import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * decorate the block
 * @param {Element} block the block
 */
export default async function decorate(block) {
  const rows = [...block.children];
  const data = {};

  // Parse rows
  rows.forEach((row, index) => {
    const cell = row.children[0];
    if (!cell) return;

    if (index === 0) {
      // First row: Image
      const pic = cell.querySelector('picture');
      if (pic) data.image = pic;
    } else if (index === 1) {
      // Second row: Eyebrow
      data.eyebrow = cell.textContent.trim();
    } else if (index === 2) {
      // Third row: Heading
      data.heading = cell.innerHTML;
    } else if (index === 3) {
      // Fourth row: Description
      data.description = cell.innerHTML;
    } else if (index === 4) {
      // Fifth row: CTA
      const link = cell.querySelector('a');
      if (link) {
        data.cta = {
          href: link.href,
          text: link.textContent.trim(),
        };
      }
    }
  });

  // Clear the block
  block.textContent = '';

  // Create text container (left side)
  const textContainer = document.createElement('div');
  textContainer.className = 'globe-hero-text';

  if (data.eyebrow) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'globe-hero-eyebrow';
    eyebrow.textContent = data.eyebrow;
    textContainer.append(eyebrow);
  }

  if (data.heading) {
    const heading = document.createElement('h1');
    heading.className = 'globe-hero-heading';
    heading.innerHTML = data.heading;
    textContainer.append(heading);
  }

  if (data.description) {
    const description = document.createElement('div');
    description.className = 'globe-hero-description';
    description.innerHTML = data.description;
    textContainer.append(description);
  }

  if (data.cta) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'globe-hero-cta-wrapper';
    const cta = document.createElement('a');
    cta.className = 'globe-hero-cta';
    cta.href = data.cta.href;
    cta.textContent = data.cta.text;
    ctaWrapper.append(cta);
    textContainer.append(ctaWrapper);
  }

  // Create image container (right side)
  const imageContainer = document.createElement('div');
  imageContainer.className = 'globe-hero-image';
  if (data.image) {
    imageContainer.append(data.image);
    // Ensure image is loaded eagerly as it's likely a hero
    const img = data.image.querySelector('img');
    if (img) img.setAttribute('loading', 'eager');
  }

  block.append(textContainer, imageContainer);
}
