import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Desktop.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Desktop.vue')
  },
  {
    path: '/boot',
    name: 'Boot',
    component: () => import('../views/Desktop.vue')
  },
  {
    path: '/shutdown',
    name: 'Shutdown',
    component: () => import('../views/Desktop.vue')
  },
  {
    path: '/bluescreen',
    name: 'Bluescreen',
    component: () => import('../views/Desktop.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router