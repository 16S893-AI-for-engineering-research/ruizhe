const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) revealObserver.unobserve(entry.target), entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.appear').forEach((element) => revealObserver.observe(element));

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
