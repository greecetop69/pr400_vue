import { createRouter, createWebHistory } from 'vue-router'
import ProjectsResult from '../views/ProjectsPage.vue'
import UsersPage from '@/views/UsersPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: ProjectsResult,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsResult,
    },
    {
      path: '/users',
      name: 'users',
      component: UsersPage,
    },
  ],
})

export default router
