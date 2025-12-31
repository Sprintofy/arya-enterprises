/* ============================================
   ARYA ENTERPRISES - Main JavaScript
   Solar & Power Solutions
   ============================================ */

'use strict';

// ========== DOM CONTENT LOADED ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initCounterAnimation();
    initBackToTop();
    initCurrentYear();
    initFormValidation();
    initAccordion();
    initParallaxEffects();
    initTypingEffect();
});

// ========== PRELOADER ==========
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (!preloader) return;
    
    // Hide preloader when page is fully loaded
    window.addEventListener('load', function() {
        // Add a small delay for smoother experience
        setTimeout(function() {
            preloader.classList.add('hidden');
            
            // Remove from DOM after transition
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
            
            // Trigger initial animations
            triggerInitialAnimations();
        }, 500);
    });
    
    // Fallback: Hide preloader after 5 seconds max
    setTimeout(function() {
        if (!preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 5000);
}

// ========== TRIGGER INITIAL ANIMATIONS ==========
function triggerInitialAnimations() {
    // Animate elements that are in viewport on load
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    animatedElements.forEach(function(element, index) {
        if (isInViewport(element)) {
            const delay = element.dataset.delay || index * 100;
            setTimeout(function() {
                element.classList.add('animated');
            }, delay);
        }
    });
}

// ========== NAVBAR ==========
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    let lastScrollTop = 0;
    const scrollThreshold = 100;
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional - uncomment if needed)
        /*
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        */
        
        lastScrollTop = scrollTop;
    });
    
    // Initial check
    if (window.pageYOffset > scrollThreshold) {
        navbar.classList.add('scrolled');
    }
}

// ========== MOBILE MENU ==========
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = mobileMenuBtn?.querySelector('.hamburger-icon');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.contains('active');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close menu on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    function openMobileMenu() {
        mobileMenu.classList.remove('hidden');
        // Trigger reflow
        mobileMenu.offsetHeight;
        mobileMenu.classList.add('active');
        hamburgerIcon?.classList.add('active');
        document.body.style.overflow = 'hidden';
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        hamburgerIcon?.classList.remove('active');
        document.body.style.overflow = '';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        
        // Hide after animation
        setTimeout(function() {
            if (!mobileMenu.classList.contains('active')) {
                mobileMenu.classList.add('hidden');
            }
        }, 400);
    }
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    // Handle all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                event.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                event.preventDefault();
                
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (animatedElements.length === 0) return;
    
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = element.dataset.delay || 0;
                    
                    setTimeout(function() {
                        element.classList.add('animated');
                    }, parseInt(delay));
                    
                    // Stop observing once animated
                    observer.unobserve(element);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(function(element) {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers
        animatedElements.forEach(function(element) {
            element.classList.add('animated');
        });
    }
}

// ========== COUNTER ANIMATION ==========
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-counter]');
    
    if (counters.length === 0) return;
    
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    animateCounter(counter);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(function(counter) {
            observer.observe(counter);
        });
    } else {
        // Fallback
        counters.forEach(function(counter) {
            const target = parseInt(counter.dataset.counter);
            counter.textContent = target;
        });
    }
}

function animateCounter(element) {
    const target = parseInt(element.dataset.counter);
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const easeOutQuad = function(t) { return t * (2 - t); };
    
    let frame = 0;
    
    const counter = setInterval(function() {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const currentCount = Math.round(target * progress);
        
        // Check if element contains additional text (like "MW" or "%")
        const originalText = element.textContent;
        const suffix = originalText.replace(/[0-9]/g, '');
        
        if (suffix && !element.querySelector('span')) {
            element.textContent = currentCount;
        } else if (element.querySelector('span')) {
            element.querySelector('span').textContent = currentCount;
        } else {
            element.textContent = currentCount;
        }
        
        if (frame === totalFrames) {
            clearInterval(counter);
            if (suffix && !element.querySelector('span')) {
                element.textContent = target;
            } else if (element.querySelector('span')) {
                element.querySelector('span').textContent = target;
            } else {
                element.textContent = target;
            }
        }
    }, frameDuration);
}

