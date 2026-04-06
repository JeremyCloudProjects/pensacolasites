// ── Scroll fade-in ───────────────────────────────────────
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ── Nav: hide/show on scroll ─────────────────────────────
const nav = document.getElementById('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentY = window.scrollY;

    // Add shadow after scrolling a bit
    nav.classList.toggle('scrolled', currentY > 50);

    // Hide on scroll down, show on scroll up
    if (currentY > 200 && currentY > lastScrollY) {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }

    lastScrollY = currentY;
}, { passive: true });

// ── Mobile menu toggle ───────────────────────────────────
const toggle = document.getElementById('navToggle');
const overlay = document.getElementById('mobileOverlay');

toggle.addEventListener('click', () => {
    const isActive = overlay.classList.toggle('active');
    toggle.classList.toggle('active', isActive);
    toggle.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
});

// Close on link click
overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        overlay.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// Close on escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
        overlay.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Close on resize past mobile breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && overlay.classList.contains('active')) {
        overlay.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}, { passive: true });

// ── Contact form ─────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const original = btn.textContent;

    btn.textContent = 'Sent!';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.opacity = '';
        e.target.reset();
    }, 3000);
});
