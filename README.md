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
### 1 Eslint

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

### 2 Perttier

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

### 3 husky
在`Git`中也存在一些钩子函数，通常成为`git hook`，其中较常用的有`pre-push`、`pre-commit`，其中`pre-commit`钩子会在`commit`前触发，`pre-push`会在`push`前触发。注意：所有钩子默认情况下是禁用的。

为了保证不同的协作者，每次提交的`git`代码都是符合`Eslint`规范的，避免提交格式不统一或者错误的代码，为此我们可以使用`Eslint`配合`git hook`， 在进行`git commit`的时候验证`Eslint`规范。如果`Eslint`验证不通过，则不能提交。


**husky**就是我们需要的`git hook`工具。使用`husky`，我们可以很方便配置`git hook`脚本，例如: `pre-commit`、 `pre-push`、 `commit-msg` 等.通过`git hook`触发`Eslint`规则校验，规范代码提交。

下面是相关配置:

#### 3.1 安装依赖
```js
pnpm install husky  -D
```
#### <a id="commitlint">3.2 husky配置</a>
1 在`package.json`中添加脚本命令,用于生成`.husky`目录
```js
pnpm pkg set scripts.prepare="husky install"
```
2 执行命令`pnpm  prepare`，在根目录创建`.husky`文件夹,将`git hooks`钩子交由`husky`执行,每次执行`pnpm install`会生成`.husky`脚本目录，如果目录存在，不会重复生成。
```js
pnpm  prepare
```
3 添加`commit-msg`钩子,在执行`git commit`命令时执行信息校验。
```js
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```
4 为了便于记住命令，可以将步骤3中的命令加入到`package.json`的`scripts`中
```js
 "commit-msg": "npx husky add .husky/commit-msg \"npx --no-install commitlint --edit '$1'\""
```

### 4 lint-staged
通过`git`提交代码时，通过`husky`触发`git hook`钩子进行`eslint`或者`prettier`校验时，往往都是全目录或者指定目录进行代码规范检测，这样就比较消耗时间，影响性能。我们都希望只对提交的代码进行规范检测，避免全目录检测，此时`lint-staged`刚好能满足我们的需求。

`lint-staged`只扫描`git`暂存区的文件而不是全盘扫描，这样每次`lint`量就比较小，而且是符合我们的需求的。首先需要注意，`Lint-staged`仅仅是文件过滤器，不会帮你格式化任何东西，只需要在`package.json`中进行简单配置。

#### 4.1 依赖安装
```js
pnpm install lint-staged -D
```
#### 4.2 lint-staged配置
1 在`package.json`中进行如下配置:
```json
{
    "lint-staged": {
      "*.{js,ts,tsx,jsx,json,md}": [
          "prettier --write",
          "eslint --fix"
      ],
      "*.vue": [
          "prettier --parser=vue --write",
          "eslint --fix"
      ],
      "*.css": [
          "prettier --write"
      ]
    }
}
```
2 设置`pre-commit`为运行`lint-staged`.在完成上面的配置之后，可以手动通过`npx lint-staged`, 来检查暂存区里面的文件。当然我们也可以通过`git hook`的钩子`pre-commit`来进行自动控制。执行下面命令在`husky`中进行设置：
```js
npx husky add .husky/pre-commit "npx lint-staged"
```
3 同时也可以将步骤2种的命令配置在`package.json`的`scripts`中：
```js
pnpm pkg set scripts.pre-commit="npx husky add .husky/pre-commit 'npx lint-staged'"
```
lint-staged过滤文件采用glob模式,`git commit`时触发`pre-commit`钩子，运行`lint-staged`命令，执行`eslint`或者`prettier`命令。在`git commit`的时候就自动的回去帮我们跑检查脚本，而且还是只针对我们本次提交的代码进行检查。

### 5 commitlint
前面配置了通过`husky`执行了`pre-commit`钩子，在代码`git commit`前执行`npx lint-staged`，规范暂存区代码。下面就接着配置代码提交`commit-message`规范。多人协作开发，在提交代码时经常出现五花八门的`commit-message`,使得代码提交注释不统一，使得代码`reReview`很难。

`commitlint`从名字就能看出是提交时`lint`,它针对`commit-message`进行`lint`.`commitlint`是一个提交代码时注释规范的工具。与`Eslint`类似，它定义了一套标准的代码提交注释信息规范。相关配置如下：
#### 5.1 安装依赖
```js
pnpm install @commitlint/cli @commitlint/config-conventional -D
```
-  @commitlint/cli: `commitlint`的命令行工具
-  @commitlint/config-conventional: `commitlint`校验的规则集，比较常用的`Conventional Commits`是`Angular`约定

