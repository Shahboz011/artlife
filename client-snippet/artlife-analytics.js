/* ArtLife Studio — cross-domain tracking (mijoz sayti uchun)
   Bu faylni mijoz saytiga qo'ying va <head> ichida ulang:
     <script src="/artlife-analytics.js" defer></script>
   Diqqat: mijozning O'Z GA4 tegi bo'lsa, uni o'chirmang — ikkalasi birga ishlaydi. */
(function () {
  var GA_ID = 'G-6W3MP9377W'; // ArtLife Studio property

  var DOMAINS = [
    'artlife-studio.uz',
    'munfareedlogistics.com',
    'aura-agency.uz',
    'aurum-tabac.uz',
    'myferma.uz',
    'humotib.uz',
    'kbrdentalclinic.uz',
    'rizqana.uz',
    'wallet-z.uz'
  ];

  var h = location.hostname;
  if (h === 'localhost' || h === '127.0.0.1' || h === '') return;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, {
    linker: { domains: DOMAINS, accept_incoming: true }
  });
})();
