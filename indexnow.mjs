// Sends every URL from site/sitemap.xml to IndexNow (Yandex, Bing and others).
// Run after each deploy:  node indexnow.mjs
// The key file site/<KEY>.txt must be live on https://artlife-studio.uz/ first.
import fs from 'node:fs';

const HOST = 'artlife-studio.uz';
const KEY = '7252b0d61bfb1e93e03e0bd39701cba3';

const sitemap = fs.readFileSync(new URL('./site/sitemap.xml', import.meta.url), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

for (const endpoint of ['https://yandex.com/indexnow', 'https://api.indexnow.org/indexnow']) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  });
  console.log(`${endpoint}: ${res.status} ${res.statusText} (${urlList.length} URLs)`);
}
