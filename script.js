// Brittany Chiang v4 Inspired Portfolio Logic

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Mousemove Spotlight Effect
    const spotlight = document.getElementById('cursor-spotlight');
    if (spotlight) {
        document.addEventListener('mousemove', (e) => {
            spotlight.style.setProperty('--x', `${e.clientX}px`);
            spotlight.style.setProperty('--y', `${e.clientY}px`);
        });
    }

    // 3. Scroll-Spy Navigation (IntersectionObserver)
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length && navLinks.length) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -50% 0px', // Trigger when section occupies the upper-middle region
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${activeId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }
});

// 4. Copy to Clipboard Utility
function copyToClipboard(text, tooltipId) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showTooltip(tooltipId);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            fallbackCopy(text, tooltipId);
        });
    } else {
        fallbackCopy(text, tooltipId);
    }
}

function fallbackCopy(text, tooltipId) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // Avoid scrolling page
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showTooltip(tooltipId);
        }
    } catch (err) {
        console.error('Fallback copy failed: ', err);
    }
    document.body.removeChild(textArea);
}

function showTooltip(tooltipId) {
    const tooltip = document.getElementById(tooltipId);
    if (tooltip) {
        tooltip.classList.add('show');
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 2000);
    }
}

// 5. Contact Form Submission simulation
function handleFormSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('form-submit-btn');
    const originalContent = submitBtn.innerHTML;
    
    // Disable inputs
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => input.disabled = true);
    
    // Show sending loader
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending Message... <i data-lucide="loader" class="spin"></i>';
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Simulate callback
    setTimeout(() => {
        submitBtn.innerHTML = 'Sent Successfully! <i data-lucide="check"></i>';
        submitBtn.style.borderColor = '#10b981';
        submitBtn.style.color = '#10b981';
        submitBtn.style.background = 'rgba(16, 185, 129, 0.05)';
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Reset inputs and state
        setTimeout(() => {
            form.reset();
            inputs.forEach(input => input.disabled = false);
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
            submitBtn.style.borderColor = '';
            submitBtn.style.color = '';
            submitBtn.style.background = '';
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 3000);
        
    }, 1500);
}
