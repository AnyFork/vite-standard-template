import { createApp } from 'vue'
import './style.css'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'
import { setupRouter } from './router'
import { setupStore } from './store'
import App from './App.vue'
const setupApp = async (): Promise<void> => {
    // 创建vue实例
    const app = createApp(App)
    // 创建pinia
    setupStore(app)
    // 创建vueRouter
    await setupRouter(app)
    // 挂载app
    app.mount('#app')
}
await setupApp()
