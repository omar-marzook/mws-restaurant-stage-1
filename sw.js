const staticCacheName = 'restaurant-review-v2';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName)
        .then(cache => cache.addAll(
            [
                '/css/styles.css',
                '/index.html',
                '/js/main.js',
                '/js/dbhelper.js',
                '/js/restaurant_info.js',
                '/data/restaurants.json',
                '/restaurant.html?id=1',
                '/restaurant.html?id=2',
                '/restaurant.html?id=3',
                '/restaurant.html?id=4',
                '/restaurant.html?id=5',
                '/restaurant.html?id=6',
                '/restaurant.html?id=7',
                '/restaurant.html?id=8',
                '/restaurant.html?id=9',
                '/restaurant.html?id=10'
            ]
        ))
    );
});


self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request)
                .then(fetchResponse => {
                    return caches.open(staticCacheName)
                        .then(cache => {
                            cache.put(event.request, fetchResponse.clone());
                            return fetchResponse;
                        });
                });
        })
        .catch(error => {
            return console.log(`No Network Connection!, ${error}`);
        })
    );
});


/* Delete Old Cache Version */
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.delete('resturant-review-v1')
    );
});