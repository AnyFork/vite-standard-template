<p align="center">
  <img width="144px" src="/public/logo.svg" />
</p>
<h1 align="center">vite-standard-template</h1>
<p align="center">一款简洁，符合通用标准的，基于Vite构建的Vue3项目模板</p>
<p align="center">
  <a href="https://npmjs.com/package/vite"><img src="/public/version/vite.svg" alt="vite version"></a>
    <a href="https://npmjs.com/package/vue"><img src="/public/version/vue.svg" alt="vue version"></a>
  <a href="https://nodejs.org/en/about/releases/"><img src="/public/version/node.svg" alt="node compatibility"></a>
</p>

## 一 项目简介

对于多人协作开发来说，项目开发规范标准，非常重要，不仅能够统一标准，规范代码书写风格，还能便于后期维护和运营。

一直以来，每次采用`vite`搭建`Vue3`项目时，都苦于配置`Eslint`代码校验规范，网上的水贴层出不穷，你抄我的，我粘贴你的，没有几个是有用的，不仅容易误导他人，还浪费大量的时间排查问题。最近花了一些时间，查阅了很多资料，自己也通过反复验证，决定自己搭建一个简单的模板，集成好日常代码开发规范和提交规范，把常用
的`Vite`插件都配置好，在以后创建项目时直接使用，避免重复造轮子，同时也供他人参考。

这是一个基于Vite4.X + Vue3.X + TypeScript + Naive UI + Pinina + VueRouter + Unocss + Alova + Eslint + Prettier + husky + lint-staged + commitlint + commitizen + cz-customizable+ conventional-changelog构建的标准的vue项目模板。整个项目包依赖采用`pnpm`进行依赖管理，`Node`版本为16.17.0, 同时也集成了项目中常用的插件，包含组件自动导入API

## 二 项目创建

1 采用`pnpm`创建项目

```shell
pnpm create vite
```

2 依赖安装

```shell
pnpm install
```

3 项目运行

```shell
pnpm dev
```

## 三 设置依赖
项目创建完后，我们开始增加一些日常开发过程中经常使用的`vite`插件和项目工具包，方便我们能够快速开发项目。
### 1 Vite插件
#### 1 unplugin-auto-import
> 官网：https://github.com/antfu/unplugin-auto-import

`unplugin-auto-import`是为 `Vite、Webpack、Rollup` 和 `esbuild` 按需自动导入`API`。例如：`ref,reactive`等API无需额外导入，就可以全局使用。
##### 1.1 依赖安装
```shell
pnpm install unplugin-auto-import -D
```

##### 1.2 插件配置
在`vite.config.ts`中进行插件配置，如下：
```ts
export default defineConfig(){
    plugins:[
      ...
       //自动导入Composition API,https://github.com/antfu/unplugin-auto-import
      AutoImport({
        dts: "src/types/auto-import.d.ts",
        imports: [
          "vue"
        ],
      }),
      ...
    ]
}
```
上面已经配置了`vue`框架自动导入API

#### 2 unplugin-vue-components
>官网：https://github.com/antfu/unplugin-vue-components

`unplugin-vue-components`是一款组件自动导入`Vite`插件，可以自定义需要自动导入的组件目录，无需使用时手动导入。

##### 2.1 依赖安装
```shell
pnpm install unplugin-vue-components -D
```
##### 2.2 插件配置
在`vite.config.ts`中进行插件配置，如下：
```ts
export default defineConfig(){
    plugins:[
      ...
        //自动导入组件，https://github.com/antfu/unplugin-vue-components
        Components({
          dts: "src/types/components.d.ts",
          dirs: ['src/components'],
          resolvers: [],
        }),
      ...
    ]
}
```
#### 3 unplugin-vue-setup-extend-plus
> 官网：https://github.com/chenxch/unplugin-vue-setup-extend-plus

`Vue3`组件自定义命名插件，可以在`<script setup lang=ts name="Good"></script>`标签中，通过设置name属性为组件命名

##### 3.1 依赖安装
```shell
pnpm install unplugin-vue-setup-extend-plus -D
```
##### 3.2 插件配置
在`vite.config.ts`中进行插件配置，如下：
```ts
export default defineConfig(){
    plugins:[
      ...
      //官网：https://github.com/chenxch/unplugin-vue-setup-extend-plus
      vueSetupExtend({
        //禁止组件属性自动导出
        enableAutoExpose: false,
      }),
      ...
    ]
}
```
配置完毕后，我们可以为组件进行命名。例如:`SvgIcon`组件：
```vue
<script setup lang="ts" name="SvgIcon">
</script>
```
#### 4 vite-plugin-html
> 官网地址：https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md

`vite-plugin-html`插件可以在`html`页面中使用`ejs`语法，动态注入数据。

##### 4.1 依赖安装
```shell
pnpm install vite-plugin-html -D
```
##### 4.2 插件配置
1 在`vite.config.ts`中进行插件配置，如下：
```ts
export default defineConfig(){
    plugins:[
      ...
      //在html中创建ejs标签，官网地址：https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md
      createHtmlPlugin({
        // 是否压缩 html
        minify: true,
        /**
         * 需要注入 index.html ejs 模版的数据
         */
        inject: {
          data: {
            title: env.VITE_SYSTEM_TITLE,
            description: env.VITE_SYSTEM_DESC
          }
        }
      }),
      ...
    ]
}
```
`inject`中的data就是要注入的变量参数，`env`为环境变量参数。可以通过一下代码获取到：
```ts
import { loadEnv } from 'vite'
const env = loadEnv(mode, process.cwd())
```
2 修改`index.html`文件，将`vite-plugin-html`插件注入的数据，通过`ejs`语法写入`index.html`,如下:
```html
<!doctype html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="<%=description%>" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <title><%= title %></title>
    </head>

    <body>
        <div id="app">
            <div id="loading"></div>
        </div>
        <script type="module" src="/src/main.ts"></script>
    </body>
</html>
```
#### 5 vite-plugin-svg-icons
> 官网:https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md

`vite-plugin-svg-icons`是一款用于生成`svg` 雪碧图的插件，能够将本地指定文件目录下的`Svg`生成一张雪碧图，在项目运行时就生成所有图标,只需操作一次`dom`,内置缓存,仅当文件被修改时才会重新生成。通过`Svg`名称便可以加载对应的`Svg`图标。

##### 5.1 依赖安装
```shell
pnpm install vite-plugin-svg-icons -D
```
##### 5.2 插件配置
1 在`vite.config.ts`中进行插件配置，如下：
```ts
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
export default defineConfig(){
    plugins:[
      ...
      createSvgIconsPlugin({
       //// 指定需要缓存的svg图标文件夹
       iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
       // 指定symbolId格式
       symbolId: 'icon-local-[dir]-[name]`,
       // 自定义插入位置,@default: body-last
       inject: 'body-last',
       //自定义domId,默认：__svg__icons__dom__
       customDomId: '__SVG_ICON_LOCAL__'
      })
      ...
    ]
}
```
2 在`main.js`中增加以下代码
```js
import 'virtual:svg-icons-register'
```
3 将需要的`svg`图标放入与`iconDirs`设置的路径中，项目中为`src/assets/svg`
```svg
<svg aria-hidden="true" style="width: 14px; height: 14px">
	<use :href="`#icon-local-${menu.icon}`" />
