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

    // 4. Elite Video Analysis Slider Logic
    const carouselElem = document.querySelector('.analysts-carousel');
    const bioPanel = document.getElementById('bio-panel');
    const parallaxBg = document.getElementById('slider-parallax');
    
    // UI Elements
    const bioNum = document.getElementById('bio-num');
    const bioName = document.getElementById('bio-name');
    const bioRole = document.getElementById('bio-role');
    const bioText = document.getElementById('bio-text');
    const progressBar = document.getElementById('progress-bar');

    const analystsData = [
        {
            num: "01",
            name: "Ahmed Gameel Zaid",
            role: "First Team Video Analyst | Al-Yarmouk FC (KSA)",
            desc: "FA Certified Scout and Performance Analysis Graduate specializing in technical and tactical coding for professional clubs."
        },
        {
            num: "02",
            name: "Abdelkader Saleh",
            role: "Video Analyst",
            desc: "Expert in FC Barcelona's Methodology and Johan Cruyff Institute certified analyst, focused on positional play."
        },
        {
            num: "03",
            name: "Abdelrhman Fahmy",
            role: "Performance Analyst First Team",
            desc: "Dedicated performance analyst with PFSA and tactical certifications, formerly with AL-Masry."
        },
        {
            num: "04",
            name: "Karim Ali",
            role: "Performance Analyst – Laviena FC",
            desc: "Experienced coach and analyst with deep PFSA expertise in live match and opposition analysis."
        },
        {
            num: "05",
            name: "Abdellatif Reda",
            role: "First Team Performance Analyst | Al Ahly SC Women",
            desc: "Data-driven tactician with Barcelona Innovation Hub qualifications, specialized in match and video analysis."
        }
    ];

    if (carouselElem && typeof Flickity !== 'undefined') {
        const flkty = new Flickity(carouselElem, {
            cellAlign: 'center',
            contain: true,
            wrapAround: true,
            autoPlay: 6000,
            pauseAutoPlayOnHover: true,
            prevNextButtons: true,
            pageDots: false,
            friction: 0.28,
            selectedAttraction: 0.02
        });

        // Parallax & Progress
        flkty.on('scroll', (progress) => {
            // Parallax Shift
            const moveX = progress * -100;
            parallaxBg.style.transform = `translateX(${moveX}px)`;
            
            // Progress Bar
            const progWidth = Math.max(0, Math.min(100, progress * 100));
            progressBar.style.width = `${progWidth}%`;
        });

        // Sync Bio Panel
        const updateBio = () => {
            const index = flkty.selectedIndex;
            const data = analystsData[index];

            // Fade out
            bioPanel.style.opacity = '0';
            
            setTimeout(() => {
                bioNum.innerText = data.num;
                bioName.innerText = data.name;
                bioRole.innerText = data.role;
                bioText.innerText = data.desc;
                
                // Fade in
                bioPanel.style.opacity = '1';
            }, 400);
        };

        flkty.on('select', updateBio);
        updateBio(); // Set initial
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
