const C='meditech-v1',F=['./','index.html','css/style.css','js/tests-data.js','js/app.js','manifest.json','images/logo.png','images/flyer.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
