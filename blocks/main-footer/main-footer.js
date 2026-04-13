/**
 * Main Footer Block
 * St. Jude-style complex footer with tagline, email signup, contact info, and legal links.
 */

const DEFAULTS = {
    tagline: 'Finding cures. Saving children.',
    address: '262 Danny Thomas Place\nMemphis, TN 38105',
    donorPhone: '(800) 822-6344',
    hospitalPhone: '(866) 278-5833',
    copyright: "© Copyright 2026. St. Jude Children's Research Hospital, a not-for-profit, section 501(c)(3).",
    socialLinks: [
        { label: 'Facebook', url: 'https://www.facebook.com/stjude', bg: '#1877f2' },
        { label: 'X', url: 'https://x.com/StJude', bg: '#000000' },
        { label: 'Instagram', url: 'https://www.instagram.com/stjude', bg: '#e4405f' },
        { label: 'YouTube', url: 'https://www.youtube.com/user/MyStJude', bg: '#ff0000' },
    ],
    learnMoreLinks: [
        { label: 'Careers', url: 'https://www.stjude.org/jobs.html' },
        { label: 'Media Resources', url: 'https://www.stjude.org/media-resources.html' },
    ],
    legalLinks: [
        { label: 'Privacy Policy', url: '/privacy-policy' },
        { label: 'Terms of Use', url: '/terms-of-use' },
        { label: 'Notice of Privacy Practices', url: '/notice-of-privacy-practices' },
        { label: 'Notice of Non-Discrimination', url: '/non-discrimination' },
        { label: 'Transparency in Coverage', url: '/transparency-in-coverage' },
        { label: 'Pricing Information', url: '/pricing-information' },
        { label: 'Sitemap', url: '/sitemap' },
    ],
    languageLinks: [
        { label: 'Español', url: '/es' },
        { label: '中文', url: '/zh' },
        { label: 'العربية', url: '/ar' },
        { label: 'Tiếng Việt', url: '/vi' },
        { label: '한국어', url: '/ko' },
        { label: 'Tagalog', url: '/tl' },
        { label: 'Русский', url: '/ru' },
        { label: 'Português', url: '/pt' },
        { label: 'Français', url: '/fr' },
        { label: 'Deutsch', url: '/de' },
        { label: '日本語', url: '/ja' },
        { label: 'فارسی', url: '/fa' },
    ],
};

/**
 * Try to extract authored content from the block DOM rows, falling back to defaults.
 */
function parseAuthored(block) {
    const rows = [...block.querySelectorAll(':scope > div')];
    const config = { ...DEFAULTS };

    rows.forEach((row) => {
        const cells = [...row.querySelectorAll(':scope > div')];
        if (cells.length >= 2) {
            const key = cells[0].textContent.trim().toLowerCase().replace(/\s+/g, '');
            const value = cells[1].textContent.trim();
            switch (key) {
                case 'tagline': config.tagline = value; break;
                case 'address': config.address = value; break;
                case 'donorphone': config.donorPhone = value; break;
                case 'hospitalphone': config.hospitalPhone = value; break;
                case 'copyright': config.copyright = value; break;
                default: break;
            }
        }
    });

    return config;
}