</svg>
```
`menu.icon`是路径里面的`svg`图片名称。这个是简单用法，项目中已封装成了组件`SvgIcon`,请前往自行查看。

4 如果使用`Typescript`,你可以在`tsconfig.json`内添加:
```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vite-plugin-svg-icons/client"]
  }
}
```
#### 6 @iconify/vue
> 官网：https://iconify.design/docs/icon-components/vue/

`iconify`是功能最丰富的图标框架。可以与任何图标库一起使用的统一图标框架。开箱即用的功能包括80多个图标集和超过70,000个图标。官方为了便于使用`iconify`网站上的图标，提供了`@iconify/vue`组件，供大家使用`SVG framework`，支持在线和离线2种方式使用。离线方式需要下载对应图标集合`json`数据，然后先从本地资源中加载，如果没有找到，通过API从线上下载资源，并进行浏览器缓存。

`@iconify/vue`是一个功能非常强大的组件，支持图标名称动态渲染和静态渲染，正好弥补`vite-plugin-svg-icons`功能缺陷。
##### 6.1 依赖安装
```shell
pnpm install @iconify/vue -D
```
##### 6.2 使用例子
```ts
import { Icon } from '@iconify/vue';
<Icon icon="mdi-light:home" />
```
##### 6.3 自定义组件
虽然`@iconify/vue`也支持本地`svg`,但逐个配置非常麻烦，所以结合`vite-plugin-svg-icons`和`@iconify/vue`,我们创建一个自定义组件，使其不仅支持本地静态动态`Svg`渲染，还支持显示静态动态`Svg`渲染。下面是自定义组件代码：
```vue
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
    class: (attrs.class as string) ?? 'w-24px h-24px',
    style: attrs.style as string
}))
// 计算本地svg动态的symbolId
const symbolId = computed(() => {
    const icon = localIcon ?? 'no-icon'
    return `#icon-local-${icon}`
})
</script>
```
此时，便可以灵活的渲染本地和线上`iconify`网站上的`Svg`图标，使用例子如下：
```vue
本地Svg:<SvgIcon localIcon="logo"></SvgIcon>
iconify线上Svg:<SvgIcon icon="healthicons:fhir-logo" class="w-24px h-24px"></SvgIcon>
```

#### 7 rollup-plugin-visualizer
> 官网：https://github.com/btd/rollup-plugin-visualizer

`rollup-plugin-visualizer`是一个用于Rollup构建工具的插件，一款用于项目性能优化，打包体积分析，能够生成可视化的构建报告，帮助开发者更好地了解构建过程中的文件大小、依赖关系等信息的插件。

##### 7.1 依赖安装
```shell
pnpm install rollup-plugin-visualizer -D
```

##### 7.2 插件配置

1 在`vite.config.ts`中进行插件配置，如下：
```ts
// 引入rollup-plugin-visualizer模块
import { visualizer } from "rollup-plugin-visualizer";
export default defineConfig(){
    plugins:[
      ...
      visualizer({
        //注意这里要设置为true，打包时会自动打开分析页面。
        open:true,  
        //分析图生成的文件名
        filename: "stats.html", 
        //收集gzip大小并将其显示
        gzipSize: true, // 
        //收集 brotli 大小并将其显示
        brotliSize: true, 
      })
      ...
    ]
}
```
2 运行运行命令打包，生成分析图

输入`pnpm build`打包项目，等待片刻，生成分析视图，视图会自动跳出来，并保存在项目根目录下，文件名就是刚刚参数filename的名字（stats.html）

![](https://cdn.staticaly.com/gh/AnyFork/blog-images/main/markdown/202307211635849.png)

视图分析中方块越大，表示该文件占用的空间越大，对于网络带宽和访问速度的要求就越高。如果一个网站中包含大量的大文件，那么用户在访问该网站时需要下载更多的数据，这会导致网站加载速度变慢，用户体验变差。

#### 8 vite-plugin-compression
> 官网：https://github.com/vbenjs/vite-plugin-compression

`gzip`压缩：当前端资源过大时，服务器请求资源会比较慢。前端可以将资源通过`Gzip`压缩使文件体积减少大概60%左右，压缩后的文件，通过后端简单处理，浏览器可以将其正常解析出来。如果浏览器的请求头中包含`content-encoding: gzip`，即证明浏览器支持该属性。

`vite`中使用`vite-plugin-compression`插件可以很便捷的对代码进行`gzip`压缩，减少代码体积，加快浏览器访问速度。压缩的代码放到服务器后，需要后端配置一些东西，浏览器才可以解析。比如可以配置nginx.

##### 8.1 依赖安装
```shell
pnpm install vite-plugin-compression -D
```
##### 8.2 插件配置
在`vite.config.ts`中进行插件配置，如下：
```ts
// 引入vite-plugin-compression模块
import viteCompression from 'vite-plugin-compression';
export default defineConfig(){
    plugins:[
      ...
      viteCompression()
      ...
    ]
}
```
#### 9 完整的vite.config.ts
下面展示整个项目`vite.config.ts`完整的配置，代码如下
```ts
//vite.config.ts
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
                        'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
                        alova: ['useRequest', 'createAlova'],
                        '@/service/alova': ['alova']
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
                        description: env.VITE_SYSTEM_DESC,
                        keywords: env.VITE_SYSTEM_KEYWORDS
                    }
                }
            })
        ],
        resolve: {
            // 配置别名
            alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
        },
        // 本地运行配置，及跨域反向代理配置
        server: {
            // 服务器端口
            port: 9527,
            // 默认启用并允许任何源
            cors: true,
            // 在服务器启动时自动在浏览器中打开应用程序
            open: true,
            // 反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
            proxy: {
                // 本地开发环境通过代理实现跨域，生产环境使用nginx转发
                '/api': {
                    // 通过代理接口访问实际地址。这里是实际访问的地址。vue会通过代理服务器来代理请求
                    target: env.VITE_BASIC_API_URL,
                    changeOrigin: true,
                    // 允许websocket代理
                    ws: true,
                    // 将api替换为空
                    rewrite: (path) => path.replace(/^\/api/, '/api')
                }
            }
        }
    }
})
```

### 2 Naive-UI框架
> 官网地址：https://www.naiveui.com/zh-CN/os-theme/docs/installation

`naive-ui`全量使用`TypeScript`编写, 无样式文件，组件按需加载，是一个使用起来非常`清爽`的`Vue 3`组件库, 组件比较完整，主题可调，完全兼容现在主流的浏览器。

#### 1 安装依赖
```shell
pnpm install naive-ui -D
```
#### 2 按需引入
可以使用`unplugin-auto-import` 插件来自动导入`API`,使用`unplugin-vue-components`插件来按需自动加载组件，插件会自动解析模板中的使用到的组件，并导入组件。

1 在`vite.config.ts`中进行配置，代码如下：
```js
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ]
})
```
2 如果你在使用`Volar`，那么可以在`tsconfig.json`中配置`compilerOptions.types`来指定全局组件类型
```js
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["naive-ui/volar"]
  }
}
```
至此`naive-ui`按需导入成功，此时便可以使用相关组件进行开发，详情参考：[naive-ui官网](https://www.naiveui.com/zh-CN/os-theme/docs/installation)


### 3 Unocss引擎
> 官方网站：https://unocss.dev/

`UnoCSS` - 一个具有高性能且极具灵活性的即时原子化`CSS`引擎，而非一款框架，因为它并未提供核心工具类，所有功能可以通过预设和内联配置提供，目前内置的`presetUno`预设涵盖了[Tailwindcss](https://www.tailwindcss.cn/)和[Windicss](https://cn.windicss.org/)的大部分功能，熟悉上面2个原子css框架写法的人，上手很容易，`UnoCSS`的主要目标是直观性和可定制性。
#### 3.1 依赖安装
```shell
pnpm install unocss  -D
```
#### 3.2 引擎配置
在`vite.config.ts`增加如下配置，相关配置参考：[unocss](https://unocss.dev/integrations/vite)
```ts
// vite.config.ts
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [
    ...
    UnoCSS(),
    ...
  ],
})
```
#### 3.2 创建uno.config.ts
在项目根目录下面创建`uno.config.ts`,增加如下配置：
```ts
//uno.config.ts
import { defineConfig, presetUno, presetAttributify } from 'unocss'
export default defineConfig({
    //预设配置参考：https://unocss.dev/presets
    presets: [
        //设置默认预设，当自定义其他预设后，默认预设需要额外添加
        presetUno({ dark: "class" }),
        //设置归因预设(Attributify preset),可以使用bg=red等语法
        presetAttributify()
    ],
    //设置shortcuts,只能使用预设的和自定义的规则
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
    //自定义规则
    rules: [],
    //主题配置
    theme: {
        //继承boxShadow
        boxShadow: {
            box: '0 1px 8px 0 rgba(255, 0, 0, 0.1)',
            item: "0 1px 8px 0 rgba(0, 0, 0, 0.1)"
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
```
上面是我项目中经常使用到的配置。

#### 3.3 配置virtual:uno.css
在`main.ts`中增加如下代码：
```ts
// main.ts
import 'virtual:uno.css'
```
#### 3.4 VScode插件安装
`VScode`插件市场有`Unocss`插件，安装以后鼠标放上去可以查看对应`class`的`css`属性和值信息，[点我安装插件](https://marketplace.visualstudio.com/items?itemName=antfu.unocss)

### 4 Pinia状态管理
> 官网：https://pinia.vuejs.org/

`Pinia`是`Vue`的存储库，它允许您跨组件/页面共享状态，与`vuex`功能类似，不仅兼容`Option API`写法也兼容`Composition API`写法，同时也只是插件扩展。

#### 4.1 依赖安装
```shell
pnpm install pinia
```
#### 4.2 配置Pinia实例
1、在`vite.config.ts`文件的`AutoImport`自动导入插件中，增加`pinia`API自动导入。
```ts
export default defineConfig(({ mode }: ConfigEnv) => {
  return {
    plugins: [
      ...
      //自动导入Composition API,https://github.com/antfu/unplugin-auto-import
      AutoImport({
        dts: "src/types/auto-import.d.ts",
        imports: [
          ...
          + "pinia",
          ...
        ],
      })
      ...
    ]
  }
})
```
配置了`pinia`API自动导入后，`defineStore`和`createPinia`无需导入，便可以直接使用。

2 在项目`src`目录下创建`store`目录，创建`index.ts`文件，配置`pinia`实例。
```ts
//src/store/index.ts
import type { App } from 'vue';
/**
 * 安装vue状态管理插件pinia
 * @param app 
 */
export function setupStore(app: App) {
    const pinia = createPinia();
    //挂载pinia实例到app
    app.use(pinia);
}
```
3 在`main.ts`中注册`pinia`实例插件。
```ts
//main.ts
import { createApp } from 'vue'
import './style.css'
import 'virtual:uno.css'
+ import { setupStore } from './store';
import App from './App.vue'
const setupApp = async () => {
    //创建vue实例
    const app = createApp(App)
    //创建pinia
    + setupStore(app);
    //挂载app
    app.mount('#app');
}
setupApp()
```
到此为止，`pinia`实例创建好了，并挂载在了`vue`实例上。

4 创建`src/store/modules`目录，将状态管理文件按照模块放在`src/store/modules`目录中。建议使用`Composition API`写法进行开发。下面是个简单例子:
```ts
//src/store/modules/demo.ts
export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)
    const increment = (): void => {
        count.value++
    }
    return { count, increment }
})
```
请注意，`store`是一个用`reactive`包裹的对象，这意味着不需要在`getter`之后写`.value`，但是，就像`setup` 中的`props` 一样，我们不能对其进行解构：
```ts
export default defineComponent({
  setup() {
    const store = useStore()
    // ❌ 这不起作用，因为它会破坏响应式
    // 这和从 props 解构是一样的
    const { name, doubleCount } = store

    name // "eduardo"
    doubleCount // 2

    return {
      // 一直会是 "eduardo"
      name,
      // 一直会是 2
      doubleCount,
      // 这将是响应式的
      doubleValue: computed(() => store.doubleCount),
      }
  },
})
```
为了从`Store`中提取属性同时保持其响应式，您需要使用`storeToRefs()`。 它将为任何响应式属性创建 `refs`。 当您仅使用`store`中的状态但不调用任何操作时，这很有用：
```ts
import { storeToRefs } from 'pinia'
export default defineComponent({
  setup() {
    const store = useStore()
    // `name` 和 `doubleCount` 是响应式引用
    // 这也会为插件添加的属性创建引用
    // 但跳过任何 action 或 非响应式（不是 ref/reactive）的属性
    const { name, doubleCount } = storeToRefs(store)

    return {
      name,
      doubleCount
    }
  },
})
```

5 将模块目录`modules`下面的文导出到`src/store/modules/index.ts`文件中，这样我们以后使用的时候，可以直接从`@/store/modules`直接导入
```ts
//src/store/modules/index.ts
export * from './demo'
//src/store/index.ts
export * from './modules'
```
5 在需要调用的文件中，通过命令导入`import { useCounterStore } from '@/store/modules'`,使用方法如下：
```ts
import { useCounterStore } from '@/store/modules'
const counter = useCounterStore()
const { count } = storeToRefs(counter)
```
注意，不能直接对`useCounterStore()`进行结构，会影响响应性，需要用`storeToRefs`进行包装，然后就可以在模板中使用`count`和`increment`了。

6 `AutoImport`设置自动导入

虽然经过上面的配置，我们可以通过`import { useCounterStore } from '@/store/modules'`在需要的文件中进行导入使用，但每次都要写就显的麻烦，可以通过功能强大的`AutoImport`插件帮我们自动导入，以后就可以直接使用`useCounterStore`,就不用导入了。

在`vite.config.ts`文件的`AutoImport`自动导入插件中，增加`src/store/modules`目录API的自动导入。
```ts
export default defineConfig(({ mode }: ConfigEnv) => {
  return {
    plugins: [
      ...
      //自动导入Composition API,https://github.com/antfu/unplugin-auto-import
      AutoImport({
        dts: "src/types/auto-import.d.ts",
        // 自动本地导入文件目录路径
        + dirs: ['src/store/modules'],
        imports: [
          ...
          "pinia",
          ...
        ],
      })
      ...
    ]
  }
})
```
到此，便可以愉快的玩耍了:smile: 
#### 4.3 状态持久化
`pinia`支持插件扩展，增强自身功能。类似`vuex`一样，`pinia`也有状态持久化插件`pinia-plugin-persistedstate`,帮助`pinia`完成状态持久功能，支持`localStorage`和`sessionStorage`2种持久化方式。
> 官网: https://prazdevs.github.io/pinia-plugin-persistedstate/guide/

##### 4.3.1 依赖安装
```shell
pnpm install pinia-plugin-persistedstate
```
##### 4.3.2 插件配置
1 在`src/store/`目录下面创建文件目录`plugins`, 将插件`pinia-plugin-persistedstate`配置代码放在`src/store/plugin/modules/persistedstate.ts`中。
```ts
// src/store/plugin/modules/persistedstate.ts
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
```
`serializer`默认的序列化为`JSON.stringify`,反序列化为`JSON.parse`，开发期间为了便于观察数据，采用默认的序列化方式，生成环境采用`encrypto`和`decrypto`进行加密和解密，增加数据的安全性。更多具体配置，请查看[官方文档](https://prazdevs.github.io/pinia-plugin-persistedstate/guide/)

2 将配置好的插件安装在`pinia`实例上面，配置如下：
```ts
import type { App } from 'vue'
+ import { createPersistedStatePlugins } from './plugins'
/**
 * 安装vue状态管理插件pinia
 * @param app
 */
export function setupStore(app: App): void {
    // 创建pinia实例
    const pinia = createPinia()
    // 挂载pinia数据持久化插件
    + pinia.use(createPersistedStatePlugins)
    // 挂载pinia实例到app
    app.use(pinia)
}
```
3 开启持久化设置，在`store`状态文件增加如下配置,开启持久化配置，默认不开启。以文件`src/store/modules/demo.ts`举例：
```ts
export const useCounterStore = defineStore(
    'counter',
    () => {
        const count = ref(0)
        const increment = (): void => {
            count.value++
        }
        return { count, increment }
    },
    {
       + persist: true
    }
)

```
到此，`pinia`状态持久化配置完毕了，持久化状态便会生效。

### 5 Vue Router路由
`Vue Router`为`vue`项目提供路由导航功能。
> 官网：https://router.vuejs.org/zh/

#### 5.1 依赖安装
`vue3`请安装`vue-router@4`版本路由。
```shell
pnpm install  vue-router@4
```
#### 5.2 路由配置
1 项目`src`目录下新建`router`目录，并进行基础的路由配置，具体路由模块文件根据实际开发自行增加配置。
```ts
// src/router/index.ts
import type { App } from 'vue'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

// 获取路由模式(history和hash)和项目baseUrl
const { VITE_HASH_ROUTE = 'false', VITE_BASE_URL } = import.meta.env

/**
 * 定义返回模块
 */
export const router = createRouter({
    history: VITE_HASH_ROUTE === 'true' ? createWebHashHistory(VITE_BASE_URL) : createWebHistory(VITE_BASE_URL),
    routes: []
})

/**
 * 路由安装插件，暴露方法在main.ts中进行安装
 * @param app
 */
export async function setupRouter(app: App): Promise<void> {
    app.use(router)
    await router.isReady()
}
```
2 在`main.ts`中进行路由安装
```ts
// main.ts
import { createApp } from 'vue'
import './style.css'
import 'virtual:uno.css'
+ import { setupRouter } from './router'
import { setupStore } from './store'
import App from './App.vue'
const setupApp = async (): Promise<void> => {
    // 创建vue实例
    const app = createApp(App)
    // 创建pinia
    setupStore(app)
    // 创建vueRouter
    + await setupRouter(app)
    // 挂载app
    app.mount('#app')
}
await setupApp()
```
3 在`vite.config.ts`的API自动导入插件`AutoImport`，增加以下配置：
```ts
 // vite.config.ts
 ...
 AutoImport({
    // dts生成路径
    dts: 'src/types/auto-import.d.ts',
    // 自动本地导入文件目录路径
    dirs: ['src/store/modules'],
    // 设置第三方自动导入的包名
    imports: [
        'vue',
        'pinia',
        +'vue-router',
        {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
        }
    ]
}),
...
```
到此，路由安装配置完毕。

### 6 Alova数据请求
> 官网：https://alova.js.org/zh-CN/get-started/overview

`alova`是一个量级的请求策略库，它针对不同请求场景分别提供了具有针对性的请求策略，来提升应用可用性、流畅性，降低服务端压力，让应用如智者一般具备卓越的策略思维。alova 核心模块提供了各类适配器接口、中间件机制来保证高扩展能力，从而实现更多的请求场景。

#### 6.1 依赖安装
```shell
pnpm install alova
```
#### 6.2 依赖配置
在项目根目录创建`service/alova/index.ts`文件，代码配置如下：
```ts
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
```
#### 6.3 自动导入配置
在`vite.config.ts`的`AutoImport`增加如下配置：
```ts
//vite.config.ts
...
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
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
            + alova: ['useRequest', 'createAlova'],
            +'@/service/alova': ['alova']
        }
    ]
}),
...
```
#### 6.4 使用例子
```ts
const { loading, data, send: sendRequest } = useRequest(alova.Get('/api/weather/city/101030100'), { immediate: false })
const handlerEvent = async (): Promise<void> => {
    await sendRequest()
}
```
### 7 工具包依赖
下面介绍项目中集成的几个工具包。
#### 7.1 @vueuse/core
> 官网：https://vueuse.org/

`@vueuse/core`是一个强大的工具包，包含大量的`Composition API`工具，支持`vue2`和`vue3`,你想不到的工具都在这里，非常实用。
##### 7.1.1 依赖安装
```shell
pnpm install @vueuse/core
```
##### 7.1.2 配置自动导入
在`vite.config.ts`的API自动导入插件`AutoImport`，增加以下配置：
```ts
 // vite.config.ts
 ...
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
        +'@vueuse/core',
        {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
        }
    ]
}),
...
```
#### 7.2 crypto-js
> 官网：https://github.com/brix/crypto-js

`crypto-js`是一个比较古老的加解密工具，代码仓库都是十年前的，但功能还是很强大。

##### 7.2.1 依赖安装
```shell
# 安装crypto-js 依赖
pnpm install crypto-js
# 安装crypto-js类型声明文件
pnpm install @types/crypto-js -D
```
##### 7.2.2 简单示例
简单的使用例子参考：`src/utils/modules/crypto/index.ts`，更加详细使用方法参考：[官网](https://github.com/brix/crypto-js)

#### 7.3 lodash-es
> 官网：https://www.lodashjs.com/

`Lodash`是一个一致性、模块化、高性能的`JavaScript`实用工具库，算是从`Underscore`分离出来的超集.
`lodash` 为了良好的浏览器兼容性，它使用了旧版`es5` 的模块语法；而`lodash-es`则使用了`es6 `的模块语法，这让`vite`之类的打包工具可以对其进行`tree shake （摇树优化）`以删除未使用的代码来优化打包体积。所以在使用`lodash`库时，推荐通过`lodash-es`来进行导入操作。`lodash-es`提供了很多实用的工具，比如：节流，防抖，深拷贝等。
##### 7.3.1 依赖安装
```shell
# 安装lodash-es依赖
pnpm install lodash-es
# 安装lodash-es类型声明文件
pnpm install @types/lodash-es -D
```
##### 7.3.2 简单示例
1 导入方式
```ts
/*引入全部*/
import _ from 'lodash-es';
/**按需引入*/
import { defaultsDeep } from 'lodash-es'; 
```
2 浅拷贝clone
```ts
import { clone } from 'lodash-es'; 
const objects = [{ 'a': 1 }, { 'b': 2 }]; 
const shallow = clone(objects);
 // true
