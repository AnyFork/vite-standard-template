import type { App } from 'vue'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

// 获取路由模式(history和hash)和项目baseUrl
const { VITE_HASH_ROUTE = 'false', VITE_BASE_URL } = import.meta.env

/**
 * 定义返回模块
 */
export const router = createRouter({
    history: VITE_HASH_ROUTE === 'true' ? createWebHashHistory(VITE_BASE_URL) : createWebHistory(VITE_BASE_URL),
    routes: []
})

/**
 * 路由安装插件，暴露方法在main.ts中进行安装
 * @param app
 */
export async function setupRouter(app: App): Promise<void> {
    app.use(router)
    await router.isReady()
}
