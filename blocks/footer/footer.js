import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-container';
  
  while (fragment.firstElementChild) {
    const section = fragment.firstElementChild;
    // Identify and class the language links section if it's a list of links
    const hasManyLanguages = section.textContent.includes('Español') || section.textContent.includes('中文');
    if (section.querySelector('ul') && hasManyLanguages) {
      section.className = 'language-links';
    } else if (section.querySelector('ul')) {
      section.className = 'legal-links';
    }
    footerContainer.append(section);
  }

  block.append(footerContainer);
}
