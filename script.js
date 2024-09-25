// Intersection Observer to highlight active section in the top navbar
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Adjusted threshold
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        const navLink = document.querySelector(`a[href="#${entry.target.id}"]`);
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe each section
sections.forEach(section => observer.observe(section));

// Hamburger Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const nav = document.querySelector('.nav');
const mainContent = document.querySelector('main');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('is-active');

    if (nav.classList.contains('active')) {
        const navHeight = nav.offsetHeight;
        mainContent.style.marginTop = `${navHeight}px`;
    } else {
        mainContent.style.marginTop = '0';
    }
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('is-active');
            mainContent.style.marginTop = '0';
        }
    });
});


// Create the project image tooltip element
const projectImage = document.createElement('div');
projectImage.classList.add('project-image');
const projectImg = document.createElement('img');
projectImage.appendChild(projectImg);
document.body.appendChild(projectImage);

// Add event listeners to each project item
document.querySelectorAll('.project-item').forEach(item => {
  item.addEventListener('mouseenter', e => {
    const imgSrc = item.getAttribute('data-image');
    projectImg.src = imgSrc;
    projectImage.style.display = 'block';
  });

  item.addEventListener('mousemove', e => {
    // Position the image near the cursor
    projectImage.style.left = (e.pageX + 20) + 'px'; // 20px offset to the right
    projectImage.style.top = (e.pageY + 20) + 'px';  // 20px offset to the bottom
  });

  item.addEventListener('mouseleave', () => {
    projectImage.style.display = 'none';
  });

  // Existing click handler to open the project link
  item.addEventListener('click', () => {
    const link = item.getAttribute('data-link');
    window.open(link, '_blank');
  });
});