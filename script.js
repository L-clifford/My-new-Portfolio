// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links and sections
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Show home section by default
    showSection('home');
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            showSection(targetSection);
            updateActiveNav(this);
        });
    });
    
    // Function to show specific section
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }
    
    // Function to update active navigation
    function updateActiveNav(activeLink) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
    
    // Smooth scroll to section function
    window.scrollToSection = function(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            showSection(sectionId);
            updateActiveNav(document.querySelector(`[href="#${sectionId}"]`));
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    // Portfolio item click functionality
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add your portfolio item click logic here
            console.log('Portfolio item clicked:', this.querySelector('h3').textContent);
            // You can add modal popup, redirect to project page, etc.
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.send-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                // Show success message
                alert(`Thank you ${name}! Your message has been sent successfully. I will get back to you soon.`);
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Optionally scroll to home section
                showSection('home');
                updateActiveNav(document.querySelector('[href="#home"]'));
            }, 1500);
        });
    }
    
    // Add smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Add hover effects for portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for scroll animations
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Return to home section on Escape key
            showSection('home');
            updateActiveNav(document.querySelector('[href="#home"]'));
        }
    });
    
    // Add touch support for mobile devices
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const currentSection = document.querySelector('.section.active');
        const currentSectionId = currentSection.id;
        
        if (touchEndY < touchStartY - swipeThreshold) {
            // Swipe up - go to next section
            navigateToNextSection(currentSectionId);
        } else if (touchEndY > touchStartY + swipeThreshold) {
            // Swipe down - go to previous section
            navigateToPreviousSection(currentSectionId);
        }
    }
    
    function navigateToNextSection(currentId) {
        const sectionOrder = ['home', 'portfolio', 'about', 'contact'];
        const currentIndex = sectionOrder.indexOf(currentId);
        const nextIndex = (currentIndex + 1) % sectionOrder.length;
        const nextSection = sectionOrder[nextIndex];
        
        showSection(nextSection);
        updateActiveNav(document.querySelector(`[href="#${nextSection}"]`));
    }
    
    function navigateToPreviousSection(currentId) {
        const sectionOrder = ['home', 'portfolio', 'about', 'contact'];
        const currentIndex = sectionOrder.indexOf(currentId);
        const prevIndex = currentIndex === 0 ? sectionOrder.length - 1 : currentIndex - 1;
        const prevSection = sectionOrder[prevIndex];
        
        showSection(prevSection);
        updateActiveNav(document.querySelector(`[href="#${prevSection}"]`));
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
