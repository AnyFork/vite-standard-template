<template>
    <div class="flex-row-center flex-col">
        <SvgIcon localIcon="logo" class="w-128px h-128px"></SvgIcon>
        <div class="w-56px h-56px my-36px">
            <div class="relative h-full animate-spin">
                <div v-for="(item, index) in lodingClasses" :key="index" class="absolute w-16px h-16px bg-primary rounded-8px animate-pulse" :class="item"></div>
            </div>
        </div>
        <h2 class="text-28px font-500 text-#646464">{{ VITE_SYSTEM_LOADING }}</h2>
    </div>
</template>

<script setup lang="ts" name="AppLoading">
const { VITE_SYSTEM_LOADING } = import.meta.env
const lodingClasses = ['left-0 top-0', 'left-0 bottom-0 animate-delay-500', 'right-0 top-0 animate-delay-1000', 'right-0 bottom-0 animate-delay-1500']
const primaryCss = useCssVar('--primary-color')
primaryCss.value = '52,199,89'
</script>
