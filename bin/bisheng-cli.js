const yargs = require('yargs');

const command = process.argv[2];

const argv = yargs
  .version(require('../package.json').version)
  .usage('Usage: bisheng-cli start                to start a server')
  .usage('Usage: bisheng-cli build [options]      to build and write static files')
  .usage('Usage: bisheng-cli gh-pages [options]   to deploy website to gh-pages')
  .usage('Usage: bisheng-cli demo [reponame]      to generate a demo')
  .usage('command help: bisheng-cli [command] -h  to know about command')
  .command('build [options]', 'to build and write static files', {
    ssr: {
      desc: 'whether to enable ssr while building pages.',
    },
  })
  .help('h')
  .argv;

argv.command = command;
// console.dir(argv);
require('../lib')(argv);