function createTaglineBanner(config) {
    const banner = document.createElement('div');
    banner.className = 'main-footer-tagline';

    const logoIcon = document.createElement('div');
    logoIcon.className = 'main-footer-tagline-icon';
    logoIcon.setAttribute('aria-hidden', 'true');
    logoIcon.innerHTML = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" stroke="#c10f3a" stroke-width="2" fill="none"/>
    <path d="M24 8 L24 40 M14 18 L34 18" stroke="#c10f3a" stroke-width="3" stroke-linecap="round"/>
  </svg>`;

    const taglineText = document.createElement('p');
    taglineText.className = 'main-footer-tagline-text';
    taglineText.textContent = `${config.tagline}\u00AE`;

    banner.append(logoIcon, taglineText);
    return banner;
}

function createEmailForm() {
    const wrapper = document.createElement('div');
    wrapper.className = 'main-footer-form-wrapper';

    const heading = document.createElement('h3');
    heading.className = 'main-footer-heading';
    heading.textContent = 'Sign Up For Email Updates';

    const form = document.createElement('form');
    form.className = 'main-footer-form';
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    const nameRow = document.createElement('div');
    nameRow.className = 'main-footer-form-name-row';

    const firstName = document.createElement('input');
    firstName.type = 'text';
    firstName.placeholder = 'First Name';
    firstName.setAttribute('aria-label', 'First Name');
    firstName.className = 'main-footer-input';

    const lastName = document.createElement('input');
    lastName.type = 'text';
    lastName.placeholder = 'Last Name';
    lastName.setAttribute('aria-label', 'Last Name');
    lastName.className = 'main-footer-input';

    nameRow.append(firstName, lastName);

    const email = document.createElement('input');
    email.type = 'email';
    email.placeholder = 'Email Address';
    email.setAttribute('aria-label', 'Email Address');
    email.className = 'main-footer-input';

    const checkboxWrapper = document.createElement('label');
    checkboxWrapper.className = 'main-footer-checkbox';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const checkboxText = document.createElement('span');
    checkboxText.textContent = 'I agree to receive email communications from St. Jude.';
    checkboxWrapper.append(checkbox, checkboxText);

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.className = 'main-footer-submit';
    submit.textContent = 'Submit';

    form.append(nameRow, email, checkboxWrapper, submit);
    wrapper.append(heading, form);
    return wrapper;
}

function createSocialIcons(config) {
    const wrapper = document.createElement('div');
    wrapper.className = 'main-footer-social-wrapper';

    const heading = document.createElement('h3');
    heading.className = 'main-footer-heading';
    heading.textContent = 'Connect With Us';

    const row = document.createElement('div');
    row.className = 'main-footer-social-row';

    config.socialLinks.forEach(({ label, url, bg }) => {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'main-footer-social-icon';
        a.style.backgroundColor = bg;
        a.setAttribute('aria-label', label);
        a.textContent = label.charAt(0);
        if (label === 'YouTube') a.textContent = 'YT';
        row.append(a);
    });

    wrapper.append(heading, row);
    return wrapper;
}

function createContactColumn(config) {
    const col = document.createElement('div');
    col.className = 'main-footer-contact';

    const heading = document.createElement('h3');
    heading.className = 'main-footer-heading';
    heading.textContent = 'Contact Us';

    const address = document.createElement('address');
    address.className = 'main-footer-address';
    address.innerHTML = config.address.replace(/\n/g, '<br>');

    const visitLink = document.createElement('a');
    visitLink.href = 'https://www.stjude.org/visit.html';
    visitLink.className = 'main-footer-visit-link';
    visitLink.innerHTML = '<span class="main-footer-link-icon" aria-hidden="true">&#x27A4;</span> Visit St. Jude';

    const phoneSection = document.createElement('div');
    phoneSection.className = 'main-footer-phones';

    const donorLink = document.createElement('a');
    donorLink.href = `tel:${config.donorPhone.replace(/[^\d+]/g, '')}`;
    donorLink.className = 'main-footer-phone-link';
    donorLink.innerHTML = `<span class="main-footer-link-icon" aria-hidden="true">&#x260E;</span> <span><strong>Donor Services:</strong> ${config.donorPhone}</span>`;

    const hospitalLink = document.createElement('a');
    hospitalLink.href = `tel:${config.hospitalPhone.replace(/[^\d+]/g, '')}`;
    hospitalLink.className = 'main-footer-phone-link';
    hospitalLink.innerHTML = `<span class="main-footer-link-icon" aria-hidden="true">&#x260E;</span> <span><strong>Hospital:</strong> ${config.hospitalPhone}</span>`;

    phoneSection.append(donorLink, hospitalLink);
    col.append(heading, address, visitLink, phoneSection);
    return col;
}

function createLearnMoreColumn(config) {
    const col = document.createElement('div');
    col.className = 'main-footer-learn-more';

    const heading = document.createElement('h3');
    heading.className = 'main-footer-heading';
    heading.textContent = 'Learn More About Us';

    const linksList = document.createElement('ul');
    linksList.className = 'main-footer-learn-links';
    config.learnMoreLinks.forEach(({ label, url }) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = url;
        a.textContent = label;
        li.append(a);
        linksList.append(li);
    });

    const badgesHeading = document.createElement('h3');
    badgesHeading.className = 'main-footer-heading';
    badgesHeading.textContent = 'Accreditations';

    const badges = document.createElement('div');
    badges.className = 'main-footer-badges';

    const badgeLabels = ['AABB Accredited', 'FACT Accredited', 'Magnet Recognized', 'NCI Designated'];
    badgeLabels.forEach((label) => {
        const badge = document.createElement('div');
        badge.className = 'main-footer-badge';
        badge.setAttribute('aria-label', label);
        badge.textContent = label;
        badges.append(badge);
    });

    col.append(heading, linksList, badgesHeading, badges);
    return col;
}

function createBottomBar(config) {
    const bar = document.createElement('div');
    bar.className = 'main-footer-bottom';

    const copyright = document.createElement('p');
    copyright.className = 'main-footer-copyright';
    copyright.textContent = config.copyright;

    const legalList = document.createElement('ul');
    legalList.className = 'main-footer-legal-links';
    config.legalLinks.forEach(({ label, url }) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = url;
        a.textContent = label;
        li.append(a);
        legalList.append(li);
    });

    const langNotice = document.createElement('p');
    langNotice.className = 'main-footer-lang-notice';
    langNotice.textContent = 'Language Assistance Available:';

    const langList = document.createElement('div');
    langList.className = 'main-footer-lang-links';
    config.languageLinks.forEach(({ label, url }) => {
        const a = document.createElement('a');
        a.href = url;
        a.textContent = label;
        langList.append(a);
    });

    bar.append(copyright, legalList, langNotice, langList);
    return bar;
}

/**
 * Decorates the main footer block.
 * @param {Element} block - The block element
 */
export default function decorate(block) {
    const config = parseAuthored(block);

    // Clear authored DOM
    block.textContent = '';

    // Tagline banner
    block.append(createTaglineBanner(config));

    // Footer main 3-column area
    const mainArea = document.createElement('div');
    mainArea.className = 'main-footer-main';

    // Column 1: Email signup + Social
    const col1 = document.createElement('div');
    col1.className = 'main-footer-col';
    col1.append(createEmailForm(), createSocialIcons(config));

    // Column 2: Contact
    const col2 = createContactColumn(config);
    col2.classList.add('main-footer-col');

    // Column 3: Learn more + badges
    const col3 = createLearnMoreColumn(config);
    col3.classList.add('main-footer-col');

    mainArea.append(col1, col2, col3);
    block.append(mainArea);

    // Bottom bar
    block.append(createBottomBar(config));
}
