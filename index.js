
const mainContainerElement = document.getElementById('main-container');
const projectContainerElement = document.getElementById('project-container');
const projectInnerContainerElement = document.getElementById('project-inner-container');
const subTextElement = document.getElementById('subText');
const cursorElement = document.getElementById('cursor');
const sections = document.querySelectorAll("section");

typeAnimation();
mainContainerElement.addEventListener('mousemove', (e) => {
    mouseMoved(e);
})
document.addEventListener('mouseup', (e) => {
    cursorElement.style.transform = "unset";
    cursorElement.style.display = "block";
})
document.addEventListener('mousedown', (e) => {
    cursorElement.style.transform = "scale(.8)"
})
projectContainerElement.addEventListener('mousedown', (e) => {
    cursorElement.style.display = "none"
})
projectInnerContainerElement.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    cursorElement.style.transform = "scale(.8)"
    cursorElement.style.display = "block";
})

document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
})

function mouseMoved(event) {
    const cursorElement = document.getElementById('cursor');
    const rect = mainContainerElement.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = event.clientX - centerX;
    const offsetY = event.clientY - centerY;

    const moveX = offsetX / 35;
    const moveY = offsetY / 35;

    mainContainerElement.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
    cursorElement.style.top = `${event.clientY}px`;
    cursorElement.style.left = `${event.clientX}px`;
}

function typeAnimation() {
    const text = "Let's collaborate to create applications worthy of being published.";
    if (text) {
    const characters = text.split("");
    characters.forEach((character, index) => {
        setTimeout(() => {
            subTextElement.textContent = subTextElement.textContent.concat(character);
        }, 50 * index);
    });
    }
}

let activeSection = null;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && activeSection !== entry.target) {
            activeSection = entry.target;
            document.title = entry.target.dataset.title;
        }
    });
},
{
    threshold: .6
})

sections.forEach(section => observer.observe(section));