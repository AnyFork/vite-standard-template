import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'

// 1. 创建alova实例
export const alova = createAlova({
    /** base地址 */
    baseURL: '',
    /** 请求超时时间 */
    timeout: 10000,
    // VueHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
    statesHook: VueHook,
    // 请求适配器，推荐使用fetch请求适配器
    requestAdapter: GlobalFetch(),
    /** 全局的请求前置钩子 */
    beforeRequest: (config) => {
        console.log(config)
    },
    // 全局的响应拦截器
    responded: async (response) => {
        console.log(response)
        return await response.json()
    }
})
