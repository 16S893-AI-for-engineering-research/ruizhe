// Small interactions keep the site feeling alive without getting in the way.
const glow = document.querySelector('.cursor-glow');
if (glow && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    glow.animate({ left: `${event.clientX}px`, top: `${event.clientY}px` }, {
      duration: 700, fill: 'forwards', easing: 'ease-out'
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

// Easter egg: type "hello" anywhere on the site.
let secret = '';
document.addEventListener('keydown', (event) => {
  if (event.key.length !== 1) return;
  secret = (secret + event.key.toLowerCase()).slice(-5);
  if (secret === 'hello') {
    document.body.classList.toggle('party-mode');
    secret = '';
    const message = document.createElement('div');
    message.className = 'secret-message';
    message.textContent = document.body.classList.contains('party-mode') ? '✦ you found a little joy ✦' : 'back to business';
    document.body.append(message);
    setTimeout(() => message.remove(), 2600);
  }
});