// ========== BACK TO TOP BUTTON ==========
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    const scrollThreshold = 500;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > scrollThreshold) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== CURRENT YEAR ==========
function initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ========== FORM VALIDATION ==========
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Reset previous errors
        clearFormErrors();
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Validate Name
        if (!name.value.trim()) {
            showError(name, 'Please enter your name');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError(name, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate Email
        if (!email.value.trim()) {
            showError(email, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Phone
        if (!phone.value.trim()) {
            showError(phone, 'Please enter your phone number');
            isValid = false;
        } else if (!isValidPhone(phone.value.trim())) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate Message
        if (!message.value.trim()) {
            showError(message, 'Please enter your message');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If valid, submit form
        if (isValid) {
            submitForm(contactForm);
        }
    });
    
    // Real-time validation on blur
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Clear error on input
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function showError(field, message) {
    const formGroup = field.closest('.form-group') || field.parentElement;
    formGroup.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message text-red-500 text-sm mt-1 block';
    errorElement.textContent = message;
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    formGroup.appendChild(errorElement);
    
    // Add error styling to field
    field.classList.add('border-red-500');
    field.classList.remove('border-gray-200');
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group') || field.parentElement;
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    
    field.classList.remove('border-red-500');
    field.classList.add('border-gray-200');
}

function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(error) {
        error.remove();
    });
    
    const errorFields = document.querySelectorAll('.border-red-500');
    errorFields.forEach(function(field) {
        field.classList.remove('border-red-500');
        field.classList.add('border-gray-200');
    });
    
    const errorGroups = document.querySelectorAll('.form-group.error');
    errorGroups.forEach(function(group) {
        group.classList.remove('error');
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    
    clearFieldError(field);
    
    if (value === '') {
        return; // Don't show error for empty fields on blur
    }
    
    if (type === 'email' && !isValidEmail(value)) {
        showError(field, 'Please enter a valid email address');
    } else if (name === 'phone' && !isValidPhone(value)) {
        showError(field, 'Please enter a valid phone number');
    } else if (name === 'name' && value.length < 2) {
        showError(field, 'Name must be at least 2 characters');
    } else if (name === 'message' && value.length < 10) {
        showError(field, 'Message must be at least 10 characters');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
    `;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(function() {
        // Success
        showFormSuccess(form);
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Reset form
        form.reset();
    }, 2000);
}

function showFormSuccess(form) {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl mb-6 flex items-center space-x-3';
    successDiv.innerHTML = `
        <div class="flex-shrink-0">
            <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        </div>
        <div>
            <h4 class="font-semibold">Message Sent Successfully!</h4>
            <p class="text-sm">Thank you for contacting us. We'll get back to you shortly.</p>
        </div>
    `;
    
    // Insert at top of form
    form.insertBefore(successDiv, form.firstChild);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove after 5 seconds
    setTimeout(function() {
        successDiv.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(function() {
            successDiv.remove();
        }, 300);
    }, 5000);
}

// ========== ACCORDION ==========
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    if (accordionHeaders.length === 0) return;
    
    accordionHeaders.forEach(function(header) {
        header.addEventListener('click', function() {
            const accordionItem = this.closest('.accordion-item');
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const icon = this.querySelector('.icon');
            const isActive = this.classList.contains('active');
            
            // Close all other accordions (optional - remove for multi-open)
            const allHeaders = document.querySelectorAll('.accordion-header');
            allHeaders.forEach(function(otherHeader) {
                if (otherHeader !== header) {
                    otherHeader.classList.remove('active');
                    const otherContent = otherHeader.closest('.accordion-item').querySelector('.accordion-content');
                    const otherIcon = otherHeader.querySelector('.icon');
                    if (otherContent) otherContent.classList.remove('active');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current accordion
            if (isActive) {
                this.classList.remove('active');
                if (accordionContent) accordionContent.classList.remove('active');
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                this.classList.add('active');
                if (accordionContent) accordionContent.classList.add('active');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

// ========== PARALLAX EFFECTS ==========
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(function(element) {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ========== TYPING EFFECT ==========
function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    if (typingElements.length === 0) return;
    
    typingElements.forEach(function(element) {
        const text = element.dataset.typing;
        const speed = parseInt(element.dataset.typingSpeed) || 100;
        
        element.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        // Start when in viewport
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        typeWriter();
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(element);
        } else {
            typeWriter();
        }
    });
}

// ========== HELPER FUNCTIONS ==========

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

// Debounce function
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ========== SERVICE WORKER REGISTRATION (Optional) ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        /*
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
        */
    });
}

// ========== LAZY LOADING IMAGES ==========
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length === 0) return;
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// ========== TABS FUNCTIONALITY ==========
function initTabs() {
    const tabContainers = document.querySelectorAll('[data-tabs]');
    
    tabContainers.forEach(function(container) {
        const tabs = container.querySelectorAll('[data-tab]');
        const panels = container.querySelectorAll('[data-tab-panel]');
        
        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                const targetPanel = this.dataset.tab;
                
                // Update tabs
                tabs.forEach(function(t) {
                    t.classList.remove('active');
                });
                this.classList.add('active');
                
                // Update panels
                panels.forEach(function(panel) {
                    if (panel.dataset.tabPanel === targetPanel) {
                        panel.classList.remove('hidden');
                        panel.classList.add('fade-in-up');
                    } else {
                        panel.classList.add('hidden');
                        panel.classList.remove('fade-in-up');
                    }
                });
            });
        });
    });
}

// Initialize tabs
document.addEventListener('DOMContentLoaded', initTabs);

// ========== MODAL FUNCTIONALITY ==========
function initModals() {
    // Open modal
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    modalTriggers.forEach(function(trigger) {
        trigger.addEventListener('click', function() {
            const modalId = this.dataset.modalTarget;
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });
    
    // Close modal
    const modalCloses = document.querySelectorAll('[data-modal-close]');
    modalCloses.forEach(function(closeBtn) {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close on backdrop click
    const modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const openModal = document.querySelector('.modal.active');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Focus trap
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(function() {
        modal.classList.add('hidden');
    }, 300);
}

// Initialize modals
document.addEventListener('DOMContentLoaded', initModals);

// ========== NOTIFICATION/TOAST ==========
function showNotification(message, type = 'info', duration = 5000) {
    const container = document.getElementById('notification-container') || createNotificationContainer();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type} transform translate-x-full transition-transform duration-300`;
    
    const icons = {
        success: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
        error: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
        warning: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>',
        info: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
    };
    
    const colors = {
        success: 'bg-green-50 border-green-200 text-green-700',
        error: 'bg-red-50 border-red-200 text-red-700',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
        info: 'bg-blue-50 border-blue-200 text-blue-700'
    };
    
    notification.innerHTML = `
        <div class="${colors[type]} border rounded-xl p-4 flex items-center space-x-3 shadow-lg">
            <div class="flex-shrink-0">${icons[type]}</div>
            <div class="flex-1">${message}</div>
            <button class="flex-shrink-0 hover:opacity-70 transition-opacity" onclick="this.closest('.notification').remove()">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Animate in
    setTimeout(function() {
        notification.classList.remove('translate-x-full');
    }, 10);
    
    // Auto remove
    setTimeout(function() {
        notification.classList.add('translate-x-full');
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, duration);
}

function createNotificationContainer() {
    const container = document.createElement('div');
    container.id = 'notification-container';
    container.className = 'fixed top-24 right-4 z-50 space-y-3 max-w-sm w-full';
    document.body.appendChild(container);
    return container;
}

// ========== RIPPLE EFFECT ==========
function initRippleEffect() {
    const rippleButtons = document.querySelectorAll('[data-ripple]');
    
    rippleButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple keyframes if not exists
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize ripple effect
document.addEventListener('DOMContentLoaded', initRippleEffect);

// ========== CONSOLE WELCOME MESSAGE ==========
console.log('%c🌞 Arya Enterprises', 'font-size: 24px; font-weight: bold; color: #332cad;');
console.log('%cSolar & Power Solutions', 'font-size: 14px; color: #8adb4e;');
console.log('%cPowering Your Future with Clean Energy', 'font-size: 12px; color: #58a6cc;');

// ========== END OF MAIN.JS ==========