// Smart Use of AI — site interactions

const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelector('.nav-links');


// =========================================
// NAVBAR SCROLL + BACK TO TOP
// =========================================

window.addEventListener('scroll', () => {

    if (navbar) {
        navbar.classList.toggle(
            'scrolled',
            window.scrollY > 30
        );
    }

    if (backTop) {
        backTop.classList.toggle(
            'show',
            window.scrollY > 500
        );
    }

});


// =========================================
// BACK TO TOP
// =========================================

if (backTop) {

    backTop.addEventListener('click', () => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    });

}


// =========================================
// MOBILE MENU
// =========================================

if (mobileMenu && navLinks) {

    mobileMenu.addEventListener('click', () => {

        navLinks.classList.toggle('mobile-open');

    });


    navLinks
        .querySelectorAll('a')
        .forEach(a => {

            a.addEventListener('click', () => {

                navLinks.classList.remove(
                    'mobile-open'
                );

            });

        });

}


// =========================================
// SCROLL REVEAL ANIMATION
// =========================================

const revealItems =
    document.querySelectorAll('.reveal');


if ('IntersectionObserver' in window) {

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add('visible');

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealItems.forEach(el => {

        observer.observe(el);

    });

} else {

    revealItems.forEach(el => {

        el.classList.add('visible');

    });

}


// =========================================
// COMPARISON DATA
// =========================================

const comparisonData = {

    gemini: [
        'Gemini',
        'Ideation, research & explanations',
        'THINKING'
    ],

    canva: [
        'Canva Magic',
        'Visual creation & design',
        'CREATION'
    ],

    notebook: [
        'NotebookLM',
        'Source-based study & summaries',
        'STUDY'
    ],

    sheets: [
        'Google Sheets',
        'Organization, data & analysis',
        'DATA'
    ],

    grammarly: [
        'Grammarly',
        'Grammar, clarity, tone & rewriting',
        'WRITING'
    ]

};


// =========================================
// COMPARISON CARD INTERACTION
// =========================================

document
    .querySelectorAll('.comparison-card')
    .forEach(card => {

        card.addEventListener('click', () => {

            document
                .querySelectorAll('.comparison-card')
                .forEach(c => {

                    c.classList.remove('active');

                });


            card.classList.add('active');


            const d =
                comparisonData[
                    card.dataset.tool
                ];


            if (!d) return;


            const title =
                document.getElementById(
                    'comparisonTitle'
                );

            const text =
                document.getElementById(
                    'comparisonText'
                );

            const job =
                document.getElementById(
                    'comparisonJob'
                );


            if (title) {
                title.textContent = d[0];
            }

            if (text) {
                text.textContent = d[1];
            }

            if (job) {
                job.textContent = d[2];
            }

        });

    });