(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  for (const id of ['colleague-tabs', 'outdoor-tabs', 'compare-tabs']) {
    const track = document.getElementById(id);
    if (!track) continue;
    const wrapper = document.createElement('div');
    wrapper.className = 'case-carousel';
    track.before(wrapper);
    const makeArrow = (label, symbol, direction) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'case-scroll';
      button.textContent = symbol;
      button.setAttribute('aria-label', label);
      button.setAttribute('aria-controls', id);
      button.addEventListener('click', () => track.scrollBy({left: direction * track.clientWidth * .8, behavior: motion.matches ? 'instant' : 'smooth'}));
      return button;
    };
    const previous = makeArrow('Scroll to previous scenes', '‹', -1);
    const next = makeArrow('Scroll to next scenes', '›', 1);
    wrapper.append(previous, track, next);
    const update = () => {
      previous.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
    };
    track.addEventListener('scroll', update, {passive: true});
    new ResizeObserver(update).observe(track);
    update();
    let drag = null;
    let suppressClick = false;
    track.addEventListener('dragstart', event => event.preventDefault());
    track.addEventListener('pointerdown', event => {
      suppressClick = false;
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      drag = {id: event.pointerId, x: event.clientX, scroll: track.scrollLeft, moved: false};
    });
    track.addEventListener('pointermove', event => {
      if (!drag || event.pointerId !== drag.id) return;
      const dx = event.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 6) {
        drag.moved = true;
        track.setPointerCapture(event.pointerId);
        track.classList.add('is-dragging');
      }
      if (drag.moved) {
        event.preventDefault();
        track.scrollLeft = drag.scroll - dx;
      }
    });
    const finish = event => {
      if (!drag || event.pointerId !== drag.id) return;
      suppressClick = drag.moved;
      drag = null;
      track.classList.remove('is-dragging');
      if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    };
    track.addEventListener('pointerup', finish);
    track.addEventListener('pointercancel', finish);
    track.addEventListener('lostpointercapture', finish);
    track.addEventListener('pointerleave', event => { if (drag && !drag.moved) finish(event); });
    track.addEventListener('click', event => {
      if (suppressClick && event.detail !== 0) {
        event.preventDefault();
        event.stopImmediatePropagation();
        suppressClick = false;
      }
    }, true);
    track.addEventListener('keydown', event => {
      const buttons = [...track.querySelectorAll('button')];
      const index = buttons.indexOf(event.target);
      if (index < 0) return;
      let target;
      if (event.key === 'ArrowRight') target = Math.min(index + 1, buttons.length - 1);
      else if (event.key === 'ArrowLeft') target = Math.max(index - 1, 0);
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = buttons.length - 1;
      else return;
      event.preventDefault();
      buttons[target].click();
      buttons[target].focus({preventScroll: true});
      buttons[target].scrollIntoView({block: 'nearest', inline: 'nearest', behavior: motion.matches ? 'instant' : 'smooth'});
    });
  }
})();
