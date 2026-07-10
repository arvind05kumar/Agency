/* ==========================================================================
   VISION FORGE — Main JavaScript file
   Interactivity, Scroll Effects, and Smooth Transitions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Header Scroll Effect ---
    const header = document.querySelector('.header-main');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check state on load


    // --- 2. Mobile Drawer Navigation ---
    const navToggle = document.getElementById('navToggle');
    const navDrawer = document.getElementById('navDrawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    const toggleMenu = () => {
        const isActive = navDrawer.classList.toggle('active');
        
        // Animated hamburger toggle (bars change state)
        if (isActive) {
            navToggle.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            navToggle.children[1].style.opacity = '0';
            navToggle.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            navToggle.children[0].style.transform = 'none';
            navToggle.children[1].style.opacity = '1';
            navToggle.children[2].style.transform = 'none';
        }
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close drawer when link clicked
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navDrawer.classList.contains('active')) {
                toggleMenu();
            }
        });
    });


    // --- 3. Interactive Workflow Tabs ("How We Forge") ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Remove active states
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // Add active states
            btn.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });


    // --- 4. Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    // --- 5. Custom Form Validation and Feedback ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple micro-interaction: change button text
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Forging Connection...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Success trigger
                alert('Thank you for reaching out to Vision Forge! We have received your message and will contact you shortly.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1200);
        });
    }


    // --- 6. Interactive FAQ Accordion ---
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const faqItem = trigger.closest('.faq-item');
            const faqContent = faqItem.querySelector('.faq-content');
            const isActive = faqItem.classList.contains('active');
            
            // Toggle active state
            if (isActive) {
                faqItem.classList.remove('active');
                faqContent.style.maxHeight = '0px';
                trigger.setAttribute('aria-expanded', 'false');
            } else {
                // First close any other open FAQ items for a clean accordion effect
                faqTriggers.forEach(otherTrigger => {
                    const otherItem = otherTrigger.closest('.faq-item');
                    if (otherItem !== faqItem && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-content').style.maxHeight = '0px';
                        otherTrigger.setAttribute('aria-expanded', 'false');
                    }
                });

                faqItem.classList.add('active');
                faqContent.style.maxHeight = faqContent.scrollHeight + 'px';
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });

});