console.log(shallow[0] === objects[0]); 
```
3 深拷贝 cloneDeep
cloneDeep(value) 类似clone 但是它会递归拷贝 value。返回拷贝后的值。
```ts
import { cloneDeep } from 'lodash-es';
const objects = [{ 'a': 1 }, { 'b': 2 }];
const deep = cloneDeep(objects);
//false
console.log(deep[0] === objects[0]); 
```
4 防抖 debounce
debounce(func, [wait=0], [options=]) 创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法。 返回新的 debounced（防抖动）函数。
- func (Function): 要防抖动的函数。
- [wait=0] (number): 需要延迟的毫秒数。
- [options=] (Object): 选项对象。
- [options.leading=false] (boolean): 指定在延迟开始前调用。
- [options.maxWait] (number): 设置 func 允许被延迟的最大值。
- [options.trailing=true] (boolean): 指定在延迟结束后调用。
```ts
import { debounce } from 'lodash-es';
// 避免窗口在变动时出现昂贵的计算开销。
jQuery(window).on('resize',debounce(calculateLayout, 150));
 
// 当点击时 `sendMail` 随后就被调用。
jQuery(element).on('click',debounce(sendMail, 300, {
  'leading': true,
  'trailing': false
}));
 
// 确保 `batchLog` 调用1次之后，1秒内会被触发。
var debounced = debounce(batchLog, 250, { 'maxWait': 1000 });
var source = new EventSource('/stream');
jQuery(source).on('message', debounced);
 
