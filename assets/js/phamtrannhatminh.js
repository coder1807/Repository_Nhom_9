// Smooth Scroll
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// CV Download Alert
document.getElementById('cv-link').addEventListener('click', (e) => {
    e.preventDefault();
    alert('CV đang tải... (Thay bằng link thật khi có)');
});

// Mouse Trail Effect
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 500);
});

// Random Floating Circles
function createFloatingCircle() {
    const circle = document.createElement('div');
    circle.className = 'absolute w-16 h-16 bg-teal-500 opacity-10 rounded-full blur-xl animate-float';
    circle.style.left = `${Math.random() * 100}vw`;
    circle.style.top = `${Math.random() * 100}vh`;
    document.body.appendChild(circle);
    setTimeout(() => circle.remove(), 10000);
}

setInterval(createFloatingCircle, 2000);