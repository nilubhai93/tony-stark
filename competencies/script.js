document.addEventListener('DOMContentLoaded', function () {
    // Enhanced hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const body = document.body;

    // Toggle menu with smooth animation
    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        menu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', function () {
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
    window.addEventListener('scroll', function () {
        if (!isScrolling) {
            isScrolling = true;
            setTimeout(function () {
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

    window.addEventListener('scroll', function () {
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
















// Enhanced accordion functionality with animations
document.addEventListener('DOMContentLoaded', function() {
    // Add index data attribute to containers for staggered animations
    const containers = document.querySelectorAll('.dropdown-container');
    containers.forEach((container, index) => {
        container.style.setProperty('--index', index);
    });
    
    // Wrap dropdown content in an inner div for better animations
    document.querySelectorAll('.dropdown-content').forEach(content => {
        const innerContent = document.createElement('div');
        innerContent.className = 'dropdown-content-inner';
        
        // Move all children to the inner content
        while (content.childNodes.length > 0) {
            innerContent.appendChild(content.childNodes[0]);
        }
        
        content.appendChild(innerContent);
    });
    
    // Initialize accordion event listeners
    initAccordion();
    
    // Optionally show first dropdown by default
    // toggleDropdown('content1', document.querySelector('.dropdown-container:first-child .dropdown-header'));
});

function initAccordion() {
    // Add click event listeners to all dropdown headers
    document.querySelectorAll('.dropdown-header').forEach(header => {
        header.addEventListener('click', function(e) {
            const contentId = this.getAttribute('data-target') || 
                             this.getAttribute('onclick').match(/toggleDropdown\('([^']+)'/)[1];
            
            // Add ripple effect
            createRipple(e, this);
            
            // Toggle the dropdown
            toggleDropdown(contentId, this);
        });
    });
}

function toggleDropdown(id, header) {
    const content = document.getElementById(id);
    const allContainers = document.querySelectorAll('.dropdown-container');
    
    // Toggle active class on container for styling
    header.closest('.dropdown-container').classList.toggle('active');
    
    // Toggle active class on header
    header.classList.toggle('active');
    
    // Toggle content visibility
    content.classList.toggle('active');
    
    // Optional: Close other dropdowns (accordion behavior)
    // Uncomment the next block for true accordion behavior
    /*
    document.querySelectorAll('.dropdown-content.active').forEach(openContent => {
        if (openContent.id !== id) {
            openContent.classList.remove('active');
            const openHeader = openContent.previousElementSibling;
            openHeader.classList.remove('active');
            openHeader.closest('.dropdown-container').classList.remove('active');
        }
    });
    */
}

// Create ripple effect on click
function createRipple(event, element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size/2}px`;
    ripple.style.top = `${event.clientY - rect.top - size/2}px`;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Fix for existing onclick attributes
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dropdown-header').forEach(header => {
        const onclickAttr = header.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes('toggleDropdown')) {
            const contentId = onclickAttr.match(/toggleDropdown\('([^']+)'/)[1];
            
            // Remove the inline onclick attribute
            header.removeAttribute('onclick');
            
            // Add data-target attribute for our new handler
            header.setAttribute('data-target', contentId);
        }
    });
});