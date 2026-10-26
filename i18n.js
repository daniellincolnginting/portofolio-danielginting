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
  btn.className = 'btn lang';
  btn.setAttribute('data-keep', '');
  btn.setAttribute('aria-label', 'Switch language / Ganti bahasa');
  function paint() {
    const on = 'color:#fff;font-weight:700', off = 'opacity:.55';
    btn.innerHTML =
      '<span style="' + (lang === 'en' ? on : off) + '"><span class="f">English</span><span class="s">EN</span></span> | ' +
      '<span style="' + (lang === 'id' ? on : off) + '"><span class="f">Indonesia</span><span class="s">ID</span></span>';
  }
  btn.addEventListener('click', () => {
    lang = lang === 'en' ? 'id' : 'en';
    try { localStorage.setItem('lang', lang); } catch (e) {}
    paint();
    apply(lang);
  });

  // Desktop: language button sits next to Download CV. Phone: it moves into the top bar, beside the menu button.
  const dd = document.querySelector('.dd');
  const box = document.createElement('div');
  box.style.cssText = 'display:flex;gap:10px;align-items:center';
  if (dd) { dd.replaceWith(box); box.append(dd); }
  const mq = window.matchMedia ? window.matchMedia('(max-width:860px)') : { matches: false, addEventListener() {} };
  function place() {
    const wrap = document.querySelector('nav .wrap');
    const menu = wrap && wrap.querySelector('.menu');
    if (mq.matches && menu) wrap.insertBefore(btn, menu);
    else box.insertBefore(btn, box.firstChild);
  }
  mq.addEventListener('change', place);
  place();
  paint();
  if (lang === 'id') apply('id');
})();
