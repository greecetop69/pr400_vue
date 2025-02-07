<template>
  <div class="layout">
    <header class="header">
      <div class="header-container">
        <h1 class="logo">DPM</h1>
      </div>

      <nav class="tabs">
        <RouterLink to="/projects" class="tab" active-class="active-tab">Проекты</RouterLink>
        <RouterLink to="/users" class="tab" active-class="active-tab">Пользователи</RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  @apply flex flex-col h-screen overflow-hidden bg-gray-100;
}

.header {
  background: linear-gradient(240deg, #ebedfd, #f8f1fc);
  @apply backdrop-blur-lg pb-0;
}

.header-container {
  @apply flex items-center px-5 py-4;
}

.logo {
  @apply text-xl font-bold text-[#0e1726];
}

.tabs {
  background: linear-gradient(240deg, #ebedfd, #f8f1fc);
  @apply flex border-t border-gray-300 space-x-2 px-5 py-2 border-b shadow-sm;
}

.tab {
  @apply text-[#0e1726] text-sm font-medium px-4 py-1.5 rounded-lg transition-all duration-200 hover:bg-[#d9dbe9];
}

.active-tab {
  @apply font-semibold text-[#333] bg-[#d9dbe9];
}

.main-content {
  @apply flex-grow overflow-auto p-6;
}
</style>
