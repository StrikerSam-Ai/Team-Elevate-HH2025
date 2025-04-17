/* filepath: c:\Hackathons\Hackhazard 2025\Team-Elevate-HH2025\core\static\js\main.js */
// Main JavaScript file for the Django templates
document.addEventListener('DOMContentLoaded', function() {
    console.log('Application loaded successfully');
    
    // Set active navigation link based on current URL
    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks.length > 0) {
        const currentPath = window.location.pathname;
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }

    // Handle form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    // Add error styling if needed
                    field.style.borderColor = '#ff3860';
                } else {
                    field.style.borderColor = '';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields');
            }
        });
    });
}); 