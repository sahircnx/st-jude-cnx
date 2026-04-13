const isDesktop = window.matchMedia('(min-width: 900px)');

const SEARCH_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><path d="M229.66,218.34l-50.07-50.07a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.31ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/></svg>';

const CHEVRON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"/></svg>';

const CLOSE_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';

const HAMBURGER_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';

const LANG_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>';

function buildNavData() {
    return [
        {
            label: 'About Us',
            href: '/about-st-jude.html',
            children: [
                { label: 'About Us', href: '/about-st-jude.html' },
                { label: 'Our History', href: '/about-st-jude/history.html' },
                { label: 'Our Stories', href: '/about-st-jude/stories.html' },
                { label: 'Our Unique Operating Model', href: '/about-st-jude/unique-operating-model.html' },
                { label: 'Why Support St. Jude?', href: '/about-st-jude/why-support-st-jude.html' },
                { label: 'Visit', href: '/about-st-jude/visit.html' },
                { label: 'Strategic Plan', href: '/media-resources/special-announcements/st-jude-strategic-plan-2022-27.html' },
                { label: 'St. Jude Global', href: 'https://global.stjude.org/en-us/' },
                { label: 'Newsroom', href: '/media-resources.html' },
                { label: 'FAQs', href: '/about-st-jude/faq.html' },
            ],
        },
        {
            label: 'Care & Treatment',
            href: '/care-treatment.html',
            children: [
                { label: 'Care & Treatment', href: '/care-treatment.html' },
                { label: 'Diseases Treated', href: '/care-treatment/treatment/disease.html' },
                { label: 'Patient Referrals', href: '/care-treatment/patient-referrals.html' },
                { label: 'Online Referral Form', href: '/care-treatment/patient-referrals/refer-a-patient/physician-patient-referral-form.html' },
                { label: 'Open Clinical Trials', href: '/care-treatment/clinical-trials.html' },
                { label: 'Patients & Families', href: '/care-treatment/patient-families.html' },
                { label: 'Affiliate Program', href: '/care-treatment/patient-families/affiliate-program.html' },
            ],
        },
        {
            label: 'Research',
            href: '/research.html',
            children: [
                { label: 'Research', href: '/research.html' },
                { label: 'Why St. Jude', href: '/research/why-st-jude.html' },
                { label: 'Departments', href: '/research/departments.html' },
                { label: 'Labs', href: '/research/labs.html' },
                { label: 'Clinical Research', href: '/research/clinical-research.html' },
                { label: 'Research Faculty', href: '/people.html' },
                { label: 'Centers & Initiatives', href: '/research/centers-initiatives.html' },
                { label: 'Our Progress', href: '/research/progress.html' },
                { label: 'Scientific Report', href: '/research/why-st-jude/scientific-report.html' },
                { label: 'Research Careers', href: '/research/careers.html' },
            ],
        },
        {
            label: 'Training',
            href: '/education-training.html',
            children: [
                { label: 'Training', href: '/education-training.html' },
                { label: 'Advanced Training', href: '/education-training/advanced-training.html' },
                { label: 'Predoctoral Training', href: '/education-training/predoctoral-training.html' },
                { label: 'Scientific Trainee Support', href: '/education-training/support-for-scientific-trainees.html' },
                { label: 'Clinical Trainee Support', href: '/education-training/support-for-clinical-trainees.html' },
                { label: 'St. Jude Graduate School', href: '/education-training/st-jude-graduate-school-of-biomedical-sciences.html' },
                { label: 'Seminars & Symposia', href: '/education-training/advanced-training/seminars-symposia.html' },
            ],
        },
        {
            label: 'Support & Fundraising',
            href: '/support-and-fundraising.html',
            children: [
                { label: 'Support & Fundraising', href: '/support-and-fundraising.html' },
                { label: 'Ways to Give', href: '/give.html' },
                { label: 'Events & Fundraisers', href: '/get-involved.html' },
                { label: 'Gift Shop', href: 'https://giftshop.stjude.org/' },
                { label: 'Volunteer', href: '/get-involved/volunteer-locally.html' },
            ],
        },
    ];
}

function closeAllDropdowns(nav) {
    nav.querySelectorAll('.main-header-nav-item').forEach((item) => {
        item.classList.remove('is-open');
        const btn = item.querySelector('button');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    });
}

