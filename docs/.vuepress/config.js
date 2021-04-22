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
    sidebar: Sidebar,
    head: [
      ['link', { rel: 'shortcut icon apple-touch-icon', href: 'favicon.ico' }],
      ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' }],
    ],
  }
}