// 取消一个 trailing 的防抖动调用
jQuery(window).on('popstate', debounced.cancel);
```
5 节流 throttle
throttle(func, [wait=0], [options=]) 创建一个节流函数，在 wait 秒内最多执行 func 一次的函数。 返回节流的函数。
- func (Function): 要节流的函数。
- [wait=0] (number): 需要节流的毫秒。
- [options=] (Object): 选项对象。
- [options.leading=true] (boolean): 指定调用在节流开始前。
- [options.trailing=true] (boolean): 指定调用在节流结束后。
```ts
// 避免在滚动时过分的更新定位
jQuery(window).on('scroll', throttle(updatePosition, 100));
 
// 点击后就调用 `renewToken`，但5分钟内超过1次。
var throttled = throttle(renewToken, 300000, { 'trailing': false });
jQuery(element).on('click', throttled);
 
// 取消一个 trailing 的节流调用。
jQuery(window).on('popstate', throttled.cancel);
```

## 四 代码规范
下面开始集成项目多人协作开发过程中，代码编写规范，格式化规范以及git提交规范，统一团队开发标准，规范代码风格。
### 1 Eslint

> Eslint 中文官网地址：<https://zh-hans.eslint.org/docs/latest/use/getting-started>   
> Eslint Github地址：<https://github.com/eslint/eslint>

ESLint 是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码。不管是多人合作还是个人项目，代码规范是很重要的。这样做不仅可以很大程度地避免基本语法错误，也保证了代码的可读性。这所谓工欲善其事，必先利其器。

#### 1.1 VScode启用Eslint

1 在`vscode`中启用`Eslint`插件是必须的，它可以在编写代码时自动检测和手动修复。如果没有安装插件，[点我安装](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)。

2 插件的扩展设置。选择`VSCode`左下角的“设置”， 打开`VSCode` 配置文件,添加如下配置:

```json
// 是否开启eslint
"eslint.enable": true,
// code代码保存时，自动eslint修复
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "eslint.autoFixOnSave" : true
}
```

添加后,这样每次保存的时候就可以根据根目录下`.eslintrc.cjs`你配置的`ESLint`规则来检查和做一些简单的`fix`，如果未生效，重启`VScode`

同样也可以不在`VScode`编辑器全局进行配置，只在项目中进行配置，参考项目目录`.vscode`中`setting.json`的配置。

#### 1.2 Eslint依赖安装

1 `Eslint`安装方式有2种，一种是直接安装依赖包，另一种就是通过命令进行`npm init @eslint/config`进行`Eslint`初始化,建议采用第2种，不容易漏掉相关依赖。执行结果如下：

![](https://cdn.staticaly.com/gh/AnyFork/blog-images/main/markdown/202307201715868.png)

2 安装完成后，项目目录下会自动生成`.eslintrc.cjs`文件，注意:文件后缀为`cjs`非`js`,文件初始化内容如下：

```js
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ['standard-with-typescript', 'plugin:vue/vue3-essential'],
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['vue'],
    rules: {}
}
```

3 `.eslintrc.cjs`文件配置 `ESLint Plugin Vue` 则是专门为`Vue.js`项目中的代码提供支持的插件。这个插件可以帮助我们检查`Vue.js`组件中的代码规范、避免常见的错误以及优化代码性能,参照[eslint-plugin-vue](https://eslint.vuejs.org/user-guide/)官网配置文档，需要对`.eslintrc.cjs`增加如下配置：

```js
module.exports = {
  ...
  overrides: [
  ],
  + parser: 'vue-eslint-parser',
  parserOptions: {
    + parser: '@typescript-eslint/parser',
    ...
  },
  ...
}
```

上面增加的解析器用于解析`vue`和`typeScript`相关的`Eslint`校验规则。

至此，项目中的`Eslint`已经起作用了，如果无效，请查看vscode上是否已安装`Eslint`插件，如果没有，[点击安装](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)。

#### 1.3 script检测脚本安装

我们可以通过命令进行`Eslint`规范检测和修复。执行以下命令在`package.json`中生成检测命令。

```shell
//eslint检测命令
pnpm pkg set scripts.lint="eslint . --ext src/*.{js,ts,vue}"
//eslint修复命令
pnpm pkg set scripts.lint:fix="eslint . --ext src/*.{js,ts,vue} --fix"
```

完成上面的步骤，我们可以通过`pnpm lint`检测规则，`pnpm lint:fix`修复简单的校验错误，但都是手动触发，不太方便，下面介绍一款插件，能够集成`Vite`中使用，在项目运行核打包时进行`Eslint`规则校验。

#### 1.4 Vite插件配置

> 官网：<https://github.com/gxmari007/vite-plugin-eslint>

`vite-plugin-eslint`用于配置`vite`在运行和打包的时候，自动检测`eslint`规范，如果不符合规范，在项目启动时不会报错，浏览器打开页面或者页面刷新时会报`eslint`检测错误。

刚开始使用的时候，明明运行没有报错，一度怀疑插件有问题，直到打开浏览器进行访问，页面和控制台才出现`Eslint`规则校验错误，走了好的弯路。

1 安装插件依赖

```shell
pnpm install vite-plugin-eslint -D
```

2 在`vite.config.ts`配置插件

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 该包是用于配置vite运行的时候自动检测eslint规范,不符合规范，启动时不会报错，页面刷新时会报错，https://github.com/gxmari007/vite-plugin-eslint
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), eslint()]
})
```

