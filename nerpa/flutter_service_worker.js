'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "0acdf7eb061e50527a0935d14721e9ec",
"assets/assets/images/airbnbLogo.png": "c59720d63dc3595a12e1c7e641a1bfa5",
"assets/assets/images/codeInLogo.webp": "47a7a717679b640ceb1b05d38c480a61",
"assets/assets/images/contactMail.webp": "68e841388612be0c5143e2932fb77d4f",
"assets/assets/images/contactMailDark.svg": "51cf7192327488da3d2a171280680c16",
"assets/assets/images/developerActivity.svg": "59389695208d7454c6607bed51ed4316",
"assets/assets/images/facebookLogo.png": "8ddf76a14a2e3ad3ba62b46d49a75a74",
"assets/assets/images/googleAssistant.svg": "c24ba79111a90758a3a472a906ab2901",
"assets/assets/images/googleAssistantLogo.webp": "e79c639294c805688be731921368c8f8",
"assets/assets/images/harvardLogo.png": "35ef5e915631be2c31ccdff55b53db29",
"assets/assets/images/jsFramework.svg": "b05ae5b575a7e1125610944dc152c35f",
"assets/assets/images/manOnTable.svg": "52be31441c8cf8a8a16bd7a228d428bf",
"assets/assets/images/nextuLogo.webp": "829ad0a1deef4d7295adfecdf12df2be",
"assets/assets/images/programmer.svg": "c1a95f7335cbfb730b937e19e8830a53",
"assets/assets/images/pwa.webp": "1a60e8a9e2c2d6a539c7692f27fe6790",
"assets/assets/images/pwaLogo.webp": "ee62cb58630f29a6e6201b49d4c03728",
"assets/assets/images/quoraLogo.png": "4b2938b9f5ea2f1ddbd45dccaff628bc",
"assets/assets/images/saayaHealthLogo.webp": "25018d29d5ab115bc51c3e9a2d92f90f",
"assets/assets/images/skill.svg": "3440939881da8339d1597e8d77cdf850",
"assets/assets/images/stanfordLogo.png": "3b758ef56d398145542e137daa28e392",
"assets/assets/images/talksCardBack.svg": "13780cdd0144cacdef25486e2c2503f8",
"assets/assets/lottie/build.json": "5b48414b9720779972a8d00f7e9a79e6",
"assets/assets/lottie/codingPerson.json": "8bebce2fdac285a60884322337a736d0",
"assets/assets/lottie/email.json": "8dea429b7a589d01055d32cb1eac80fa",
"assets/assets/lottie/email_.json": "20ebee5cf232938d1b25fcd5a1b747b8",
"assets/assets/lottie/landingPerson.json": "5c88cc05d811273d867f7d0d36b6263d",
"assets/assets/lottie/splashAnimation.json": "0166c704c0098e58bcd26cfaec756f77",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "26f72015d1219ce46d5037ebd3997691",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "eb2682e33f25cd8f1fc59011497c35f8",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "92cc63b5d7f719d7dcba9138f657d635",
"/": "92cc63b5d7f719d7dcba9138f657d635",
"main.dart.js": "de9a61c8e20a126f9bdc122604fc3fe0",
"manifest.json": "f37332ab39fa6fecc5c295a6faf7309a",
"version.json": "79d99cf536f8201c4f6e7d30979296ef"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
