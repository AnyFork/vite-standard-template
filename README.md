<p align="center">
  <img width="144px" src="/public/logo.svg" />
</p>
<h1 align="center">vite-standard-template</h1>
<p align="center">一款简洁，符合通用标准的vite构建的vue项目模板</p>
<p align="center">
  <a href="https://npmjs.com/package/vite"><img src="/public/version/vite.svg" alt="vite version"></a>
  <a href="https://nodejs.org/en/about/releases/"><img src="/public/version/node.svg" alt="node compatibility"></a>

</p>

## 一 项目简介
一个基于Vite4.X+Vue3.X+TypeScript+Naive UI+Unocss+Eslint+Prettier+husky+lint-staged+commitlint+commitizen+cz-customizable+conventional-changelog构建的标准的vue项目模板。采用`pnpm`进行依赖管理，`Node`版本为16.17.0
## 二 项目创建

1 创建项目

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
## 三 项目配置
### 1 Eslint配置

#### 1.1 Eslint依赖安装
1 通过命令进行`npm init @eslint/config`进行`Eslint`初始化,执行结果如下：
![](https://cdn.staticaly.com/gh/AnyFork/blog-images/main/markdown/202307201715868.png)
2 安装完成后，项目目录下自动生成`.eslintrc.cjs`文件，注意文件后缀为`cjs`非`js`,文件类容如下：
```js
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    }
}
```
3 `.eslintrc.cjs`文件配置
参照`vite`官网`eslint-plugin-vue`对`.eslintrc.cjs`增加如下配置：
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
至此，项目中的`eslint`已经起作用了，如果无效，请查看vscode上是否已安装`Eslint`插件，如果没有，[点击安装](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)。
#### 1.2 script检测脚本安装
我们可以通过命令进行`Eslint`规范检测和修复。执行以下命令在`package.json`中生成检测命令。
```ts
//eslint检测命令
pnpm pkg set scripts.lint="eslint . --ext src/*.{js,ts,vue}"
//eslint修复命令
pnpm pkg set scripts.lint:fix="eslint . --ext src/*.{js,ts,vue} --fix"
```


#### 1.3 Vite插件配置
`vite-plugin-eslint`用于配置`vite`在运行的时候，自动检测`eslint`规范，如果不符合规范，在项目启动时不会报错，浏览器打开页面或者页面刷新时会报`eslint`检测错误。[跳转插件官网](https://github.com/gxmari007/vite-plugin-eslint)

安装插件依赖
```shell
pnpm install vite-plugin-eslint -D
```
在`vite.config.ts`配置插件
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
#### 1.4 常见问题
经过上面的配置后，当我们通过`pnpm dev`运行项目时,会出现以下几个问题。
错误1:
```log
Error: Error while loading rule '@typescript-eslint/dot-notation': You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.
```
方案： 
在`.eslintrc.cjs`增加以下配置
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
在`.tsconfig.json`文件的`include`选项中增加`.eslintrc.cjs`配置
```js
module.exports = {
  ...
   + "include": [".eslintrc.cjs"],
  ...
}
```
错误2：
```log
error  Parsing error: ESLint was configured to run on `<tsconfigRootDir>/vite.config.ts` using `parserOptions.project`: <tsconfigRootDir>/tsconfig.json
However, that TSConfig does not include this file. Either:
```
方案：
在`.tsconfig.json`文件的`include`选项中增加`vite.confit.ts`配置
```js
module.exports = {
  ...
   + "include": ["vite.confit.ts"],
  ...
}
```
错误3：
```log
C:\Users\Administrator\Desktop\vite-standard-template\src\vite-env.d.ts
  1:1  error  Do not use a triple slash reference for vite/client, use `import` style instead  @typescript-eslint/triple-slash-reference
```
方案：
直接在`vite-env.d.ts`中忽略`///`引用规则校验
```ts
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vite/client" />
```
或者修改`.eslintrc.cjs`校验规则
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
错误4：
```log
 error  Parsing error: ESLint was configured to run on `<tsconfigRootDir>/src\App.vue` using `parserOptions.project`: <tsconfigRootDir>/tsconfig.json
The extension for the file (`.vue`) is non-standard. You should add `parserOptions.extraFileExtensions` to your config
```
方案：
在`.eslintrc.cjs`增加以下配置
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
到此为止，所有错误处理完毕。如果编辑器依然爆红，重启一下`vscode`即可.

### 2 Perttier配置

#### 2.1 依赖安装
1 安装`perttier`和`prettier与eslit`冲突处理插件。
```js
pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier
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
    proseWrap: 'always',
    // 不加分号
    semi: false,
    // 结尾处不加逗号
    trailingComma: 'none',
    // 忽略'>'下落问题
    htmlWhitespaceSensitivity: 'ignore'
}
```
#### 2.2 配置文件保存自动格式



