// Performance optimization: Use requestAnimationFrame for scroll events
let ticking = false;
let lastScrollY = 0;

// Header scroll behavior
function updateHeader() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;

    if (scrollY > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }

    lastScrollY = scrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateHeader();
            ticking = false;
        });
        ticking = true;
    }
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Project cards loading animation
const projectCards = document.querySelectorAll('.project-card');
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '50px'
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

projectCards.forEach(card => {
    observer.observe(card);
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Projects data
const projects = [
    {
        title: 'E-commerce Security Suite',
        description: 'A comprehensive security solution for e-commerce platforms',
        image: 'assets/images/project1.jpg',
        tags: ['Security', 'PHP', 'JavaScript'],
        link: '#'
    },
    {
        title: 'Cloud Infrastructure Monitor',
        description: 'Real-time monitoring solution for cloud infrastructure',
        image: 'assets/images/project2.jpg',
        tags: ['AWS', 'Python', 'React'],
        link: '#'
    },
    // Add more projects as needed
];

// Dynamically populate projects
function populateProjects() {
    const projectsGrid = document.querySelector('.projects__grid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('article');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-card__image">
                <img data-src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-card__content">
                <h3 class="project-card__title">${project.title}</h3>
                <p class="project-card__description">${project.description}</p>
                <div class="project-card__tags">
                    ${project.tags.map(tag => `<span class="project-card__tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        projectCard.addEventListener('click', () => {
            window.location.href = project.link;
        });
        
        projectsGrid.appendChild(projectCard);
    });
}

// Initialize projects when DOM is loaded
document.addEventListener('DOMContentLoaded', populateProjects);