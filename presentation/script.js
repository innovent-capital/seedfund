/**
 * Innovent Seed Fund II - Presentation Scripts
 * Scroll animations and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initScrollReveal();
    initSmoothScroll();
    initNavHighlight();
    initCountUp();
});

/**
 * Scroll Reveal Animation
 * Reveals elements as they enter the viewport
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally stop observing after reveal
                // observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

/**
 * Smooth Scroll for Navigation Links
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Active Navigation Highlighting
 * Highlights current section in navigation
 */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const highlightCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(highlightCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Count Up Animation for Statistics
 */
function initCountUp() {
    const stats = document.querySelectorAll('.stat-value, .return-percent');

    const observerOptions = {
        threshold: 0.5
    };

    const countCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(countCallback, observerOptions);

    stats.forEach(stat => {
        observer.observe(stat);
    });
}

function animateValue(element) {
    const text = element.textContent;
    const hasPercent = text.includes('%');
    const hasDollar = text.includes('$');
    const hasM = text.includes('M');
    const hasK = text.includes('K');
    const hasTilde = text.includes('~');

    // Extract numeric value
    let numericValue = parseFloat(text.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) return;

    const duration = 1000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = start + (numericValue - start) * easeOut;

        // Format the value
        let formatted = '';
        if (hasTilde) formatted += '~';
        if (hasDollar) formatted += '$';

        if (hasM) {
            formatted += currentValue.toFixed(currentValue >= 10 ? 1 : 1) + 'M';
        } else if (hasK) {
            formatted += Math.round(currentValue) + 'K';
        } else if (hasPercent) {
            formatted += Math.round(currentValue) + '%';
        } else {
            formatted += Math.round(currentValue);
        }

        element.textContent = formatted;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/**
 * Parallax effect for hero section (subtle)
 */
document.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
});