function toggleMobileMenu(block, open) {
    const overlay = block.querySelector('.main-header-mobile-overlay');
    const hamburger = block.querySelector('.main-header-hamburger');
    if (open) {
        overlay.classList.add('is-open');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.innerHTML = `${CLOSE_ICON_SVG}<span>CLOSE</span>`;
        document.body.style.overflow = 'hidden';
    } else {
        overlay.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = `${HAMBURGER_SVG}<span>MENU</span>`;
        document.body.style.overflow = '';
        // close all mobile accordions
        block.querySelectorAll('.main-header-mobile-nav-item').forEach((item) => {
            item.classList.remove('is-open');
            const btn = item.querySelector('button');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
    }
}

function closeOnEscape(e) {
    if (e.code === 'Escape') {
        const nav = document.querySelector('.main-header');
        if (!nav) return;
        if (!isDesktop.matches) {
            const overlay = nav.querySelector('.main-header-mobile-overlay');
            if (overlay && overlay.classList.contains('is-open')) {
                toggleMobileMenu(nav, false);
                nav.querySelector('.main-header-hamburger').focus();
            }
        } else {
            closeAllDropdowns(nav);
        }
    }
}

function buildTopBar() {
    const topBar = document.createElement('div');
    topBar.className = 'main-header-top-bar';

    // Logo
    const logo = document.createElement('a');
    logo.href = '/';
    logo.className = 'main-header-logo';
    logo.setAttribute('aria-label', 'St. Jude Children\'s Research Hospital - Home');
    logo.innerHTML = `
    <svg class="main-header-logo-icon" viewBox="0 0 74.448 54" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><style>.logo-fill{fill:#c10f3a;}</style></defs>
      <path class="logo-fill" d="M59.978,38.869a1.154,1.154,0,1,1,1.139-1.153,1.114,1.114,0,0,1-1.139,1.153m0-2.55a1.397,1.397,0,1,0,1.408,1.397,1.384,1.384,0,0,0-1.408-1.397"/>
      <path class="logo-fill" d="M60.007,37.641h-.262v-.397h.275a.191.191,0,0,1,.205.202.197.197,0,0,1-.218.195m.244.131a.393.393,0,0,0,.228-.34.367.367,0,0,0-.408-.374h-.587v1.302h.262v-.533h.242l.31.533h.283l-.345-.58Z"/>
      <path class="logo-fill" d="M38.318,31.597a.19.19,0,0,1-.156.123,6.947,6.947,0,0,0-5.093,2.397s-.154.149-.543-.156a.409.409,0,0,1-.189-.477c.53-1.335,1.898-2.215,4.06-2.614l.063-.009c.443-.061,1.472-.203,1.823.489a.349.349,0,0,1,.035.248M44.5,38.213l-.012-.016a18.698,18.698,0,0,1,2.196-2.782c.027-.012.046-.02.076-.034a3.745,3.745,0,0,0,1.946-.584,12.543,12.543,0,0,0,.949-.876,8.638,8.638,0,0,0,.568-1.165v-.001l-.015.027.053-.123.009-.033.087-.268a.226.226,0,0,0-.118-.192.323.323,0,0,0-.182-.02l.005-.016a.765.765,0,0,0,.085-.275v-.019a.261.261,0,0,0-.133-.197.404.404,0,0,0-.279-.016.444.444,0,0,0-.123-.115c-.022-.016-.147-.06-.377.08a1.021,1.021,0,0,0-.253.24l.017-.142a.248.248,0,0,0-.155-.168.432.432,0,0,0-.381.073,2.057,2.057,0,0,0-.397.497,1.67,1.67,0,0,0-.357.407,1.215,1.215,0,0,1-.7.076,2.04,2.04,0,0,0,.502-.369,1.3,1.3,0,0,0,.345-.772.627.627,0,0,0-.01-.113.321.321,0,0,0-.248-.222c-.223-.111-.49.114-.541.161-.004.006-.078.083-.118.127a.941.941,0,0,0-.378.176.807.807,0,0,1-.294.143,1.239,1.239,0,0,0-.444.229l-.012.009.011-.007c-.028.019-.273.182-.349.234a2.808,2.808,0,0,0-.739.566c-.395.393-.89.88-3.109,1.614-.019-.812-.52-2.994-.621-3.829-.205-1.475-1.915-3.504-3.145-4.789,1.16.674,1.809.768,2.447-.101.168-.263.434.021.675-.026.351-.182.305-.28.305-.534.103-.272.379-.138.584-.171.517-.085.21-.627.412-.9,2.272-.136-.29-2.224,1.239-3.088a4.357,4.357,0,0,0,2.185-1.842c.366-.494.442-.108.716-.513.495-1.779-.36-3.974-1.46-5.484-5.637-7.246-12.073-3.905-13.95.583-.776,1.14-.536,2.798-.58,4.162-.146.474-.431.461-.84.181a1.032,1.032,0,0,0,.968,1.189c.034.12.249.303.339.429a2.084,2.084,0,0,1-1.108-.193.742.742,0,0,0,.189.583,1.348,1.348,0,0,0,.961,1.105c.904.367.48,1.606.374,2.115-.033.113-.068.225-.097.332a2.422,2.422,0,0,0-1.613,1.736c-.102,1.903-1.083,3.482-1.066,5.451a3.014,3.014,0,0,0,0,.406c.488,2.13-.135,4.922-.032,7.118A54.678,54.678,0,0,0,9.001,45a76.003,76.003,0,0,1,28.223-5.24A75.998,75.998,0,0,1,65.447,45,55.104,55.104,0,0,0,44.5,38.213"/>
    </svg>
    <svg class="main-header-logo-text" viewBox="0 0 412 123" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <text x="0" y="40" font-family="'Open Sans', Arial, sans-serif" font-size="32" font-weight="300" fill="#4d4d4d">
        <tspan font-style="italic">St. Jude</tspan> Children's
      </text>
      <text x="0" y="80" font-family="'Open Sans', Arial, sans-serif" font-size="32" font-weight="300" fill="#4d4d4d">Research Hospital</text>
    </svg>
  `;

    // Utility links
    const utilityLinks = document.createElement('div');
    utilityLinks.className = 'main-header-utility';
    utilityLinks.innerHTML = `
    <a href="/jobs.html">Careers</a>
    <span class="main-header-utility-divider">|</span>
    <a href="/contact-us.html">Contact Us</a>
    <span class="main-header-utility-divider">|</span>
    <a href="/es/" class="main-header-lang-link">${LANG_ICON_SVG} Espa\u00f1ol</a>
  `;

    // Search
    const searchWrap = document.createElement('div');
    searchWrap.className = 'main-header-search';
    searchWrap.innerHTML = `
    <input type="search" placeholder="Search" aria-label="Search" class="main-header-search-input" />
    <button type="button" class="main-header-search-btn" aria-label="Search">${SEARCH_ICON_SVG}</button>
  `;

    topBar.append(logo, utilityLinks, searchWrap);
    return topBar;
}

function buildNavBar(navData) {
    const navBar = document.createElement('div');
    navBar.className = 'main-header-nav-bar';

    const navList = document.createElement('nav');
    navList.className = 'main-header-nav';
    navList.setAttribute('aria-label', 'Main navigation');

    const ul = document.createElement('ul');
    ul.className = 'main-header-nav-list';

    navData.forEach((section) => {
        const li = document.createElement('li');
        li.className = 'main-header-nav-item';

        const btn = document.createElement('button');
        btn.className = 'main-header-nav-btn';
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = `<span>${section.label}</span>${CHEVRON_SVG}`;

        const dropdown = document.createElement('ul');
        dropdown.className = 'main-header-dropdown';

        section.children.forEach((child, i) => {
            const subLi = document.createElement('li');
            const a = document.createElement('a');
            a.href = child.href;
            a.textContent = child.label;
            if (i === 0) a.classList.add('main-header-dropdown-overview');
            subLi.append(a);
            dropdown.append(subLi);
        });

        btn.addEventListener('click', () => {
            const wasOpen = li.classList.contains('is-open');
            closeAllDropdowns(ul.closest('.main-header'));
            if (!wasOpen) {
                li.classList.add('is-open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });

        li.append(btn, dropdown);
        ul.append(li);
    });

    navList.append(ul);

    // CTA buttons
    const ctas = document.createElement('div');
    ctas.className = 'main-header-ctas';
    ctas.innerHTML = `
    <a href="/patient-referrals.html" class="main-header-cta main-header-cta-refer">Refer a Patient</a>
    <a href="/donate/donate-to-st-jude.html" class="main-header-cta main-header-cta-donate">Donate Now</a>
  `;

    navBar.append(navList, ctas);
    return navBar;
}

function buildMobileOverlay(navData) {
    const overlay = document.createElement('div');
    overlay.className = 'main-header-mobile-overlay';

    // Mobile CTAs
    const mobileCtas = document.createElement('div');
    mobileCtas.className = 'main-header-mobile-ctas';
    mobileCtas.innerHTML = `
    <a href="/patient-referrals.html" class="main-header-cta main-header-cta-refer">Refer a Patient</a>
    <a href="/donate/donate-to-st-jude.html" class="main-header-cta main-header-cta-donate">Donate Now</a>
  `;

    // Mobile nav
    const mobileNav = document.createElement('nav');
    mobileNav.className = 'main-header-mobile-nav';
    mobileNav.setAttribute('aria-label', 'Main navigation');

    const ul = document.createElement('ul');
    ul.className = 'main-header-mobile-nav-list';

    navData.forEach((section) => {
        const li = document.createElement('li');
        li.className = 'main-header-mobile-nav-item';

        const btn = document.createElement('button');
        btn.className = 'main-header-mobile-nav-btn';
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = `<span>${section.label}</span>${CHEVRON_SVG}`;

        const subList = document.createElement('ul');
        subList.className = 'main-header-mobile-dropdown';

        section.children.forEach((child) => {
            const subLi = document.createElement('li');
            const a = document.createElement('a');
            a.href = child.href;
            a.textContent = child.label;
            subLi.append(a);
            subList.append(subLi);
        });

        btn.addEventListener('click', () => {
            const wasOpen = li.classList.contains('is-open');
            li.classList.toggle('is-open', !wasOpen);
            btn.setAttribute('aria-expanded', wasOpen ? 'false' : 'true');
        });

        li.append(btn, subList);
        ul.append(li);
    });

    mobileNav.append(ul);

    // Language link
    const langLink = document.createElement('a');
    langLink.href = '/es/';
    langLink.className = 'main-header-mobile-lang';
    langLink.innerHTML = `${LANG_ICON_SVG} Espa\u00f1ol`;

    // Utility links
    const mobileUtil = document.createElement('div');
    mobileUtil.className = 'main-header-mobile-utility';
    mobileUtil.innerHTML = `
    <a href="/jobs.html">Careers</a>
    <span class="main-header-utility-divider">|</span>
    <a href="/contact-us.html">Contact Us</a>
  `;

    overlay.append(mobileCtas, mobileNav, langLink, mobileUtil);
    return overlay;
}

export default async function decorate(block) {
    const navData = buildNavData();

    block.textContent = '';
    block.classList.add('main-header');

    // Top bar (desktop)
    const topBar = buildTopBar();

    // Nav bar (desktop)
    const navBar = buildNavBar(navData);

    // Mobile overlay
    const mobileOverlay = buildMobileOverlay(navData);

    // Mobile header row (logo + search + hamburger)
    const mobileRow = document.createElement('div');
    mobileRow.className = 'main-header-mobile-row';

    const mobileLogo = document.createElement('a');
    mobileLogo.href = '/';
    mobileLogo.className = 'main-header-mobile-logo';
    mobileLogo.setAttribute('aria-label', 'St. Jude Children\'s Research Hospital - Home');
    mobileLogo.innerHTML = topBar.querySelector('.main-header-logo').innerHTML;

    const mobileSearch = document.createElement('div');
    mobileSearch.className = 'main-header-mobile-search';
    mobileSearch.innerHTML = `
    <input type="search" placeholder="Search" aria-label="Search" class="main-header-search-input" />
    <button type="button" class="main-header-search-btn" aria-label="Search">${SEARCH_ICON_SVG}</button>
  `;

    const hamburger = document.createElement('button');
    hamburger.className = 'main-header-hamburger';
    hamburger.setAttribute('aria-label', 'Open navigation');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'main-header-mobile-overlay');
    hamburger.innerHTML = `${HAMBURGER_SVG}<span>MENU</span>`;

    hamburger.addEventListener('click', () => {
        const isOpen = mobileOverlay.classList.contains('is-open');
        toggleMobileMenu(block, !isOpen);
    });

    mobileRow.append(mobileLogo, mobileSearch, hamburger);
    mobileOverlay.id = 'main-header-mobile-overlay';

    block.append(topBar, navBar, mobileRow, mobileOverlay);

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!block.contains(e.target)) {
            closeAllDropdowns(block);
        }
    });

    // Escape key
    window.addEventListener('keydown', closeOnEscape);

    // Handle resize
    isDesktop.addEventListener('change', () => {
        if (isDesktop.matches) {
            toggleMobileMenu(block, false);
        }
        closeAllDropdowns(block);
    });
}
