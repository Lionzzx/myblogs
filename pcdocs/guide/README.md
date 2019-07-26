---
pageClass: getting-started
---

# 介绍

[![vue](https://img.shields.io/badge/vue-2.6.10-brightgreen.svg)](https://cn.vuejs.org/index.html)
[![iview-ui](https://camo.githubusercontent.com/4874c51ffe31bec99616d5ad1f46dfd9e93d5d50/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f69766965772d332e322e322d627269676874677265656e2e7376673f7374796c653d666c61742d737175617265)](https://www.iviewui.com/)

这是一个后台前端解决方案，基于 [vue](https://github.com/vuejs/vue) 和 [iview-ui](https://www.iviewui.com)实现。它使用了最新的前端技术栈，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速开发企业级中后台产品原型。

:::tip 其他项目
在开发过程中，尝试的一些框架。

- 基础移动开发 vant 版: [h5-vant](https://github.com/Lionzzx/h5_vant)
- 基于 uniapp 跨端项目 park: [uni-park](https://github.com/gz-ezg/park)
- Typescript版我的服务: [myserve](https://github.com/gz-ezg/myserve.git)
- react版外勤打卡: [legwork-react](https://github.com/gz-ezg/legwork-react.git)
- react-native: [react-native](https://github.com/gz-ezg/legwork-react.git)
- flutter: [flutter](https://github.com/gz-ezg/legwork-react.git)
- 基于webpack+ts小程序: [flutter](https://github.com/gz-ezg/legwork-react.git)
:::


:::warning
[在走向全栈道路的一些实践与思考](https://github.com/gz-ezg/legwork-react.git)
:::

## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[axios](https://github.com/axios/axios) 和 [iview-ui](https://www.iviewui.com)，提前了解和学习这些知识会对使用本项目有很大的帮助。

## 项目结构

下面是整个项目的目录结构。

```bash
├── build                      # 构建相关
├── config                     # 环境变量及端口定义
├── public                     # dll打包
├── src                        # 源代码
│   ├── api                    # 所有请求
│   │    ├── logManagement     # 相对应模块的请求接口
│   │    ├── ...        
│   ├── images                 # 图片等静态资源
│   ├── components             # 全局公用组件
│   ├── directive              # 全局指令
│   ├── filters                # 全局 filter
│   ├── layout                 # 全局 layout
│   ├── libs                   # 引用库
│   ├── locale                 # 国际化
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
├── .eslintrc.json              # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── .travis.yml                # 自动化CI配置
├── .gitignore                 # git忽略文件
├── deploy.sh                  # bash脚本
├── .index.html                # 入口index
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```
## 安装

```bash
# 克隆项目
git clone https://github.com/gz-ezg/ezg-pc-cloud.git

# 进入项目目录
cd ezg-pc-cloud

# 安装依赖
npm install --registry=https://registry.npm.taobao.org

# 本地开发 启动项目
npm run dev
```

<br/>

::: tip
也可以使用 [yarn](https://github.com/yarnpkg/yarn) 替代 `npm`。

Windows 用户若安装不成功，很大概率是`node-sass`安装失败，[解决方案](https://github.com/PanJiaChen/vue-element-admin/issues/24)。

另外因为 `node-sass` 是依赖 `python`环境的，如果你之前没有安装和配置过的话，需要自行查看一下相关安装教程。
:::

![An image](/background.png)

继续阅读和探索左侧的其它文档。


## 其它

[加我](https://github.com/PanJiaChen/vue-element-admin/issues/602) 一起学习前端


## Vue 生态圈

**首先了解这些 vue 生态圈的东西，会对你上手本项目有很大的帮助。**

1. [Vue Router](https://router.vuejs.org/) 是 vue 官方的路由。它能快速的帮助你构建一个单页面或者多页面的项目。

2. [Vuex](https://vuex.vuejs.org/) 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。它能解决你很多全局状态或者组件之间通信的问题。

3. [Vue Loader](https://vue-loader.vuejs.org) 是为 vue 文件定制的一个 webpack 的 loader，它允许你以一种名为单文件组件 (SFCs)的格式撰写 Vue 组件。它能在开发过程中使用热重载来保持状态，为每个组件模拟出 scoped CSS 等等功能。不过大部分情况下你不需要对它直接进行配置，脚手架都帮你封装好了。

4) [Vue Test Utils](https://vue-test-utils.vuejs.org/) 是官方提供的一个单元测试工具。它能让你更方便的写单元测试。

5) [Vue Dev-Tools](https://github.com/vuejs/vue-devtools) Vue 在浏览器下的调试工具。写 vue 必备的一个浏览器插件，能大大的提高你调试的效率。

6) [Vue CLI](https://cli.vuejs.org/) 是官方提供的一个 vue 项目脚手架，本项目也是基于它进行构建的。它帮你分装了大量的 webpack、babel 等其它配置，让你能花更少的精力在搭建环境上，从而能更专注于页面代码的编写。不过所有的脚手架都是针对大部分情况的，所以一些特殊的需求还是需要自己进行配置。建议先阅读一遍它的文档，对一些配置有一些基本的了解。

7) [Vetur](https://github.com/vuejs/vetur) 是 VS Code 的插件. 如果你使用 VS Code 来写 vue 的话，这个插件是必不可少的。



Modern browsers and Internet Explorer 10+.

<!-- prettier-ignore -->
| [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions