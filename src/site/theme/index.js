const routes = require('../../../routes.js');

const entryConfig = {
  lazyLoad: false,
  routes,
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=2&keepElem',
    'bisheng-plugin-antd',
    'bisheng-plugin-react?lang=__react',
  ],
};

const homeRoute = routes.filter(function(route) {
  return route.isHome === true;
});

if(homeRoute && homeRoute.length > 0) {
  entryConfig.home = homeRoute[0].path;
}

module.exports = entryConfig;