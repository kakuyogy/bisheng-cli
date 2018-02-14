import { resolve, relative } from 'path';
import fs, { realpathSync, existsSync, readFileSync } from 'fs';
import stripJsonComments from 'strip-json-comments';
import parseJSON from 'parse-json-pretty';
import placeholder from 'replace-holder';
import rimraf from 'rimraf';
import glob from 'glob';
import { transformFileSync } from 'babel-core';

export function getPaths(cwd) {
  const appDir = realpathSync(cwd);
  const ownDir = resolve(__dirname, '../');

  function resolveApp(relativePath) {
    return resolve(appDir, relativePath);
  }

  function resolveOwn(relativePath) {
    return resolve(ownDir, relativePath);
  }

  return {
    ownDir,
    appDir,
    resolveApp,
    resolveOwn,
    relativeAppDir: (absolutePath) => relative(appDir, absolutePath),
    bPath: (name) => resolveOwn(`boilerplates/${name}`),
  };
}

export function getRcConfig(rcFilename, paths) {
  const jsRcPath = paths.resolveApp(`${rcFilename}.js`);
  const rcPath = paths.resolveApp(rcFilename);

  if (existsSync(jsRcPath)) {
    return require(jsRcPath);
  } else if (existsSync(rcPath)) {
    return parseJSON(stripJsonComments(readFileSync(rcPath, 'utf8')), rcFilename);
  } else {
    return {};
  }
}
// type: routes, source, themeConfig
export function getConfigFromRc(rcConfig, type, paths) {
  let finalResult = null;
  const docsBase = paths.resolveApp('docs');
  if (type === 'routes') {
    finalResult = [];
    if ('home' in rcConfig) {
      let cur = rcConfig.home;
      const route = {};
      route.isHome = true;
      route.path = cur.path || '/';
      route.component = './template/' + cur.component;
      finalResult.push(route);
    }

    finalResult.push({
      path: '/:type/:doc',
      component: './template/Doc',
    });

  } else if (type === 'source') {
    // copy home
    if ('home' in rcConfig) {
      let cur = rcConfig.home;
      let componentPath = resolve(docsBase, cur.component);
      const targetDir = paths.resolveOwn(`lib/site/theme/template/${cur.component}`);
      if (existsSync(targetDir)) {
        rimraf.sync(targetDir);
      }
      if (existsSync(componentPath)) {
        placeholder.fileSync(componentPath + '/**', {}, targetDir);
        glob.sync(targetDir + '/**', {
          realPath: true,
          nodir: true,
          dot: true,
        })
          .forEach(function (file) {
            const content = transformFileSync(file).code;
            fs.writeFileSync(file, content, { encoding: 'utf8' });
          });
      }
    }

    finalResult = {};

    if ('component' in rcConfig) {
      let cur = rcConfig.component;
      finalResult.component = paths.resolveApp(cur.component);
      if (cur.source) {
        finalResult[`__${cur.source}__`] = resolve(docsBase, cur.source);
      }
    }

    if ('articles' in rcConfig) {
      let cur = rcConfig.articles;
      const articles = Array.isArray(cur) ? cur : [cur];
      articles.reduce(function (result, article) {
        result[article.source] = resolve(docsBase, article.source);
      }, finalResult);
    }
  } else if (type === 'themeConfig') {
    finalResult = {};
    if ('component' in rcConfig) {
      let cur = rcConfig.component;
      if ('typeOrder' in cur) {
        rcConfig.bishengConfig = rcConfig.bishengConfig || {};
        rcConfig.bishengConfig.themeConfig = rcConfig.bishengConfig.themeConfig || {};
        finalResult = {
          ...rcConfig.bishengConfig.themeConfig,
          typeOrder: cur.typeOrder,
        };
      }
    }

    let headers = [];
    if ('home' in rcConfig) {
      rcConfig.home.type = 'home';
      headers.push(rcConfig.home);
    }
    let articles = [];
    if ('component' in rcConfig) {
      rcConfig.component.type = 'component';
      articles.push(rcConfig.component);
    }
    if ('articles' in rcConfig) {
      articles = articles.concat(Array.isArray(rcConfig.articles) ? rcConfig.articles : [rcConfig.articles]);
    }
    headers = headers.concat(
      articles.sort((a, b) => (a.order - b.order))
    );
    finalResult.headers = headers;
  }

  return finalResult;
}
