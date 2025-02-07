<script setup>
import { ref, computed, onMounted } from 'vue';
import AppLayout from './layout/AppLayout.vue';
import axios from 'axios';

const projects = ref([]);
const searchQuery = ref('');
const sortKey = ref('');
const sortDirection = ref(1);

onMounted(() => {
  axios.get('/projects.json')
    .then(response => {
      projects.value = response.data.data;
    })
    .catch(error => {
      console.error('Ошибка загрузки данных:', error);
    });
});

const filteredProjects = computed(() => {
  return projects.value.filter(project =>
    Object.values(project).some(value =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortDirection.value *= -1;
  } else {
    sortKey.value = key;
    sortDirection.value = 1;
  }
};

const sortedProjects = computed(() => {
  return [...filteredProjects.value].sort((a, b) => {
    const valueA = a[sortKey.value] || '';
    const valueB = b[sortKey.value] || '';
    return valueA > valueB ? sortDirection.value : valueA < valueB ? -sortDirection.value : 0;
  });
});

const clearSearch = () => {
  searchQuery.value = '';
};
</script>

<template>
  <AppLayout>
    <div class="flex flex-col w-full bg-gray-100">
      <div class="bg-sky-300 shadow-md rounded-lg p-6 w-full flex flex-col flex-1">

        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">Список проектов</h2>
          <div class="relative w-64">
            <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1111.23 2.97l4.63 4.63a1 1 0 11-1.41 1.41l-4.63-4.63A6 6 0 012 8z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <input v-model="searchQuery" type="text" placeholder="Поиск..."
              class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-0" />
            <button v-if="searchQuery" @click="clearSearch"
              class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#1C274C" stroke-width="1.5"
                  stroke-linecap="round" />
              </svg>

            </button>
          </div>
        </div>

        <div class="overflow-auto flex-grow">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-100 text-gray-800 uppercase text-sm font-bold leading-normal">
                <th class="px-4 py-3 text-left cursor-pointer" @click="sortBy('id')">ID</th>
                <th class="px-4 py-3 text-left cursor-pointer" @click="sortBy('name')">Название</th>
                <th class="px-4 py-3 text-left cursor-pointer" @click="sortBy('code')">Код</th>
                <th class="px-4 py-3 text-left cursor-pointer" @click="sortBy('summaryPlaned')">
                  Запланировано</th>
                <th class="px-4 py-3 text-left cursor-pointer" @click="sortBy('summaryFact')">Факт</th>
                <th class="px-4 py-3 text-left cursor-pointer" @click="sortBy('startDate')">Начало</th>
                <th class="px-4 py-3 text-left cursor-pointer" @click="sortBy('deadline')">Дедлайн</th>
                <th class="px-4 py-3 text-left cursor-pointer" @click="sortBy('releaseDate')">Релиз</th>
                <th class="px-4 py-3 text-left cursor-pointer" @click="sortBy('version')">Версия</th>
              </tr>
            </thead>

            <tbody class="text-gray-700 text-sm">
              <tr v-for="project in sortedProjects" :key="project.id" class="border-b hover:bg-gray-50 transition">
                <td class="px-4 py-3">{{ project.id }}</td>
                <td class="px-4 py-3">{{ project.name }}</td>
                <td class="px-4 py-3">{{ project.code }}</td>
                <td class="px-4 py-3">{{ project.summaryPlaned }}</td>
                <td class="px-4 py-3">{{ project.summaryFact }}</td>
                <td class="px-4 py-3">{{ project.startDate }}</td>
                <td class="px-4 py-3">{{ project.deadline }}</td>
                <td class="px-4 py-3">{{ project.releaseDate }}</td>
                <td class="px-4 py-3">{{ project.version }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
