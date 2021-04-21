module.exports = {
  theme: 'reco',
  title: '青空小栈',
  description: '请空小哥想走得更远',
  themeConfig: {
    search: true,
    nav: [
      { text: '首页', link: '/' },
      { text: 'GitHub', link: 'https://github.com/qingkong141' },
    ],
    sidebar: [
      ['/', '简介'],
      {
        title: "多级",
        collapsable: true,
        children: [
          ['/pagethree/1.md', '页面1'],
          // ['/pagethree/2.md', '页面2']
        ]
      },
      // ['/pageone/index1.md', '第一页标题'],// index这个名称不能使用
      // ['/pagetwo/feedback.md', '第二页标题'],
      // {
      //   title: "多级",
      //   collapsable: true,
      //   children: [
      //     ['/pagethree/1.md', '页面1'],
      //     ['/pagethree/2.md', '页面2']
      //   ]
      // },
    ]
  }
}