#### 1.5 常见问题

经过上面的配置后，当我们通过`pnpm dev`运行项目时,会出现以下几个问题。

错误①:`@typescript-eslint/dot-notation`

```log
Error: Error while loading rule '@typescript-eslint/dot-notation': You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.
```

方案：

1 在`.eslintrc.cjs`增加以下配置

```js
module.exports = {
  ...
  parserOptions: {
    + project: ["./tsconfig.json"],
    ...
  },
  ...
}
```

2 在`.tsconfig.json`文件的`include`选项中增加`.eslintrc.cjs`配置

```js
module.exports = {
  ...
   + "include": [".eslintrc.cjs"],
  ...
}
```

错误2：`<tsconfigRootDir>/vite.config.ts`

```log
error  Parsing error: ESLint was configured to run on `<tsconfigRootDir>/vite.config.ts` using `parserOptions.project`: <tsconfigRootDir>/tsconfig.json
However, that TSConfig does not include this file. Either:
```

方案：

1 在`.tsconfig.json`文件的`include`选项中增加`vite.confit.ts`配置

```js
module.exports = {
  ...
   + "include": ["vite.confit.ts"],
  ...
}
```

错误3：`@typescript-eslint/triple-slash-reference`

```log
C:\Users\Administrator\Desktop\vite-standard-template\src\vite-env.d.ts
  1:1  error  Do not use a triple slash reference for vite/client, use `import` style instead  @typescript-eslint/triple-slash-reference
```

