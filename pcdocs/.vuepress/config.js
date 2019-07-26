module.exports = {
  title: 'e账柜-后台',
  description: 'ezg-pc Background development document',
  themeConfig: {
    repo: 'https://github.com/gz-ezg/ezg-pc-cloud',
    docsRepo: '/gz-ezg/ezg-pc-cloud',
    editLinks: true,
    editLinkText: '帮助我们改善此页面！',
    head: [
      [
        'link',
        {
          rel: 'icon',
          href: '/favicon.ico'
        }
      ]
    ],
    nav: [
      {
        text: '指南',
        link: '/guide/'
      },
      // {
      //   text: '组件',
      //   items: [
      //     {
      //       text: '列表',
      //       link: '/guide/component/table.md'
      //     },
      //     {
      //       text: '筛选',
      //       link: '/guide/component/table.md'
      //     }
      //   ]
      // },
      {
        text: '插件',
        link: '/guide/'
      },
      {
        text: '自动部署',
        link: '/guide/'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: '基础',
          collapsable: false,
          children: [
            '/guide/',
            '/guide/essentials/layout.md',
            '/guide/essentials/router-and-nav.md',
            '/guide/essentials/permission.md',
            '/guide/essentials/tags-view.md',
            '/guide/essentials/new-page.md',
            '/guide/essentials/style.md',
            '/guide/essentials/server.md',
            '/guide/essentials/mock-api.md',
            '/guide/essentials/import.md',
            '/guide/essentials/deploy.md',
            '/guide/essentials/env.md'
          ]
        },
        {
          title: '组件',
          collapsable: false,
          children: ['/guide/components/table.md']
        },
        {
          title: '接口',
          collapsable: false,
          children: [
            '/guide/service/axios.md',
            '/guide/service/server.md',
            '/guide/service/practice.md',
            '/guide/service/method.md'
          ]
        },
        {
          title: '路由',
          collapsable: false,
          children: ['/guide/other/faq.md', '/guide/other/release-notes.md']
        },
        {
          title: '状态管理',
          collapsable: false,
          children: ['/guide/other/faq.md', '/guide/other/release-notes.md']
        },
        {
          title: '权限',
          collapsable: false,
          children: ['/guide/other/faq.md', '/guide/other/release-notes.md']
        },
        {
          title: '打包优化',
          collapsable: false,
          children: ['/guide/other/faq.md', '/guide/other/release-notes.md']
        }
      ]
    }
  }
}
