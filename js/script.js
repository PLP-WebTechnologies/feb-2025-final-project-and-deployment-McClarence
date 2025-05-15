document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    initMobileNavigation();

    // Post Slider Functionality
    initPostSlider();

    // Newsletter Form Submission
    initNewsletterForm();
});

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            // Toggle mobile menu
            this.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Toggle hamburger animation
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!event.target.closest('.hamburger') && !event.target.closest('nav') && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');

                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
}

// Post Slider
function initPostSlider() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const postsContainer = document.getElementById('postsContainer');

    if (!postsContainer || !prevBtn || !nextBtn) return;

    let scrollAmount = 0;
    const slideWidth = 336; // Post card width + gap
    const maxScroll = postsContainer.scrollWidth - postsContainer.clientWidth;

    prevBtn.addEventListener('click', function () {
        if (scrollAmount > 0) {
            scrollAmount = Math.max(0, scrollAmount - slideWidth);
            postsContainer.scroll({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    });

    nextBtn.addEventListener('click', function () {
        if (scrollAmount < maxScroll) {
            scrollAmount = Math.min(maxScroll, scrollAmount + slideWidth);
            postsContainer.scroll({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    });

    // Handle scroll event to update buttons state
    postsContainer.addEventListener('scroll', function () {
        scrollAmount = postsContainer.scrollLeft;

        // Optional: Disable buttons at extremes
        // prevBtn.disabled = scrollAmount <= 0;
        // nextBtn.disabled = scrollAmount >= maxScroll;
    });

    // Handle window resize to recalculate maxScroll
    window.addEventListener('resize', function () {
        maxScroll = postsContainer.scrollWidth - postsContainer.clientWidth;
    });
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email');
    const formMessage = document.getElementById('form-message');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = emailInput.value.trim();

            // Basic email validation
            if (!email || !isValidEmail(email)) {
                showMessage(formMessage, 'Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission (would be replaced with actual API call)
            showMessage(formMessage, 'Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
        });
    }
}

// FAQ Accordion (if present on the page)
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        }
    });
}

// Contact Form Validation (if present on the page)
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    const formResult = document.getElementById('form-result');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            // Basic validation
            if (!name || !email || !message) {
                showMessage(formResult, 'Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            if (!isValidEmail(email)) {
                showMessage(formResult, 'Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission (would be replaced with actual API call)
            showMessage(formResult, 'Thank you for your message. We\'ll respond shortly.', 'success');
            contactForm.reset();
        });
    }
}

// Testimonial Slider (if present on the page)
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dot');

    if (testimonials.length === 0 || dots.length === 0) return;

    let currentIndex = 0;

    // Function to show specific testimonial
    function showTestimonial(index) {
        testimonials.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    // Auto rotate testimonials
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}

// Utility: Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility: Show message (for form responses)
function showMessage(element, message, type) {
    if (!element) return;

    element.textContent = message;
    element.className = `message ${type}`;

    // Style the message based on type
    if (type === 'error') {
        element.style.color = '#e74c3c';
    } else {
        element.style.color = '#27ae60';
    }

    // Clear message after a delay
    setTimeout(() => {
        element.textContent = '';
        element.className = 'message';
    }, 5000);
}

// Initialize any additional components that might be on the specific page
const currentPath = window.location.pathname;
if (currentPath.includes('about')) {
    initTestimonialSlider();
} else if (currentPath.includes('contact')) {
    initContactForm();
    initFaqAccordion();
}

