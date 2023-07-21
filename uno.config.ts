// uno.config.ts
import { defineConfig, presetUno, presetAttributify } from 'unocss'
export default defineConfig({
    // 预设配置参考：https://unocss.dev/presets
    presets: [
        // 设置默认预设，当自定义其他预设后，默认预设需要额外添加
        presetUno({ dark: 'class' }),
        // 设置归因预设(Attributify preset)
        presetAttributify()
    ],
    // 设置shortcuts,只能使用预设的和自定义的规则
    shortcuts: {
        'wh-full': 'w-full h-full',
        'flex-row-center': 'flex justify-center items-center',
        'flex-row-between': 'flex justify-between items-center',
        'flex-row-evenly': 'flex justify-evenly items-center',
        'flex-row-warp': 'flex flex-wrap',
        'flex-row-end': 'flex justify-end items-center',
        'flex-col-center': 'flex flex-col justify-center items-center',
        'flex-x-center': 'flex justify-center',
        'flex-y-center': 'flex items-center',
        'i-flex-center': 'inline-flex justify-center items-center',
        'i-flex-x-center': 'inline-flex justify-center',
        'i-flex-y-center': 'inline-flex items-center'
    },
    // 自定义规则
    rules: [],
    // 主题配置
    theme: {
        // 继承boxShadow
        boxShadow: {
            box: '0 1px 8px 0 rgba(255, 0, 0, 0.1)',
            item: '0 1px 8px 0 rgba(0, 0, 0, 0.1)'
        },
        colors: {
            primary: 'rgb(var(--primary-color))',
            primary_hover: 'var(--primary-color-hover)',
            primary_pressed: 'var(--primary-color-pressed)',
            primary_active: 'var(--primary-color-active)',
            info: 'var(--info-color)',
            info_hover: 'var(--info-color-hover)',
            info_pressed: 'var(--info-color-pressed)',
            info_active: 'var(--info-color-active)',
            success: 'var(--success-color)',
            success_hover: 'var(--success-color-hover)',
            success_pressed: 'var(--success-color-pressed)',
            success_active: 'var(--success-color-active)',
            warning: 'var(--warning-color)',
            warning_hover: 'var(--warning-color-hover)',
            warning_pressed: 'var(--warning-color-pressed)',
            warning_active: 'var(--warning-color-active)',
            error: 'var(--error-color)',
            error_hover: 'var(--error-color-hover)',
            error_pressed: 'var(--error-color-pressed)',
            error_active: 'var(--error-color-active)'
        }
    }
})
