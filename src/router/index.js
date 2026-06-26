import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: { name: 'Index' } },
  { path: '/index', name: 'Index', component: () => import('@/views/PageIndex.vue') },
  { path: '/discover', name: 'Discover', component: () => import('@/views/PageDiscover.vue') },
  { path: '/square', name: 'Square', component: () => import('@/views/PageSquare.vue') },
  { path: '/profile', name: 'Profile', component: () => import('@/views/PageProfile.vue') },
  { path: '/login', name: 'Login', component: () => import('@/views/PageLogin.vue') },

]

// 根据环境变量选择路由模式
// VITE_ROUTER_MODE=hash 时使用 hash 模式（GitHub Pages）
// 默认使用 history 模式（有服务器配置的环境）
const historyMode = import.meta.env.VITE_ROUTER_MODE

const router = createRouter({
  history: historyMode === 'hash' ? createWebHashHistory() : createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

export default router