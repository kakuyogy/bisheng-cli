const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
module.exports = {
  home: {
    "title": "首页",
    "icon": "windows-o",
    "path": '/',
    "component": "home"
  },
  component: {
    "title": "组件",
    "source": "components",
    "component": "src",
    "icon" : "appstore",
    "typeOrder": {
      General: 0,
      Layout: 1,
    },
    "order": 1,
  },
  articles: [
    {
      "title": "其他",
      "source": "other",
      "order": 2,
    },
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