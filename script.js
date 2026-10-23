// Build colorful chips from data-chips="A,B,C"
document.querySelectorAll('[data-chips]').forEach(el => {
  el.classList.add('chips');
  el.dataset.chips.split(',').forEach((t, i) => {
    const s = document.createElement('span');
    s.className = 'chip c' + (i % 6);
    s.textContent = t.trim();
    el.appendChild(s);
  });
});

// Experience filter tabs
const tabs = document.querySelectorAll('.tabs button');
tabs.forEach(b => b.addEventListener('click', () => {
  tabs.forEach(x => x.classList.remove('on'));
  b.classList.add('on');
  document.querySelectorAll('.exp').forEach(c => {
    c.hidden = b.dataset.f !== 'all' && !c.dataset.cat.split(' ').includes(b.dataset.f);
  });
}));

// CV links (edit these two paths once, they apply to every page)
const CV = { id: 'assets/CV-Indonesia_Daniel Lincoln Ginting.pdf', en: 'assets/CV-English_Daniel Lincoln Ginting.pdf' };
document.querySelectorAll('#cv-id').forEach(a => a.href = CV.id);
document.querySelectorAll('#cv-en').forEach(a => a.href = CV.en);

// Pop-ups (dialogs) and image lightbox
document.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => document.getElementById(b.dataset.open).showModal()));
document.querySelectorAll('dialog').forEach(d => d.addEventListener('click', e => { if (e.target === d) d.close(); }));
const lb = document.getElementById('lb');
if (lb) document.querySelectorAll('.shot img').forEach(i => i.addEventListener('click', () => { lb.querySelector('img').src = i.src; lb.showModal(); }));
