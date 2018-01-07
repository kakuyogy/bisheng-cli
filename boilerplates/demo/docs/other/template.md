---
title: 任务
order: 2
---

> ** 你可以创建.bishengrc.js来做一些定制型的配置

---

比如你可以在bishengConfig中设置output属性，也可以在alias属性中增加组件的全路径引用

```js
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
module.exports = {
  headers: [
    {
      "title": "首页",
      "path": '/',
      "component": "./bisheng/template/Index"
    },
    {
      "title": "组件",
      "source": "./components"
    },
    {
      "title": "其他",
      "source": "./docs/other"
    }
  ],
  bishengConfig: {
    webpackConfig: function (config) {
      config.resolve.alias = {
        'catd/lib': path.join(process.cwd(), 'components')
      };
      if (isDev) {
        config.devtool = 'source-map';
      }
      return config;
    },
  },
};
```

这样的配置会更加灵活