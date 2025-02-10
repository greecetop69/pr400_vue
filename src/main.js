import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    console.log('[MAIN] 📩 Получено сообщение от SW:', event.data)
    if (event.data.type === 'NEW_BUILD') {
      showUpdateNotification(event.data.version)
    }
  })
}

function showUpdateNotification(version) {
  const notification = document.createElement('div')
  notification.innerText = `🔄 Новый билд ${version}! Обновите страницу.`
  notification.style = `
      position: fixed; top: 10px; right: 10px; background: red;
      color: white; padding: 10px; z-index: 1000; cursor: pointer;
  `
  notification.onclick = () => location.reload()
  document.body.appendChild(notification)
}
