import type { App } from 'vue'
import { createPersistedStatePlugins } from './plugins'
/**
 * 安装vue状态管理插件pinia
 * @param app
 */
export function setupStore(app: App): void {
    // 创建pinia实例
    const pinia = createPinia()
    // 挂载pinia数据持久化插件
    pinia.use(createPersistedStatePlugins)
    // 挂载pinia实例到app
    app.use(pinia)
}
