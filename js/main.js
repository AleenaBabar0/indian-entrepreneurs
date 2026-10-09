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