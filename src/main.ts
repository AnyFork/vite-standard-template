import { createApp } from 'vue'
import './assets/style.css'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'
import { setupRouter } from './router'
import { setupStore } from './store'
import App from './App.vue'
import loading from './components/common/AppLoading.vue'
const setupApp = async (): Promise<void> => {
    // 系统loading组件
    const appLoading = createApp(loading)
    // 挂载系统loading组件
    appLoading.mount('#loading')
    // 创建vue实例
    const app = createApp(App)
    // 创建pinia
    setupStore(app)
    // 创建vueRouter
    await setupRouter(app)
    // 卸载appLoading
    appLoading.unmount()
    // 挂载app
    app.mount('#app')
}
await setupApp()
