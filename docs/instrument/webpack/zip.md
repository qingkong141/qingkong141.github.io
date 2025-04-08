---
title: webpack 将dist文件目录 压缩城zip文件
date: 2021-4-22
sidebar: 'auto'
publish: false
---

```javascript
const fs = require('fs');
const archiver = require('archiver');
const path = require('path'); // 引入 path 模块

// 创建一个可写流，用于将压缩文件保存到指定路径
const output = fs.createWriteStream(path.join(__dirname, 'dist.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // 设置压缩级别
});

// 监听压缩完成事件
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('压缩完成，文件已保存为 dist.zip');
});

// 监听压缩过程中的错误事件
archive.on('error', function(err) {
  throw err;
});

// 将 archive 流管道到 output 流
archive.pipe(output);

// 将 dist 文件夹中的所有文件和文件夹添加到压缩包中
archive.directory('dist/', false);

// 完成压缩操作
archive.finalize();

```

然后配置 package.json 中的 scripts 字段，添加一个名为 "build:zip" 的脚本命令：

```json
    "build:zip": "vue-cli-service build && node zip-dist.js",
```

这样，当你运行 npm run build:zip 命令时，就会先执行 vue-cli-service build 命令来构建项目，然后再执行 node zip-dist.js 命令来将 dist 文件夹压缩成 dist.zip文件。