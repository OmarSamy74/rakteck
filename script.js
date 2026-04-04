// RAK Tech - Interactive Website Core Script

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('mobile-overlay');

    function closeMenu() {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('open');
        if (isOpen) {
            closeMenu();
        } else {
            hamburger.classList.add('open');
            navLinks.classList.add('open');
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    });

    overlay.addEventListener('click', closeMenu);

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // 2. Intersection Observer for Scroll Animations
    // Targets elements with slide-up, slide-right, slide-left, fade-in
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once it has animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.slide-up, .slide-right, .slide-left, .fade-in');

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 3. Smooth Scrolling for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Flickity Analysts Slider Logic
    const carouselElem = document.querySelector('.analysts-main-carousel');
    const detailsPanel = document.getElementById('analyst-details');
    const displayName = document.getElementById('display-name');
    const displayRole = document.getElementById('display-role');
    const displayDesc = document.getElementById('display-desc');

    const analystsData = [
        {
            name: "Ahmed Gameel Zaid",
            role: "First Team Video Analyst | Al-Yarmouk FC (KSA)",
            desc: "FA Certified Scout and Performance Analysis Graduate specializing in technical and tactical coding for professional clubs."
        },
        {
            name: "Abdelkader Saleh",
            role: "Video Analyst",
            desc: "Expert in FC Barcelona's Methodology and Johan Cruyff Institute certified analyst, focused on positional play."
        },
        {
            name: "Abdelrhman Fahmy",
            role: "Performance Analyst First Team",
            desc: "Dedicated performance analyst with PFSA and tactical certifications, formerly with AL-Masry."
        },
        {
            name: "Karim Ali",
            role: "Performance Analyst – Laviena FC",
            desc: "Experienced coach and analyst with deep PFSA expertise in live match and opposition analysis."
        },
        {
            name: "Abdellatif Reda",
            role: "First Team Performance Analyst | Al Ahly SC Women",
            desc: "Data-driven tactician with Barcelona Innovation Hub qualifications, specialized in match and video analysis."
        }
    ];

    if (carouselElem) {
        // Flickity is already initialized via HTML data-flickity, 
        // but we need to access the instance to listen for events.
        // Wait until Flickity is loaded if using CDN
        const checkFlickity = setInterval(() => {
            if (typeof Flickity !== 'undefined') {
                clearInterval(checkFlickity);
                initFlickitySync();
            }
        }, 100);

        function initFlickitySync() {
            const flkty = new Flickity(carouselElem, {
                wrapAround: true,
                prevNextButtons: true,
                pageDots: false,
                cellAlign: 'center',
                autoPlay: 4000,
                pauseAutoPlayOnHover: true
            });

            const updateDisplay = () => {
                const index = flkty.selectedIndex;
                
                // Update Info Panel with simple fade
                if (displayName.innerText !== analystsData[index].name) {
                    detailsPanel.style.opacity = '0';
                    setTimeout(() => {
                        displayName.innerText = analystsData[index].name;
                        displayRole.innerText = analystsData[index].role;
                        displayDesc.innerText = analystsData[index].desc;
                        detailsPanel.style.opacity = '1';
                    }, 300);
                }
            };

            flkty.on('select', updateDisplay);
            updateDisplay(); // Initial load
        }
    }

    // Initial check for elements in viewport on load
    setTimeout(() => {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                el.classList.add('visible');
            }
        });
    }, 100);

});
