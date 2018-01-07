import { getRoutesOrSource } from '../utils';

const {resolve} = require('path');
const { getPaths, getRcConfig } = require('../utils');

const paths = getPaths(process.cwd());

const rcFilename = '.bishengrc';

const defaultConfig = {
  theme: resolve(__dirname, 'theme'),
  port: 8000,
  root: '/',
};

const customConfig = getRcConfig(rcFilename, paths);

defaultConfig.source = getRoutesOrSource(customConfig, 'source', paths);
defaultConfig.themeConfig = getRoutesOrSource(customConfig, 'themeConfig', paths);

const bishengConfig = ('bishengConfig' in customConfig)
  ? {
    ...defaultConfig,
    ...(customConfig.bishengConfig),
  }
  : defaultConfig;
console.dir(bishengConfig);
module.exports = bishengConfig;
