// 参考地址：https://prazdevs.github.io/pinia-plugin-persistedstate/guide/
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { encrypto, decrypto } from '@/utils'
/**
 * pinia 全局持久化配置，会覆盖默认配置，但也会被单个store的persist配置覆盖
 */
export const createPersistedStatePlugins = createPersistedState({
    storage: sessionStorage,
    beforeRestore: (context) => {
        console.log(context)
        return context
    },
    afterRestore: (context) => {
        console.log(context)
        return context
    },
    // 设置序列化，生产加密，开发采用默认不加密
    serializer: {
        serialize: import.meta.env.PROD ? encrypto : JSON.stringify,
        deserialize: import.meta.env.PROD ? decrypto : JSON.parse
    }
})
