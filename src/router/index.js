import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: { name: 'Index' } },
  { path: '/index', name: 'Index', component: () => import('@/views/PageIndex.vue') },
  { path: '/discover', name: 'Discover', component: () => import('@/views/PageDiscover.vue') },
  { path: '/square', name: 'Square', component: () => import('@/views/PageSquare.vue') },
  { path: '/profile', name: 'Profile', component: () => import('@/views/PageProfile.vue') },
  { path: '/login', name: 'Login', component: () => import('@/views/PageLogin.vue') },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

export default router
