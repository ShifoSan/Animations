document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Intro Animation
    gsap.from('#intro .title', {
        opacity: 0,
        scale: 0.8,
        duration: 2,
        ease: 'power3.out'
    });
    gsap.from('#intro .subtext', {
        opacity: 0,
        y: 20,
        duration: 1.5,
        delay: 0.5,
        ease: 'power3.out'
    });

    // Parallax Stars
    gsap.to('#stars', {
        backgroundPosition: '-400px 400px',
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        }
    });

    // Planet Sections Animations
    gsap.utils.toArray('.scroll-section').forEach((section, i) => {
        if (i > 0) { // Skip intro section
            const planet = section.querySelector('.planet');
            const description = section.querySelector('.planet-description');

            gsap.fromTo(planet, {
                scale: 1 - (i * 0.1),
            }, {
                scale: 1 - (i * 0.1) - 0.1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });

            gsap.from(description, {
                opacity: 0,
                x: 50,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    end: 'top 30%',
                    scrub: true,
                    toggleActions: 'play none none reverse'
                }
            });
        }
    });

    // Tooltip
    const planets = document.querySelectorAll('.planet');
    planets.forEach(planet => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = planet.dataset.planet;
        document.body.appendChild(tooltip);

        planet.addEventListener('mouseenter', (e) => {
            gsap.to(tooltip, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: 'power3.out'
            });
        });

        planet.addEventListener('mousemove', (e) => {
            gsap.to(tooltip, {
                x: e.clientX + 15,
                y: e.clientY + 15,
                duration: 0.1
            });
        });

        planet.addEventListener('mouseleave', () => {
            gsap.to(tooltip, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: 'power3.out'
            });
        });
    });
});
