// EN/ID language toggle. English text stays in the HTML; Indonesian comes from window.I18N (see i18n-id.js).
(function () {
  const INLINE = ['B', 'BR', 'STRONG', 'EM', 'I'];
  const SKIP = ['SCRIPT', 'STYLE', 'IFRAME'];
  const norm = h => h.replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  const dict = () => window.I18N || {};
  function tr(k) {
    const d = dict();
    if (k in d) return d[k];
    const l = k.toLowerCase();
    for (const x in d) if (x.toLowerCase() === l) return d[x];
    return null;
  }

  function items() {
    return [...document.querySelectorAll('nav *, main *, footer *, dialog *')].filter(el =>
      !SKIP.includes(el.tagName) && !el.closest('[data-chips],[data-keep]') &&
      [...el.children].every(c => INLINE.includes(c.tagName)) && el.textContent.trim());
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    items().forEach(el => {
      if (el.dataset.en === undefined) {
        if (tr(norm(el.innerHTML)) === null) return;
        el.dataset.en = el.innerHTML;
      }
      const t = tr(norm(el.dataset.en));
      el.innerHTML = lang === 'id' && t ? t : el.dataset.en;
    });
  }

  let lang = 'en';
  try { lang = localStorage.getItem('lang') || 'en'; } catch (e) {}

  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.setAttribute('data-keep', '');
  btn.setAttribute('aria-label', 'Switch language / Ganti bahasa');
  function paint() {
    const on = 'color:#fff;font-weight:700', off = 'opacity:.55';
    btn.innerHTML = '<span style="' + (lang === 'en' ? on : off) + '">English</span> | <span style="' + (lang === 'id' ? on : off) + '">Indonesia</span>';
  }
  btn.addEventListener('click', () => {
    lang = lang === 'en' ? 'id' : 'en';
    try { localStorage.setItem('lang', lang); } catch (e) {}
    paint();
    apply(lang);
  });

  const dd = document.querySelector('.dd');
  if (dd) {
    const box = document.createElement('div');
    box.style.cssText = 'display:flex;gap:10px;align-items:center';
    dd.replaceWith(box);
    box.append(btn, dd);
  }
  paint();
  if (lang === 'id') apply('id');
})();
