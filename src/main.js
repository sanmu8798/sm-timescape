import { createApp } from "vue"
import { createPinia } from "pinia"
import "vant/lib/index.css"
import "@/assets/css/base.css"
import "@/assets/css/main.less"
import router from "./router"
import App from "./App.vue"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount("#app")
