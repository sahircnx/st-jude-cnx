/**
 * decorate the block
 * @param {Element} block the block
 */
export default function decorate(block) {
  const tagline = block.querySelector('h1, h2, h3, h4');
  if (tagline) {
    tagline.className = 'pre-footer-tagline';
  }

  const columnsWrapper = document.createElement('div');
  columnsWrapper.className = 'pre-footer-columns';

  // The block children are rows. We expect 3 rows for 3 columns after the tagline.
  // Or maybe each column is a top-level div in the block.
  const rows = [...block.children].filter(row => !row.querySelector('.pre-footer-tagline'));
  
  rows.forEach((row, idx) => {
    const col = document.createElement('div');
    col.className = `pre-footer-col pre-footer-col-${idx + 1}`;
    
    // Transfer content
    while (row.firstElementChild) {
      const cell = row.firstElementChild;
      col.append(...cell.childNodes);
      row.removeChild(cell);
    }
    
    // Special handling for Column 1: Email Form + Social
    if (idx === 0) {
      const form = col.querySelector('form') || createPlaceholderForm();
      col.append(form);
      
      const social = col.querySelector('ul') || col.querySelector('p:has(a)');
      if (social) social.className = 'pre-footer-social';
    }
    
    // Special handling for Column 2: Contact
    if (idx === 1) {
      const links = col.querySelectorAll('a');
      links.forEach(a => {
        a.className = 'pre-footer-contact-link';
        if (a.textContent.includes('Visit')) a.classList.add('button', 'secondary');
      });
    }

    // Special handling for Column 3: Learn More + Logos
    if (idx === 2) {
      const logos = col.querySelector('picture')?.parentElement;
      if (logos) logos.className = 'pre-footer-logos';
    }

    columnsWrapper.append(col);
  });

  block.textContent = '';
  if (tagline) block.append(tagline);
  block.append(columnsWrapper);
}

function createPlaceholderForm() {
  const form = document.createElement('div');
  form.className = 'pre-footer-form';
  form.innerHTML = `
    <div class="form-row">
      <div class="form-group">
        <label for="fname">First name</label>
        <input type="text" id="fname" name="fname">
      </div>
      <div class="form-group">
        <label for="lname">Last name</label>
        <input type="text" id="lname" name="lname">
      </div>
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
    </div>
    <button type="submit" class="button primary">Submit</button>
  `;
  return form;
}