方案：

1 直接在`vite-env.d.ts`中忽略`///`引用规则校验

```ts
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vite/client" />
```

2 或者修改`.eslintrc.cjs`校验规则

```js
module.exports = {
   ...
    rules: {
        // 关闭下面/// <reference path="..." />, /// <reference types="..." />,  /// <reference lib="..." /> 校验
        '@typescript-eslint/triple-slash-reference': 'off'
    }
    ...
}
```

错误4：`parserOptions.extraFileExtensions`

```log
 error  Parsing error: ESLint was configured to run on `<tsconfigRootDir>/src\App.vue` using `parserOptions.project`: <tsconfigRootDir>/tsconfig.json
The extension for the file (`.vue`) is non-standard. You should add `parserOptions.extraFileExtensions` to your config
```

方案：

1 在`.eslintrc.cjs`增加以下配置

```js
module.exports = {
  ...
  parserOptions: {
    + extraFileExtensions: ['.vue'],
    ...
  },
  ...
}
```

到此为止，所有错误处理完毕。如果编辑器依然爆红，重启一下`vscode`即可。

#### 1.6 配置eslintignore

`.eslintignore`文件是`Eslint`校验规则忽略文件，与`.gitignore`功能类似。项目中创建`.eslintignore`,填写需要忽略校验的文件

```js
*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
dist
public
.husky
```

### 2 Perttier

> 官网：<https://www.prettier.cn/>

`Perttier`是一个功能强大的代码格式化工具，支持多种格式的文件类型，还能保存就格式化,支持需要编程语言。`VScode`提供了强大的`Prettier`插件，[点我安装](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode),安装完插件，便可以愉快的玩耍了。

#### 2.1 Perttier与Eslint区别

1、`Eslint`针对的是`javascript`，他是一个检测工具，包含js语法以及少部分格式问题，在`Eslint`看来，语法对了就能保证代码正常允许，格式问题属于其次；2、`prettier`属于格式化工具，它看不惯格式不统一，所以它就把`Eslint`没干好的事接着干，另外`prettier`支持包含js在内的**多种语言**

总结：`Eslint`和`prettier`这俩兄弟一个保证js代码质量，一个保证代码美观。共同点就是标准化代码规范。

#### 2.2 依赖安装

1 `Eslint`搭配`prettier`使用步骤,首先安装插件`eslint-config-prettier`和`eslint-plugin-prettier`

```shell
pnpm install  eslint-plugin-prettier prettier eslint-config-prettier -D
```

2 其次配置`.eslintrc.cjs`文件,增加如下配置：

```js
module.exports = {
  ...
  + extends: ["plugin:prettier/recommended"]
  ...
}
```

如果有其他扩展，则`plugin:prettier/recommended`放在最后.

3 创建`.prettierrc.cjs`文件，可以新增规则，对`.eslintrc.cjs`的`rules`进行覆盖，常用配置如下：

```js
module.exports = {
    // 指定每个缩进级别的空格数<int>，默认2
    tabWidth: 4,
    // 用制表符而不是空格缩进行<bool>，默认false
    useTabs: false,
    //一行的字符数，如果超过会进行换行，默认为80
    printWidth: 300,
    //字符串是否使用单引号，默认为false，使用双引号
    singleQuote: true,
    //避免报错delete (cr)的错
    endOfLine: 'auto',
    // 换行,always：超过printWidth就换行，never：不换行，preserve：按照原样处理
    proseWrap: 'always',
    // 不加分号
    semi: false,
    // 结尾处不加逗号
    trailingComma: 'none',
    // 忽略'>'下落问题
    htmlWhitespaceSensitivity: 'ignore'
}
```

这里的执行逻辑顺序是：`eslint`会首先读`extends`的规则，这个时候遇到了最后配置的`plugin:prettier/recommended`，而这个插件又会先读本地配置的`.prettierrc`文件再读取`prettier`自己内部设置的配置，最后读`.eslintrc.cjs`的`rules`配置。所以.`eslintrc.cjs`的`rules`优先级最高，可以覆盖`.prettierrc`的部分配置。

优先级：本地`.eslintrc.cjs`的`rules` > 本地`.prettierrc`>`prettier`内部配置>`extends`其他配置>`eslintrc`内部默认配置。

`prettier`配置完成后，再通过`eslint`插件对文件进行格式化，就能够正常格式化了。由此可知，对`eslint`进行扩展之后，`prettier`能够对js代码做的事，`eslint`也能，只要你制定好规则以及对应的处理。

#### 2.3 安装Scripts命令

执行下面命令，在`package.json`的scripts中生成命令，执行命令可以进行文件格式化

```shell
pnpm pkg set scripts.format='prettier --write "./**/*.{html,vue,ts,js,json,md,css}"'
```

#### 2.4 配置文件保存自动格式

同样的，我们不可能每写一行代码，就运行`pnpm format`来美化一次代码，我们希望保存代码时，就能够自动格式化代码。于是又需要安装prettier插件。然后再`ctrl+shift+p`打开`vscode`的`setting.json`文件，添加如下配置：
```json
 //prettier可以格式化很多种格式，所以需要在这里对应配置下
 "[html]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  //这个设置在ctrl+s的时候，会启用默认的格式化，这里是prettier
  "editor.formatOnSave": true
```
或者在项目中的`.vscode`目录中的`settings.json`中进行如下配置：
```json
 //prettier可以格式化很多种格式，所以需要在这里对应配置下
 "[html]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  //这个设置在ctrl+s的时候，会启用默认的格式化，这里是prettier
  "editor.formatOnSave": true
```
#### 2.5 配置prettierignore
`.perttierigonre`文件用于忽略那些文件不需要`Perttier`进行格式化，功能和`.gitignore`类似。项目根目录创建`.perttierignore`,配置如下：
```js
dist
node_modules
**/*.svg
**/*.sh
```
### 3 husky

