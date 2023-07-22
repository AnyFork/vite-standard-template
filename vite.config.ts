import { type ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 该包是用于配置vite运行的时候自动检测eslint规范,不符合规范，启动时不会报错，页面刷新时会报错，https://github.com/gxmari007/vite-plugin-eslint
import eslint from 'vite-plugin-eslint'
import { visualizer } from 'rollup-plugin-visualizer'
import ViteCompression from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
    const env = loadEnv(mode, process.cwd())
    console.log(env)
    return {
        // 配置插件
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
            ViteCompression({ algorithm: 'gzip' }),
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
                resolvers: [NaiveUiResolver()]
            }),
            // 本地svg动态加载插件 官网地址：https://github.com/vbenjs/vite-plugin-svg-icons
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
                symbolId: 'icon-local-[dir]-[name]',
                inject: 'body-last',
                customDomId: '__SVG_ICON_LOCAL__'
            }),
            // 官网地址:https://unocss.dev/integrations/vite
            UnoCSS(),
            // 在html中创建ejs标签，官网地址：https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md
            createHtmlPlugin({
                // 是否压缩 html
                minify: true,
                /**
                 * 需要注入 index.html ejs 模版的数据
                 */
                inject: {
                    data: {
                        title: env.VITE_SYSTEM_TITLE,
                        loading: env.VITE_SYSTEM_LOADING,
                        description: env.VITE_SYSTEM_DESC
                    }
                }
            })
        ],
        resolve: {
            // 配置别名
            alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
        }
    }
})
