<template>
    <template v-if="localIcon">
        <svg aria-hidden="true" width="1em" height="1em" v-bind="bindAttrs">
            <use :xlink:href="symbolId" fill="currentColor" />
        </svg>
    </template>
    <template v-else>
        <Icon v-if="icon" :icon="icon" v-bind="bindAttrs" />
    </template>
</template>

<script setup lang="ts" name="SvgIcon">
import { Icon } from '@iconify/vue'
// eslint-disable-next-line vue/no-setup-props-destructure
const { icon, localIcon } = defineProps<{
    /** iconify线上图标名称 */
    icon?: string
    /** 本地svg的文件名称 */
    localIcon?: string
}>()
// 获取组件传递的属性
const attrs = useAttrs()
// 计算绑定属性
const bindAttrs = computed<{ class: string; style: string }>(() => ({
    class: attrs.class as string,
    style: attrs.style as string
}))
// 计算本地svg动态的symbolId
const symbolId = computed(() => {
    const icon = localIcon ?? 'no-icon'
    return `#icon-local-${icon}`
})
</script>
