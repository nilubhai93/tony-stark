

















    

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