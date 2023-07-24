<template>
    <div>
        <img src="/logo.svg" class="logo w-150px" alt="Vite logo" />
        <n-h2>一款简洁，符合通用标准的，基于Vite构建的Vue3项目模板</n-h2>
        <div>
            <n-text>下面是操作useCounterStore进行计数，并实现持久化的例子</n-text>
            <n-p>
                <n-button type="primary" @click="counter.increment">点我加1</n-button>
                <n-text class="px-20px text-20px">{{ count }}</n-text>
            </n-p>
        </div>
        <div class="pt-20px">
            <n-text>下面是通过SVG名称，动态加载本地和iconify线上SVG的例子</n-text>
            <n-p class="flex-row-center h-30px gap-10px">
                <n-text>本地Svg</n-text>
                <SvgIcon localIcon="logo-brand" class="w-24px h-24px"></SvgIcon>
            </n-p>
            <n-p class="flex-row-center h-30px gap-5px">
                <n-text>Iconify</n-text>
                <SvgIcon icon="fluent-mdl2:react-logo" class="w-24px h-24px"></SvgIcon>
                <SvgIcon :icon="'fluent-mdl2:react-logo'" class="w-24px h-24px text-red"></SvgIcon>
            </n-p>
        </div>
    </div>
</template>
<script setup lang="ts">
const counter = useCounterStore()
const { count } = storeToRefs(counter)
</script>