在`Git`中也存在一些钩子函数，通常成为`git hook`，其中较常用的有`pre-push`、`pre-commit`，其中`pre-commit`钩子会在`commit`前触发，`pre-push`会在`push`前触发。注意：所有钩子默认情况下是禁用的。

为了保证不同的协作者，每次提交的`git`代码都是符合`Eslint`规范的，避免提交格式不统一或者错误的代码，为此我们可以使用`Eslint`配合`git hook`， 在进行`git commit`的时候验证`Eslint`规范。如果`Eslint`验证不通过，则不能提交。

**husky**就是我们需要的`git hook`工具。使用`husky`，我们可以很方便配置`git hook`脚本，例如: `pre-commit`、 `pre-push`、 `commit-msg` 等.通过`git hook`触发`Eslint`规则校验，规范代码提交。

下面是相关配置:

#### 3.1 安装依赖

```shell
pnpm install husky  -D
```

#### 3.2 husky配置
<span id="commitlint">1 在`package.json`中添加脚本命令,用于生成`.husky`目录</span>
```shell
pnpm pkg set scripts.prepare="husky install"
```

2 执行命令`pnpm  prepare`，在根目录创建`.husky`文件夹,将`git hooks`钩子交由`husky`执行,每次执行`pnpm install`会生成`.husky`脚本目录，如果目录存在，不会重复生成。

```shell
pnpm  prepare
```

3 添加`commit-msg`钩子,在执行`git commit`命令时执行信息校验。

```shell
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

4 为了便于记住命令，可以将步骤3中的命令加入到`package.json`的`scripts`中

```shell
 "commit-msg": "npx husky add .husky/commit-msg \"npx --no-install commitlint --edit '$1'\""
```

### 4 lint-staged

通过`git`提交代码时，通过`husky`触发`git hook`钩子进行`eslint`或者`prettier`校验时，往往都是全目录或者指定目录进行代码规范检测，这样就比较消耗时间，影响性能。我们都希望只对提交的代码进行规范检测，避免全目录检测，此时`lint-staged`刚好能满足我们的需求。

`lint-staged`只扫描`git`暂存区的文件而不是全盘扫描，这样每次`lint`量就比较小，而且是符合我们的需求的。首先需要注意，`Lint-staged`仅仅是文件过滤器，不会帮你格式化任何东西，只需要在`package.json`中进行简单配置。

#### 4.1 依赖安装

```shell
pnpm install lint-staged -D
```

#### 4.2 lint-staged配置

1 在`package.json`中进行如下配置:

```json
{
    "lint-staged": {
        "*.{js,ts,tsx,jsx,json,md}": ["prettier --write", "eslint --fix"],
        "*.vue": ["prettier --parser=vue --write", "eslint --fix"],
        "*.css": ["prettier --write"]
    }
}
```

2 设置`pre-commit`为运行`lint-staged`.在完成上面的配置之后，可以手动通过`npx lint-staged`, 来检查暂存区里面的文件。当然我们也可以通过`git hook`的钩子`pre-commit`来进行自动控制。执行下面命令在`husky`中进行设置：

```shell
npx husky add .husky/pre-commit "npx lint-staged"
```

3 同时也可以将步骤2种的命令配置在`package.json`的`scripts`中：

```shell
pnpm pkg set scripts.pre-commit="npx husky add .husky/pre-commit 'npx lint-staged'"
```

lint-staged过滤文件采用glob模式,`git commit`时触发`pre-commit`钩子，运行`lint-staged`命令，执行`eslint`或者`prettier`命令。在`git commit`的时候就自动的回去帮我们跑检查脚本，而且还是只针对我们本次提交的代码进行检查。

### 5 commitlint

前面配置了通过`husky`执行了`pre-commit`钩子，在代码`git commit`前执行`npx lint-staged`，规范暂存区代码。下面就接着配置代码提交`commit-message`规范。多人协作开发，在提交代码时经常出现五花八门的`commit-message`,使得代码提交注释不统一，使得代码`reReview`很难。

`commitlint`从名字就能看出是提交时`lint`,它针对`commit-message`进行`lint`.`commitlint`是一个提交代码时注释规范的工具。与`Eslint`类似，它定义了一套标准的代码提交注释信息规范。相关配置如下：

#### 5.1 安装依赖

```shell
pnpm install @commitlint/cli @commitlint/config-conventional -D
```

- @commitlint/cli: `commitlint`的命令行工具
- @commitlint/config-conventional: `commitlint`校验的规则集，比较常用的`Conventional Commits`是`Angular`约定

注意:` @commitlint/config-conventional`在后面会被移除

#### 5.2 commitlint配置

1 配置`commitlint`规则`commitlint.config.cjs`，注意文件名称后缀设置为`.cjs`

```js
module.exports = {
    extends: ['@commitlint/config-conventional']
}
```

2 此时文件`commitlint.config.cjs`会爆红，请在`tsconfig.json`增加如下设置

```json
{
    "include": ["commitlint.config.cjs"]
}
```

如果爆红未消失，重启`vscode`

3 `commitlint.config.cjs`参数相关说明：生成的配置文件是默认的规则，也可以自己定义规则，提交格式则如下：

```js
<type>(<scope>): <subject>
```

I) **type**为必填项，用于指定`commit`的类型

![](https://cdn.staticaly.com/gh/AnyFork/blog-images/main/markdown/202307202244657.jpg)

II)**scope**为非必填项，用于描述改动的范围，可以是文件的名称，最好包含路径III)**subject**是必填项，这次提交的日志信息，提交日志必须有意义。

一般情况下，`commitlint.config.cjs`中插件`@commitlint/config-conventional`默认的规则就够用了。当然，如果需要自定义限制这些规则，不启用默认的规则，可以把配置写的更详细

```js
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['upd', 'feat', 'fix', 'refactor', 'docs', 'chore', 'style', 'revert']],
        'type-case': [0],
        'type-empty': [0],
        'scope-empty': [0],
        'scope-case': [0],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
        'header-max-length': [0, 'always', 72]
    }
}
```

rule配置说明: rule由name和配置数组组成，如：‘name:[0, ‘always’, 72]’，数组中第一位为level，可选0,1,2，0为disable，1为warning，2为error，第二位为应用与否，可选always|never，第三位该rule的值。

4 配置`husky`,让`husky`触发`git hook`钩子`pre-commit`。相关设置已在步骤[3.2husky配置](#commitlint)中`第三步，第四步`配置过了，请跳转查看。

### 6 commitizen

上面通过`commitlint`规范了代码提交时`commit-message`的标准，但操作起来非常不顺手，交互感不够友好，很别扭。别着急，下面介绍的`commitizen`工具就能优化我们的交互体验。

`Commitizen`是一个用于撰写Git提交信息的工具。它可以帮助开发人员遵循一个规范，以便更容易地阅读和维护Git仓库历史记录。`Commitizen`采用了一个交互式的命令行界面，引导你逐步填写必要的数据，从而生成符合规范的Git提交信息。相关配置如下：

#### 6.1依赖安装

```shell
pnpm install commitizen cz-conventional-changelog -D
```

#### 6.2 commitizen配置

1 在`package.json` 中添加`commit`指令, 执行`git-cz`指令

```shell
pnpm pkg set scripts.commit="git add . && git-cz"
```

2 在项目目录里，运行下面的命令，使其支持`Vue`的`Commit message`格式，自动初始化命令行的选项信息

```shell
commitizen init cz-conventional-changelog --save --save-exact
```

3 在`package.json`中添加配置：

```json
 ...
 "config": {
        "commitizen": {
            "path": "node_modules/cz-conventional-changelog"
        }
  },
  ...
