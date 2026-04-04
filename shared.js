// Cursor
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  if (cursorRing) { cursorRing.style.left = rx + 'px'; cursorRing.style.top = ry + 'px'; }
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a, button, .card').forEach(el => {
  el.addEventListener('mouseenter', () => { if(cursorRing) { cursorRing.style.width='52px'; cursorRing.style.height='52px'; cursorRing.style.borderColor='rgba(184,157,232,0.7)'; } });
  el.addEventListener('mouseleave', () => { if(cursorRing) { cursorRing.style.width='32px'; cursorRing.style.height='32px'; cursorRing.style.borderColor='rgba(184,157,232,0.4)'; } });
});

// Starfield
function buildStarfield() {
  const sf = document.getElementById('starfield');
  if (!sf) return;
  for (let i = 0; i < 90; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2 + 0.4;
    s.style.cssText = `width:${size}px;height:${size}px;top:${Math.random()*100}%;left:${Math.random()*100}%;--d:${(Math.random()*4+2).toFixed(1)}s;--o:${(Math.random()*0.55+0.1).toFixed(2)};animation-delay:${(Math.random()*6).toFixed(1)}s;`;
    sf.appendChild(s);
  }
}
buildStarfield();

// Scroll-triggered fade-ins
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = (i * 0.08) + 's';
      entry.target.classList.add('fade-up');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
