import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"

import PageIndex from "@/views/PageIndex.vue"
import PageDiscover from "@/views/PageDiscover.vue"
import PageSquare from "@/views/PageSquare.vue"
import PageProfile from "@/views/PageProfile.vue"
import PageLogin from "@/views/PageLogin.vue"

const routes = [
	{ path: "/", redirect: { name: "PageIndex" } },
	{ path: "/index", name: "PageIndex", component: PageIndex, meta: { title: "首页", tabbarShow: true } },
	{ path: "/discover", name: "PageDiscover", component: PageDiscover, meta: { title: "发现", tabbarShow: true } },
	{ path: "/square", name: "PageSquare", component: PageSquare, meta: { title: "广场", tabbarShow: true } },
	{ path: "/profile", name: "PageProfile", component: PageProfile, meta: { title: "我的", tabbarShow: true } },
	{ path: "/login", name: "PageLogin", component: PageLogin, meta: { title: "登录" } },
]

// 根据环境变量选择路由模式
// VITE_ROUTER_MODE=hash 时使用 hash 模式（GitHub Pages）
// 默认使用 history 模式（有服务器配置的环境）
const historyMode = import.meta.env.VITE_ROUTER_MODE

const router = createRouter({
	history: historyMode === "hash" ? createWebHashHistory() : createWebHistory(),
	routes,
	scrollBehavior: () => ({ top: 0 }),
})

export default router
