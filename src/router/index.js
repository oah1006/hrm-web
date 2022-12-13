import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/admin/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
  ]
})

export default router
