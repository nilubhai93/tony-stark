

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
    });
    
    // Close menu when clicking on a menu item
    const menuItems = document.querySelectorAll('.menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active menu item
                document.querySelectorAll('.menu a').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Highlight active menu item on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 20;
            const sectionBottom = sectionTop + section.offsetHeight;
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
    });
    
    // Form validation
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const messageError = document.getElementById('message-error');
            
            // Reset error messages
            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';
            
            let isValid = true;
            
            // Validate name
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Name is required';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            // Validate message
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Message is required';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                messageError.textContent = 'Message must be at least 10 characters';
                isValid = false;
            }
            
            // If form is valid, submit it (for demo purposes, just show success message)
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For demo purposes, we'll just show the success message
                contactForm.reset();
                successMessage.classList.remove('hidden');
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 5000);
            }
        });
    }
    
    // Add animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
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