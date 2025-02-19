// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navItems = document.querySelector('.nav-items');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open'); // Alterado para 'open' para corresponder ao HTML
    navItems.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navItems.contains(e.target)) {
        menuBtn.classList.remove('open'); // Alterado para 'open'
        navItems.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Typing animation (já inicializado no HTML com Typed.js)
// Removido para evitar duplicação

// Enhanced scroll animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 300;
        if (scrolled >= sectionTop) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Form animations
const formInputs = document.querySelectorAll('.input-container input, .input-container textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Preloader
const preloader = document.querySelector('.preloader');
const counter = document.querySelector('.counter');
let count = 0;

const updateCounter = () => {
    counter.textContent = count + '%';
    if (count < 100) {
        count++;
        setTimeout(updateCounter, 20);
    } else {
        preloader.classList.add('hidden');
    }
};

if (preloader && counter) {
    updateCounter();
}

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // Add hover effect to links
    document.querySelectorAll('a, button').forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
        });
        
        link.addEventListener('mouseleave', () => {
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
        });
    });
}

// Noise effect
const noise = document.getElementById('noise');

if (noise) {
    const ctx = noise.getContext('2d');
    noise.width = window.innerWidth;
    noise.height = window.innerHeight;

    function generateNoise() {
        const imageData = ctx.createImageData(noise.width, noise.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 255;
            data[i] = value;
            data[i + 1] = value;
            data[i + 2] = value;
            data[i + 3] = 15;
        }
        
        ctx.putImageData(imageData, 0, 0);
    }

    function animateNoise() {
        generateNoise();
        requestAnimationFrame(animateNoise);
    }

    animateNoise();
}

// Project Modal (se houver projetos no futuro)
const projects = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution built with React and Node.js.',
        images: [
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800',
            'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800',
            'https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&w=800'
        ],
        tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Stripe'],
        liveLink: '#',
        codeLink: '#'
    }
];

const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');
const projectCards = document.querySelectorAll('.project-card');

if (modalOverlay && modal && modalClose) {
    function openModal(project) {
        const modalImage = modal.querySelector('.modal-image');
        const modalThumbnails = modal.querySelector('.modal-thumbnails');
        const modalTitle = modal.querySelector('.modal-title');
        const modalDescription = modal.querySelector('.modal-description');
        const modalTags = modal.querySelector('.modal-tags');
        const modalLinks = modal.querySelector('.modal-links');
        
        modalImage.src = project.images[0];
        modalThumbnails.innerHTML = project.images.map((img, index) => `
            <img src="${img}" alt="Thumbnail ${index + 1}" 
                 class="thumbnail ${index === 0 ? 'active' : ''}"
                 onclick="changeImage(${index}, this)">
        `).join('');
        
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        
        modalTags.innerHTML = project.tags.map(tag => `
            <span class="modal-tag">${tag}</span>
        `).join('');
        
        const [liveLink, codeLink] = modalLinks.querySelectorAll('a');
        liveLink.href = project.liveLink;
        codeLink.href = project.codeLink;
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function changeImage(index, thumbnail) {
        const modalImage = modal.querySelector('.modal-image');
        const thumbnails = modal.querySelectorAll('.thumbnail');
        
        modalImage.src = thumbnail.src;
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => openModal(projects[index]));
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}

// Initialize EmailJS (se necessário no futuro)
(function() {
    emailjs.init("YOUR_SERVICE_ID");
})();

// Handle contact form submission (se houver um formulário no futuro)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = this;
        const formStatus = form.querySelector('.form-status');
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        const templateParams = {
            to_name: 'Code With Panda',
            user_name: document.getElementById('name').value,
            user_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                formStatus.innerHTML = '<div class="success-message">Message sent successfully! I\'ll get back to you soon.</div>';
                form.reset();
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                    }, 5000);
                }, 2000);
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                formStatus.innerHTML = '<div class="error-message">Oops! Something went wrong. Please try again.</div>';
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                if (error.text) {
                    console.error('Error details:', error.text);
                }
            });
    });
}