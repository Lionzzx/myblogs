# 布局

页面整体布局是一个产品最外层的框架结构，往往会包含导航、侧边栏、面包屑以及内容等。想要了解一个后台项目，先要了解它的基础布局。

## Layout

![](/background.png)

基于这个 `layout` 的，除了个别页面如：`login` , `404`, `401` 等页面没有使用该`layout`。如果你想在一个项目中有多种不同的`layout`也是很方便的，只要在一级路由那里选择不同的`layout`组件就行。

```js
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {},
  component: () => import(/* webpackChunkName: "Login" */ '@/layouts/login.vue')
}

// Has layout
import Main from '@/layouts/Main.vue'
export default {
  access: 6140,
  meta: 6140,
  path: '/solutionTool',
  icon: 'document-text',
  title: '方案工具',
  name: 'solutionTool',
  component: Main,
  children: [
    {
      access: 6141,
      meta: 6141,
      path: 'useRecord',
      title: '使用记录',
      name: 'useRecord_index',
      component: () =>
        import(
          /* webpackChunkName: "useRecord_index" */ '@/views/solutionTool/useRecord/index.vue'
        )
    }
  ]
}
```

这里使用了 vue-router [路由嵌套](https://router.vuejs.org/zh/guide/essentials/nested-routes.html), 所以一般情况下，你增加或者修改页面只会影响 `app-main`这个主体区域。其它配置在 `layout` 中的内容如：侧边栏或者导航栏都是不会随着你主体页面变化而变化的。

```
/foo                                  /bar
+------------------+                  +-----------------+
| main           |                    | main          |
| +--------------+ |                  | +-------------+ |
| | foo.vue      | |  +------------>  | | bar.vue     | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

当然你也可以一个项目里面使用多个不同的 `layout`，只要在你想作用的路由父级上引用它就可以了。

<br>

## app-main

这里在 `app-main` 外部包了一层 `keep-alive` 主要是为了缓存 `<router-view>` 的，配合页面的 `tabs-view` 标签导航使用，如不需要可自行[去除](tags-view.md)。

其中`transition` 定义了页面之间切换动画，可以根据自己的需求，自行修改转场动画。相关[文档](https://cn.vuejs.org/v2/guide/transitions.html)。

<br>
