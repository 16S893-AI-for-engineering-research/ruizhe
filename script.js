const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) revealObserver.unobserve(entry.target), entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.appear').forEach((element) => revealObserver.observe(element));

// Mouse interactions are used only when a precise pointer is available.
const finePointer = window.matchMedia('(pointer: fine)');
if (finePointer.matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.body.classList.add('custom-cursor');
  const dot = document.createElement('div');
  const orbit = document.createElement('div');
  dot.className = 'mouse-dot';
  orbit.className = 'mouse-orbit';
  document.body.append(dot, orbit);

  let mouseX = 0;
  let mouseY = 0;
  let orbitX = 0;
  let orbitY = 0;
  let frame;
  const drawCursor = () => {
    orbitX += (mouseX - orbitX) * 0.15;
    orbitY += (mouseY - orbitY) * 0.15;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    orbit.style.transform = `translate3d(${orbitX}px, ${orbitY}px, 0)`;
    frame = requestAnimationFrame(drawCursor);
  };
  drawCursor();

  document.addEventListener('pointermove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    document.body.classList.add('cursor-ready');
  });

  const interactiveSelector = 'a, button, [role="button"]';
  document.querySelectorAll(interactiveSelector).forEach((element) => {
    element.addEventListener('pointerenter', () => document.body.classList.add('cursor-hover'));
    element.addEventListener('pointerleave', () => document.body.classList.remove('cursor-hover'));
  });

  document.addEventListener('pointerdown', (event) => {
    const ripple = document.createElement('span');
    ripple.className = 'click-ripple';
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;
    document.body.append(ripple);
    setTimeout(() => ripple.remove(), 650);

    const target = event.target.closest(interactiveSelector);
    if (target) {
      target.classList.remove('mouse-pressed');
      requestAnimationFrame(() => target.classList.add('mouse-pressed'));
      setTimeout(() => target.classList.remove('mouse-pressed'), 360);
    }
  });

  window.addEventListener('beforeunload', () => cancelAnimationFrame(frame));
}

// Easter egg: enter "forecast" to reveal a tiny field-note transmission.
let keystrokes = '';
document.addEventListener('keydown', (event) => {
  if (event.key.length !== 1) return;
  keystrokes = (keystrokes + event.key.toLowerCase()).slice(-8);
  if (keystrokes !== 'forecast') return;
  keystrokes = '';
  const note = document.createElement('div');
  note.className = 'field-note';
  note.innerHTML = '<span>✦</span> FIELD NOTE RECEIVED <small>Curiosity is a useful instrument.</small>';
  document.body.append(note);
  setTimeout(() => note.remove(), 3600);
});