```

以后，凡是用到`git commit`命令，一律改为使用`git cz`。这时，就会出现选项，用来生成符合格式的`Commit message`。通过执行命令`pnpm commit`测试如下： ![](https://cdn.staticaly.com/gh/AnyFork/blog-images/main/markdown/202307202317090.png)

### 7 cz-customizable

上面通过`commitizen`可以进行交互式操作，通过引导完成提交信息的填写，但是是英文的，也不够灵活。

`cz-customizable`是一个`Commitizen`的插件，它允许你使用自定义的Git提交规范。通过为项目添加一个配置文件，你可以指定你自己的提交格式，并在使用`Commitizen`时使用该格式。你可以轻松地定义自己的提交类型、作用域和描述等信息.

#### 7.1 依赖安装

```shell
pnpm install  cz-customizable commitlint-config-cz --D
```

-   cz-customizable可自定义的`Commitizen`插件（或独立实用程序），可帮助实现一致的提交消息

-   commitlint-config-cz用于配置`cz-customizable`提交模板和共享规则给`commitlint`校验

#### 7.2 cz-customizable配置

1 在`package.json`文件中，添加以下字段:

```json
"config": {
  "commitizen": {
    - "path": "node_modules/cz-conventional-changelog",
    + "path": "./node_modules/cz-customizable"
  }
}
```

更改`commitizen`的path为`./node_modules/cz-customizable`，移除`node_modules/cz-conventional-changelog`,此时也可以移除`node_modules/cz-conventional-changelog`相关依赖。

2 然后，在项目根目录下添加一个`.cz-config.cjs`文件，注意：文件后缀为：`cjs`,并定义你的提交类型、作用域和描述等信息。例如：

```js
module.exports = {
    types: [
        {
            value: ':sparkles: feat',
            name: '✨ feat:     新功能'
        },
        {
            value: ':bug: fix',
            name: '🐛 fix:      修复bug'
        },
        {
            value: ':package: build',
            name: '📦️ build:    打包'
        },
        {
            value: ':zap: perf',
            name: '⚡️ perf:     性能优化'
        },
        {
            value: ':tada: release',
            name: '🎉 release:  发布正式版'
        },
        {
            value: ':lipstick: style',
            name: '💄 style:    代码的样式美化'
        },
        {
            value: ':recycle: refactor',
            name: '♻️  refactor: 重构'
        },
        {
            value: ':pencil2: docs',
            name: '✏️  docs:     文档变更'
        },
        {
            value: ':white_check_mark: test',
            name: '✅ test:     测试'
        },
        {
            value: ':rewind: revert',
            name: '⏪️ revert:   回退'
        },
        {
            value: ':rocket: chore',
            name: '🚀 chore:    构建/工程依赖/工具'
        },
        {
            value: ':construction_worker: ci',
            name: '👷 ci:       CI related changes'
        }
    ],
    scopes: [{ name: 'components' }, { name: 'assets' }, { name: 'router' }, { name: 'utils' }, { name: 'views' }, { name: 'types' }],
    messages: {
        type: '请选择提交类型(必填)',
        customScope: '请输入文件修改范围(可选)',
        subject: '请简要描述提交(必填)',
        body: '请输入详细描述(可选)',
        breaking: '列出任何BREAKING CHANGES(可选)',
        footer: '请输入要关闭的issue(可选)',
        confirmCommit: '确定提交此说明吗？'
    },
    allowCustomScopes: true,
    subjectLimit: 100
}
```

3 在`package.json`中增加如下配置：用于指定`cz-config.cjs`文件位置

```json
 "config": {
        "cz-customizable": {
            "config": ".cz-config.cjs"
        }
  },
```

`cz-customizable` 会首先在项目根目录下寻找: `.cz-config.js` 或 `.config/cz-config.js`，如果找不到，会去主目录寻找。我们也可以在`package.json`中手动去指定配置文件的路径

#### 7.3 git-commit-emoji安装

1 `git-commit-emoji`是一款支持在`commit-message`中输入`emoji`的插件，丰富提交信息

```shell
pnpm install commitlint-config-git-commit-emoji -D
```

2 更新`commitlint.config.cjs`移除extends中原来的`@commitlint/config-conventional`，加入`'git-commit-emoji', 'cz'`

```js
module.exports = {
    extends: ['git-commit-emoji', 'cz']
}
```

最后，你可以使用以下命令来代替`git commit`:

```shell
pnpm commit
```

这将启动`Commitizen`的交互式命令行界面，并引导你逐步填写必要的数据。此时你看到的便是定制话的`commit-message`交互式界面，还是带表情中文的。 ![](https://cdn.staticaly.com/gh/AnyFork/blog-images/main/markdown/202307202353662.png)

### 8 conventional-changelog

通过插`conventional-changelog`可以轻松的将`commit-message`转化为`changelog`

#### 8.1 依赖安装

```shell
pnpm install conventional-changelog conventional-changelog-cli -D
```

#### 8.2 conventional-changelog配置

1 将`changelog`脚本添加到您的`package.json`

```shell
pnpm pkg set scripts.changelog="conventional-changelog -p cz-config.cjs -i CHANGELOG.md -s -r 0"
```

参数说明

```js
-p 指定风格*
-i CHANGELOG.md 指定输出的文件名称
-s 输出到infile，这样就不需要指定与outfile相同的文件
-r 从最新的版本生成多少个版本。如果为0，则整个更改日志将被重新生成，输出文件将被覆盖。默认值:1
-n ./changelog-option.js 指定自定义配置
```

2 运行命令生成最新`CHANGELOG`

```shell
pnpm changelog
```

至此，更新日志生成完毕。

### 9 VsCode插件

上面都是通过命令行窗口进行代码提交信息交互，相对来说还不够智能。下面介绍一款`VScode`插件`git-commit-plugin`[点我下载安装](https://marketplace.visualstudio.com/items?itemName=redjue.git-commit-plugin)。该插件会在`VScode`的`git`插件的左上角生成一个小图标，点击按照交互式操作进行提交信息填写。

## 五 项目下载

1 `git clone` 项目源码到本地

```shell
git clone https://github.com/AnyFork/vite-standard-template.git
```

2 安装项目依赖

```shell
pnpm install
```

3 项目运行

```shell
pnpm dev
```

## 六 参考文档

<https://blog.csdn.net/Jackson_Wen/article/details/127921063> 

<https://zhuanlan.zhihu.com/p/270662897> 

<https://codeleading.com/article/66646301239/>