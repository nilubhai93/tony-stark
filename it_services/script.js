   document.addEventListener('DOMContentLoaded', function() {
        // Enhanced hamburger menu functionality
        const hamburger = document.getElementById('hamburger');
        const menu = document.getElementById('menu');
        const menuOverlay = document.getElementById('menu-overlay');
        const body = document.body;
        
        // Toggle menu with smooth animation
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            menu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking overlay
        menuOverlay.addEventListener('click', function() {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
        });
        
        // Close menu when clicking on a menu item
        const menuItems = document.querySelectorAll('.menu a');
        menuItems.forEach(item => {
            item.addEventListener('click', (event) => {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
                menuOverlay.classList.remove('active');
                body.classList.remove('menu-open');
                
                // Smooth scroll to section
                const targetId = item.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    event.preventDefault();
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Highlight active menu item on scroll with throttling
        let isScrolling = false;
        window.addEventListener('scroll', function() {
            if (!isScrolling) {
                isScrolling = true;
                setTimeout(function() {
                    highlightActiveSection();
                    isScrolling = false;
                }, 100); // Throttle to improve performance
            }
        });
        
        function highlightActiveSection() {
            const sections = document.querySelectorAll('section');
            const scrollPosition = window.scrollY + 100; // Offset for better accuracy
            
            sections.forEach(section => {
                if (!section) return; // Skip if section doesn't exist
                
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionBottom = sectionTop + sectionHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    document.querySelectorAll('.menu a').forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${sectionId}`) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        }
        
        // Add header shrink effect on scroll
        const header = document.querySelector('header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                header.classList.add('shrink');
            } else {
                header.classList.remove('shrink');
            }
            
            // Header always stays visible
            header.style.transform = 'translateY(0)';
            
            // Note: The hide-on-scroll functionality is completely removed
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
        
        // Initialize active section highlight on page load
        setTimeout(highlightActiveSection, 100);
    });