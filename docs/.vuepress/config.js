var Nav = require('./config/nav.js');
var Sidebar = require('./config/sidebar.js');
module.exports = {
  theme: 'reco',
  title: '青空小栈',
  base: '/',
  description: '种一棵树最好的时间是十年前，其次是现在',
  themeConfig: {
    search: true,
    searchMaxSuggestions: 10,
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    repo: 'https://github.com/qingkong141',
    nav: Nav,
    // [
    //   { text: 'home', link: '/' },
    // ]
    sidebar: Sidebar,
    // sidebar: [
    //   ['/', '简介'],
    //   {
    //     title: "多级",
    //     collapsable: true,
    //     children: [
    //       ['/pagethree/1.md', '页面1'],
    //       // ['/pagethree/2.md', '页面2']
    //     ]
    //   },
    //   // ['/pageone/index1.md', '第一页标题'],// index这个名称不能使用
    //   // ['/pagetwo/feedback.md', '第二页标题'],
    //   // {
    //   //   title: "多级",
    //   //   collapsable: true,
    //   //   children: [
    //   //     ['/pagethree/1.md', '页面1'],
    //   //     ['/pagethree/2.md', '页面2']
    //   //   ]
    //   // },
    // ],
    head: [
      ['link', { rel: 'shortcut icon apple-touch-icon', href: 'favicon.ico' }],
      // ['link', { rel: 'manifest', href: '/manifest.json' }],
      ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' }],
    ],
  }
}