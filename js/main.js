const scrollTopBtn = document.getElementById('scrollTop');
const navCollapse = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.site-header .nav-link');
const consultForm = document.getElementById('consultForm');
const formMsg = document.getElementById('formMsg');
const requiredFields = consultForm.querySelectorAll('[required]');

window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        navLinks.forEach(function (item) {
            item.classList.remove('active');
        });
        link.classList.add('active');

        if (navCollapse.classList.contains('show')) {
            bootstrap.Collapse.getInstance(navCollapse).hide();
        }
    });
});

consultForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;

    requiredFields.forEach(function (field) {
        if (!field.value || !field.checkValidity()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });

    if (!isValid) {
        formMsg.classList.add('d-none');
        return;
    }

    formMsg.classList.remove('d-none');
    consultForm.reset();

    setTimeout(function () {
        formMsg.classList.add('d-none');
    }, 5000);
});

requiredFields.forEach(function (field) {
    field.addEventListener('input', function () {
        field.classList.remove('is-invalid');
    });

    field.addEventListener('change', function () {
        field.classList.remove('is-invalid');
    });
});

/* ===== Stats counter (count-up on scroll) ===== */
const counters = document.querySelectorAll('.counter');
const COUNTER_DURATION = 2000; // ms
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function formatCounter(el, value) {
    el.textContent = Math.floor(value) + (el.dataset.suffix || '');
}

function animateCounter(el) {
    const target = parseFloat(el.dataset.target) || 0;

    if (reduceMotion) {
        formatCounter(el, target);
        return;
    }

    let start = null;

    function step(timestamp) {
        if (start === null) start = timestamp;
        const progress = Math.min((timestamp - start) / COUNTER_DURATION, 1);
        formatCounter(el, target * easeOutCubic(progress));

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            formatCounter(el, target);
        }
    }

    requestAnimationFrame(step);
}

if (counters.length) {
    counters.forEach(function (el) {
        formatCounter(el, 0);
    });

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target); // sirf ek baar chalega
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (el) {
            counterObserver.observe(el);
        });
    } else {
        counters.forEach(animateCounter);
    }
}


(function () {
    const track = document.getElementById('testiTrack');
    if (!track) return;

    const GAP = 20;                
    const SPEED = 57;              
    const originals = Array.from(track.children);
    if (!originals.length) return;

   
    const setWidth = track.scrollWidth + GAP;
    const viewport = track.parentElement.offsetWidth;

    const halfSets = Math.max(1, Math.ceil(viewport / setWidth) + 1);
    const totalSets = halfSets * 2;

    const fragment = document.createDocumentFragment();
    for (let i = 1; i < totalSets; i++) {
        originals.forEach(function (card) {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            fragment.appendChild(clone);
        });
    }
    track.appendChild(fragment);

    track.style.animationDuration = (halfSets * setWidth / SPEED) + 's';
})();