const resolve = require('resolve');

const result = resolve.sync('./module');

console.log(result, {basedir: process.cwd()});