注意:` @commitlint/config-conventional`在后面会被移除
#### 5.2 commitlint配置
1 配置`commitlint`规则`commitlint.config.cjs`，注意文件名称后缀设置为`.cjs`
```js
module.exports = {
  extends: ["@commitlint/config-conventional"]
};
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

II)**scope**为非必填项，用于描述改动的范围，可以是文件的名称，最好包含路径
III)**subject**是必填项，这次提交的日志信息，提交日志必须有意义。

一般情况下，`commitlint.config.cjs`中插件`@commitlint/config-conventional`默认的规则就够用了。当然，如果需要自定义限制这些规则，不启用默认的规则，可以把配置写的更详细
```js
module.exports = {
  extends: [
    "@commitlint/config-conventional"
  ],
  rules: {
    'type-enum': [2, 'always', [
      'upd', 'feat', 'fix', 'refactor', 'docs', 'chore', 'style', 'revert'
     ]],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72]
  }
};
```
rule配置说明: rule由name和配置数组组成，如：‘name:[0, ‘always’, 72]’，数组中第一位为level，可选0,1,2，0为disable，1为warning，2为error，第二位为应用与否，可选always|never，第三位该rule的值。

4 配置`husky`,让`husky`触发`git hook`钩子`pre-commit`。相关设置已在步骤[3.2husky配置](#commitlint)中`第三步，第四步`配置过了，请跳转查看。

### 6 commitizen
上面通过`commitlint`规范了代码提交时`commit-message`的标准，但操作起来非常不顺手，交互感不够友好，很别扭。别着急，下面介绍的`commitizen`工具就能优化我们的交互体验。

`Commitizen`是一个用于撰写Git提交信息的工具。它可以帮助开发人员遵循一个规范，以便更容易地阅读和维护Git仓库历史记录。`Commitizen`采用了一个交互式的命令行界面，引导你逐步填写必要的数据，从而生成符合规范的Git提交信息。相关配置如下：

#### 6.1依赖安装
```js
pnpm install commitizen cz-conventional-changelog -D
```
#### 6.2 commitizen配置
1 在`package.json` 中添加`commit`指令, 执行`git-cz`指令
```js
pnpm pkg set scripts.commit="git add . && git-cz"
```
2 在项目目录里，运行下面的命令，使其支持`Vue`的`Commit message`格式，自动初始化命令行的选项信息
```js
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

以后，凡是用到`git commit`命令，一律改为使用`git cz`。这时，就会出现选项，用来生成符合格式的`Commit message`。通过执行命令`pnpm commit`测试如下：
![](https://cdn.staticaly.com/gh/AnyFork/blog-images/main/markdown/202307202317090.png)

### 7 cz-customizable
上面通过`commitizen`可以进行交互式操作，通过引导完成提交信息的填写，但是是英文的，也不够灵活。

`cz-customizable`是一个`Commitizen`的插件，它允许你使用自定义的Git提交规范。通过为项目添加一个配置文件，你可以指定你自己的提交格式，并在使用`Commitizen`时使用该格式。你可以轻松地定义自己的提交类型、作用域和描述等信息.

#### 7.1 依赖安装
```js
pnpm install  cz-customizable commitlint-config-cz --D
```
- cz-customizable
可自定义的`Commitizen`插件（或独立实用程序），可帮助实现一致的提交消息

- commitlint-config-cz
用于配置`cz-customizable`提交模板和共享规则给`commitlint`校验
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
    scopes: [
        { name: 'components' },
        { name: 'assets' },
        { name: 'router' },
        { name: 'utils' },
        { name: 'views' },
        { name: 'types' },
    ],
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
```js
pnpm install commitlint-config-git-commit-emoji -D
```
2 更新`commitlint.config.cjs`移除extends中原来的`@commitlint/config-conventional`，加入`'git-commit-emoji', 'cz'`
```js
module.exports = {
  extends: ['git-commit-emoji', 'cz']
}
```
最后，你可以使用以下命令来代替`git commit`:
```js
pnpm commit
```
这将启动`Commitizen`的交互式命令行界面，并引导你逐步填写必要的数据。此时你看到的便是定制话的`commit-message`交互式界面，还是带表情中文的。
![](https://cdn.staticaly.com/gh/AnyFork/blog-images/main/markdown/202307202353662.png)

### 8 conventional-changelog
通过插`conventional-changelog`可以轻松的将`commit-message`转化为`changelog`

#### 8.1 依赖安装
```js
pnpm install conventional-changelog conventional-changelog-cli -D
```
#### 8.2 conventional-changelog配置
1 将`changelog`脚本添加到您的`package.json`
```json
pnpm pkg set scripts.changelog="conventional-changelog -p cz-config.js -i CHANGELOG.md -s -r 0"
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
```js
pnpm changelog
```
至此，更新日志生成完毕。

### 9 VsCode插件
上面都是通过命令行窗口进行代码提交信息交互，相对来说还不够智能。下面介绍一款`VScode`插件`git-commit-plugin`[点我下载安装](https://marketplace.visualstudio.com/items?itemName=redjue.git-commit-plugin)。该插件会在`VScode`的`git`插件的左上角生成一个小图标，点击按照交互式操作进行提交信息填写。
