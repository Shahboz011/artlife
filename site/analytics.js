/* ArtLife Studio — analytics
   Barcha sozlamalar shu yerda. ID ni o'zgartirish uchun faqat shu faylni tahrirlang. */
(function () {
  var GA_ID = 'G-6W3MP9377W'; // GA4 Measurement ID (Admin > Data streams)

  /* Mijoz saytlari: domen -> loyiha nomi.
     Yangi loyiha qo'shilganda shu ro'yxatga bitta qator qo'shing. */
  var PROJECTS = {
    'munfareedlogistics.com': 'munfareed',
    'aura-agency.uz':         'aura',
    'aurum-tabac.uz':         'aurum',
    'myferma.uz':             'chovkar',
    'humotib.uz':             'humotib',
    'kbrdentalclinic.uz':     'kbr',
    'rizqana.uz':             'rizqana',
    'wallet-z.uz':            'walletz'
  };

  if (GA_ID.indexOf('XXXX') !== -1) return; // ID kiritilmagan — hech narsa yuklanmaydi

  // Lokal test trafigini hisobga olmaslik
  var h = location.hostname;
  if (h === 'localhost' || h === '127.0.0.1' || h === '') return;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());

  /* Cross-domain linker ATAYLAB o'chirilgan.
     U faqat mijoz saytida ham shu GA4 tegi bo'lsa ishlaydi; aks holda
     havolalarga foydasiz _gl=... parametri qo'shiladi.
     Mijoz saytiga kirish imkoni paydo bo'lsa:
       1) client-snippet/artlife-analytics.js ni o'sha saytga ulang;
       2) quyidagi qatorni linker sozlamasi bilan almashtiring.
     Hozircha atribut manbasi UTM parametrlari orqali uzatiladi
     (havolalarda: utm_source=artlife-studio.uz). */
  gtag('config', GA_ID);

  /* Bosishlarni kuzatish.
     GA4 tel: va mailto: havolalarini o'zi hisoblamaydi — qo'lda yuboramiz. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';

    // 1) Aloqa havolalari
    var method = null;
    if (href.indexOf('tel:') === 0) method = 'phone';
    else if (href.indexOf('mailto:') === 0) method = 'email';
    else if (href.indexOf('t.me/') !== -1) method = 'telegram';
    else if (href.indexOf('instagram.com') !== -1) method = 'instagram';

    if (method) {
      gtag('event', 'contact_click', {
        method: method,
        link_url: href,
        page_path: location.pathname
      });
      return;
    }

    // 2) Mijoz saytiga o'tish
    if (href.indexOf('http') !== 0) return;
    var host;
    try { host = new URL(href, location.href).hostname.replace(/^www\./, ''); }
    catch (err) { return; }

    var project = PROJECTS[host];
    if (!project) return;

    gtag('event', 'project_visit', {
      project: project,
      client_domain: host,
      from_page: location.pathname   // index.html dan yoki loyiha sahifasidanmi
    });
  }, true);
})();
