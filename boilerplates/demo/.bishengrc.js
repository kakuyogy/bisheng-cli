const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
module.exports = {
  home: {
    "title": "首页",
    "path": '/',
    "component": "home"
  },
  component: {
    "title": "组件",
    "source": ["src", "components"],
    "typeOrder": {
      General: 0,
      Layout: 1,
    }
  },
  articles: [
    {
      "title": "其他",
      "source": "other"
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