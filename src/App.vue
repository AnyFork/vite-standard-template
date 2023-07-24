<template>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN" preflight-style-disabled>
        <n-loading-bar-provider>
            <n-dialog-provider>
                <n-notification-provider>
                    <n-message-provider>
                        <router-view></router-view>
                        <n-content-provider />
                    </n-message-provider>
                </n-notification-provider>
            </n-dialog-provider>
        </n-loading-bar-provider>
        <n-global-style />
    </n-config-provider>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui'
const NContentProvider = defineComponent({
    name: 'NaiveProviderContent',
    setup() {
        // 挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
        window.$loadingBar = useLoadingBar()
        window.$dialog = useDialog()
        window.$message = useMessage()
        window.$notification = useNotification()
    },
    render() {
        return h('div')
    }
})
</script>
