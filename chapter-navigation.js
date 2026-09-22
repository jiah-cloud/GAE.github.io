(() => {
  const sidebar = document.querySelector('.chapter-sidebar');
  const toggle = sidebar?.querySelector('.chapter-toggle');
  if (!sidebar || !toggle) return;
  const links = [...sidebar.querySelectorAll('a')];
  const chapters = links.map(link => document.querySelector(link.hash));
  const compactViewport = window.matchMedia('(max-width: 1199px)');
  links.forEach(link => {
    const label = link.querySelector('b').textContent;
    link.setAttribute('aria-label', label);
    link.title = label;
  });
  function setExpanded(expanded, restoreFocus = false) {
    sidebar.classList.toggle('is-expanded', expanded);
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.setAttribute('aria-label', expanded ? 'Collapse page chapters' : 'Expand page chapters');
    toggle.title = toggle.getAttribute('aria-label');
    if (restoreFocus) toggle.focus({ preventScroll: true });
  }
  sidebar.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') setExpanded(true);
  });
  sidebar.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse') setExpanded(false);
  });
  toggle.addEventListener('click', () => setExpanded(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('click', event => {
    if (!sidebar.contains(event.target)) setExpanded(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setExpanded(false, sidebar.contains(document.activeElement));
    }
  });
  links.forEach(link => link.addEventListener('click', () => setExpanded(false, compactViewport.matches)));
  compactViewport.addEventListener('change', () => setExpanded(false, sidebar.contains(document.activeElement)));
  let pending = false;
  function update() {
    pending = false;
    let active = 0;
    chapters.forEach((section, index) => { if (section && section.getBoundingClientRect().top <= 150) active = index; });
    links.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', () => {
    if (!pending) { pending = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
