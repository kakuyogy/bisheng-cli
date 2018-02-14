import path from 'path';
import chalk from 'chalk';
import placeholder from 'replace-holder';
import bisheng from 'bisheng/lib';
import { getPaths, getRcConfig, getConfigFromRc } from './utils';

export default function run(argv) {
  const command = argv.command;
  const paths = getPaths(process.cwd());

  if (command === 'start' || command === 'build' || command === 'deploy') {
    // 1. 生成routes.
    const routes = getRoutesConfig('.bishengrc', paths);

    // 2. replace boilerplates/routes.js to routes.js
    placeholder.file(paths.bPath('routes.js'), {
      routes: JSON.stringify(routes, null, 2),
    }, paths.resolveOwn('lib'), function (err) {
      if (err) {
        // eslint-disable-next-line
        console.log(err);
        process.exit(1);
      }

      // 3. 启动bisheng
      argv.config = paths.relativeAppDir(path.join(__dirname, 'site/bisheng.config.js'));
      if (command === 'deploy') {
        argv = {
          ...{
            branch: 'gh-pages',
            remote: 'origin',
          },
          ...argv,
        };
      }
      bisheng[command](argv);
    });

  } else if (command === 'demo') {
    const reponame = process.argv[3] || '';
    placeholder.file(paths.bPath(command + '/**'), {}, paths.resolveApp(reponame), function (err) {
      if (err) {
        // eslint-disable-next-line
        console.log(err);
        process.exit(1);
      }
      // eslint-disable-next-line
      console.log(chalk.green(`Generate demo successfully, ${chalk.cyan(`cd ${reponame || 'docs'}`)} run ${chalk.cyan('bisheng-cli start')}.`));
    });
  }
}

function getRoutesConfig(rcFilename, paths) {
  const customConfig = getRcConfig(rcFilename, paths);
  const routes = getConfigFromRc(customConfig, 'routes', paths);
  return routes;
}