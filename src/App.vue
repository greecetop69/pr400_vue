<script>
// export default {
//     mounted() {
//         // Очищаем update_notified, если страница была обновлена
//         if (localStorage.getItem('update_notified') === 'true') {
//             console.log("🔄 Страница обновилась! Очищаем `update_notified`...");
//             localStorage.removeItem('update_notified');
//         }

//         this.checkVersion();
//         this.startWatchingVersion(); // Начинаем слежение за версией
//     },

//     methods: {
//         async checkVersion() {
//             try {
//                 const response = await fetch('/version.json?v=' + Date.now());
//                 const data = await response.json();

//                 let currentVersion = localStorage.getItem('app_version');
//                 let updateNotified = localStorage.getItem('update_notified');

//                 console.log(`🔍 [Проверка версии] Текущая версия: ${currentVersion}, Новая версия: ${data.version}`);

//                 // Преобразуем в строку для корректного сравнения
//                 currentVersion = String(currentVersion);
//                 const newVersion = String(data.version);

//                 if (!currentVersion) {
//                     console.log("🔍 Первая загрузка. Сохраняем версию...");
//                     localStorage.setItem('app_version', newVersion);
//                     return;
//                 }

//                 if (currentVersion !== newVersion) {
//                     console.log("🔄 Версия изменилась! Показываем кнопку обновления...");

//                     if (updateNotified !== 'true') {
//                         this.showUpdateNotification(newVersion);
//                     } else {
//                         console.log("✅ Обновление уже применено. Кнопку не показываем.");
//                     }
//                 } else {
//                     console.log("✅ Версия актуальна, скрываем кнопку.");
//                     this.removeUpdateNotification();
//                 }
//             } catch (error) {
//                 console.error('❌ Ошибка загрузки версии:', error);
//             }
//         },

//         showUpdateNotification(newVersion) {
//             console.log("🔔 Отображаем кнопку обновления!");

//             if (document.getElementById('update-notification')) return;

//             const btn = document.createElement('button');
//             btn.id = 'update-notification';
//             btn.innerText = '🔄 Доступно обновление. Обновить?';
//             btn.style.position = 'fixed';
//             btn.style.bottom = '20px';
//             btn.style.right = '20px';
//             btn.style.padding = '10px';
//             btn.style.background = 'red';
//             btn.style.color = 'white';
//             btn.style.border = 'none';
//             btn.style.cursor = 'pointer';
//             btn.style.fontSize = '16px';

//             btn.onclick = async () => {
//                 console.log("🔄 Обновляем страницу...");
//                 localStorage.setItem('app_version', newVersion);
//                 localStorage.setItem('update_notified', 'true'); // ✅ Сохраняем, что обновление применено

//                 btn.remove();
//                 setTimeout(() => window.location.reload(), 500);
//             };

//             document.body.appendChild(btn);
//         },

//         removeUpdateNotification() {
//             console.log("✅ Убираем кнопку обновления.");
//             localStorage.removeItem('update_notified');
//             const btn = document.getElementById('update-notification');
//             if (btn) btn.remove();
//         },

//         startWatchingVersion() {
//             console.log("📡 Запускаем слежение за файлом `version.json`...");
//             setInterval(() => {
//                 console.log("🔄 Проверяем обновления версии...");
//                 this.checkVersion();
//             }, 5000); // Проверка каждые 5 секунд
//         }
//     }
// };

</script>


<template>
    <header>

        <div class="wrapper">

            <nav>
                <!-- <RouterLink to="/about">About</RouterLink> -->
            </nav>
        </div>
    </header>

    <RouterView />
</template>
