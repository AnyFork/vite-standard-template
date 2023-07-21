import { type ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 该包是用于配置vite运行的时候自动检测eslint规范,不符合规范，启动时不会报错，页面刷新时会报错，https://github.com/gxmari007/vite-plugin-eslint
import eslint from 'vite-plugin-eslint'
import { visualizer } from 'rollup-plugin-visualizer'
import ViteCompression from 'vite-plugin-compression'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
    const env = loadEnv(mode, process.cwd())
    const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX, VITE_COMPRESS_ALGORITHM = 'gzip' } = env
    const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '')
    return {
        plugins: [
            vue(),
            eslint(),
            /** 打包分析插件，官网：https://github.com/btd/rollup-plugin-visualizer */
            visualizer({
                // 注意这里要设置为true，打包时会自动打开分析页面。
                open: true,
                // 分析图生成的文件名
                filename: 'stats.html',
                // 收集gzip大小并将其显示
                gzipSize: true, //
                // 收集 brotli 大小并将其显示
                brotliSize: true
            }),
            /** 打包压缩插件 官网：https://github.com/vbenjs/vite-plugin-compression */
            ViteCompression({ algorithm: VITE_COMPRESS_ALGORITHM }),
            // 自动导入Composition API,https://github.com/antfu/unplugin-auto-import
            AutoImport({
                // dts生成路径
                dts: 'src/types/auto-import.d.ts',
                // 自动本地导入文件目录路径
                dirs: ['src/store/modules'],
                // 设置第三方自动导入的包名
                imports: [
                    'vue',
                    'vue-router',
                    'pinia',
                    '@vueuse/core',
                    {
                        'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
                    }
                ]
            }),
            // 自动导入组件，https://github.com/antfu/unplugin-vue-components
            Components({
                dts: 'src/types/components.d.ts',
                dirs: ['src/components'],
                resolvers: [
                    NaiveUiResolver(),
                    // icon自动导入，icon组件格式：{prefix}-{collection}-{icon}
                    IconsResolver({
                        // 定义图标前缀
                        prefix: VITE_ICON_PREFIX,
                        // 定义自定义图片集合名称
                        customCollections: [VITE_ICON_LOCAL_PREFIX]
                    })
                ]
            }),
            // 官网地址：https://www.npmjs.com/package/unplugin-icons
            Icons({
                // 自动从iconify下载icon
                autoInstall: true,
                compiler: 'vue3',
                // 自定义本地svg集合
                customCollections: {
                    [collectionName]: FileSystemIconLoader('src/assets/svg', (svg) => svg.replace(/^<svg\s/, '<svg width="1.2em" height="1.2em" '))
                },
                scale: 1.2,
                defaultClass: 'inline-block'
            }),
            // 本地svg动态加载插件 官网地址：https://github.com/vbenjs/vite-plugin-svg-icons
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
                symbolId: `${collectionName}-[dir]-[name]`,
                inject: 'body-last',
                customDomId: '__SVG_ICON_LOCAL__'
            }),
            // 官网地址:https://unocss.dev/integrations/vite
            UnoCSS()
        ]
    }
})
