/* ArtLife Web Studio — lead tugmalarini kuzatish (GA4 + Yandex Metrika).
   Hodisa document darajasida ushlanadi, shuning uchun keyin qo'shilgan havolalar ham hisoblanadi. */
(function () {
  var YM_ID = 113121866;

  function eventFor(href) {
    if (href.indexOf('tel:') === 0) return 'phone_click';
    if (href.indexOf('mailto:') === 0) return 'email_click';
    var url;
    try { url = new URL(href, location.href); } catch (err) { return null; }
    var host = url.hostname.replace(/^www\./, '');
    var path = url.pathname.replace(/\/+$/, '').toLowerCase();
    if (host === 't.me' && path === '/artlifestudio') return 'telegram_click';
    if (host === 'instagram.com' && path === '/artlifestudio.uz') return 'instagram_click';
    return null;
  }

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var name = eventFor(href);
    if (!name) return;

    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', name, { link_url: href, page_path: location.pathname });
      }
    } catch (err) {}
    try {
      if (typeof window.ym === 'function') {
        window.ym(YM_ID, 'reachGoal', name);
      }
    } catch (err) {}
  }, true);
})();
