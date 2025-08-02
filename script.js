// SANIA DEBBARMA
document.addEventListener('DOMContentLoaded', function() {
    
    
    initializePage();
    
    
    initSmoothScrolling();
    
    
    initNavbarEffects();
    
   
    initScrollAnimations();
    
    
    initButtonEffects();
    
    
    initParallaxEffects();
    
    
    initStatsCounter();
    
    
    initMobileMenu();
    
    
    initCursorTrail();
    
    
    initCardHoverEffects();
});


function initializePage() {
    document.body.classList.add('loading');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, 100);
    });
}


function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(30px)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
        }
        
        lastScrollY = currentScrollY;
    });
}


function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                
                if (element.classList.contains('feature-card')) {
                    element.classList.add('fade-in');
                } else if (element.classList.contains('stat-card')) {
                    element.classList.add('slide-in-left');
                } else if (element.classList.contains('testimonial-card')) {
                    element.classList.add('slide-in-right');
                }
            }
        });
    }, observerOptions);
    
    
    const animatedElements = document.querySelectorAll('.feature-card, .stat-card, .testimonial-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}


function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .nav-button');
    
    buttons.forEach(button => {
        // Ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '1';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}


function initParallaxEffects() {
    const heroSection = document.querySelector('.hero-section');
    const blobs = document.querySelectorAll('.blob');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        
        // Only apply parallax if we're in the hero section
        if (scrollY < heroHeight) {
            const rate = scrollY * -0.3;
            
            blobs.forEach((blob, index) => {
                const speed = 0.2 + (index * 0.1);
                blob.style.transform = `translateY(${scrollY * speed}px)`;
            });
            
            floatingIcons.forEach((icon, index) => {
                const speed = 0.1 + (index * 0.05);
                icon.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }
    });
}

// Stats counter animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    const animateCounter = function(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(function() {
            start += increment;
            if (start >= target) {
                element.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(start));
            }
        }, 16);
    };
    
    const formatNumber = function(num) {
        if (num >= 10000) {
            return (num / 1000).toFixed(0) + 'K+';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K+';
        } else if (num >= 100) {
            return num + '%';
        } else {
            return num + '+';
        }
    };
    
    // Observe stats section for counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                
                if (target) {
                    animateCounter(entry.target, target);
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(number => {
        statsObserver.observe(number);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'rgba(255, 255, 255, 0.95)';
                navLinks.style.backdropFilter = 'blur(20px)';
                navLinks.style.padding = '20px';
                navLinks.style.borderTop = '1px solid rgba(0, 0, 0, 0.1)';
                navLinks.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                navLinks.style.gap = '16px';
                navLinks.style.zIndex = '1000';
            } else {
                navLinks.style.display = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const mobileNavLinks = navLinks.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.style.display = 'none';
                isMenuOpen = false;
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.style.display = 'none';
                isMenuOpen = false;
            }
        });
    }
}

// Cursor trail effect
function initCursorTrail() {
    let isDesktop = window.innerWidth > 768;
    
    // Only enable on desktop
    if (isDesktop) {
        document.addEventListener('mousemove', function(e) {
            const trail = document.createElement('div');
            trail.style.position = 'fixed';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            trail.style.width = '4px';
            trail.style.height = '4px';
            trail.style.background = 'linear-gradient(135deg, #ec4899, #9333ea)';
            trail.style.borderRadius = '50%';
            trail.style.pointerEvents = 'none';
            trail.style.opacity = '0.7';
            trail.style.transform = 'scale(0)';
            trail.style.animation = 'trail 0.5s ease-out forwards';
            trail.style.zIndex = '9999';
            
            document.body.appendChild(trail);
            
            setTimeout(() => {
                trail.remove();
            }, 500);
        });
    }
    
    // Update on resize
    window.addEventListener('resize', function() {
        isDesktop = window.innerWidth > 768;
    });
}

// Card hover effects
function initCardHoverEffects() {
    // Feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Typing effect for hero title (optional)
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < originalText.length) {
                heroTitle.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledParallax = throttle(initParallaxEffects, 16);
const throttledNavbar = throttle(initNavbarEffects, 16);

// Easter egg: Konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konami.join(',')) {
        // Easter egg activated
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
    }
});

// Debug mode toggle (for development)
let debugMode = false;
document.addEventListener('keydown', function(e) {
    if (e.key === 'D' && e.ctrlKey && e.shiftKey) {
        debugMode = !debugMode;
        if (debugMode) {
            document.body.style.outline = '1px solid red';
            console.log('Debug mode enabled');
        } else {
            document.body.style.outline = 'none';
            console.log('Debug mode disabled');
        }
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        }, 0);
    });
}