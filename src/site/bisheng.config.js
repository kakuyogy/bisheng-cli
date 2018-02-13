import { getConfigFromRc } from '../utils';

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


const bishengConfig = ('bishengConfig' in customConfig)
? {
  ...defaultConfig,
  ...(customConfig.bishengConfig),
}
: defaultConfig;

bishengConfig.source = getConfigFromRc(customConfig, 'source', paths);
bishengConfig.themeConfig = getConfigFromRc(customConfig, 'themeConfig', paths);

console.dir(bishengConfig);
module.exports = bishengConfig;
