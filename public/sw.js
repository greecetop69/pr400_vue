const VERSION_URL = '/version.json'
let lastKnownVersion = null

self.addEventListener('fetch', async (event) => {
  if (event.request.url.endsWith('version.json')) {
    try {
      const response = await fetch(VERSION_URL, { cache: 'no-store' })
      const data = await response.json()

      if (lastKnownVersion && lastKnownVersion !== data.version) {
        console.log('[SW] 🔥 Найден новый билд!', data.version)

        self.registration.showNotification('Доступен новый билд!', {
          body: `Версия: ${data.version}. Обновите страницу.`,
          icon: '/icon.png',
        })

        // Оповещаем клиентов
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({ type: 'NEW_BUILD', version: data.version })
          })
        })
      }

      lastKnownVersion = data.version
    } catch (error) {
      console.error('[SW] Ошибка проверки версии билда:', error)
    }
  }
})
