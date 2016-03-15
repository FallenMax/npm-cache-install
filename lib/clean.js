var path = require('path')
var run = require('./util').run

var DEFAULT_CACHE_DIR = path.resolve(
  process.env.HOME || process.env.USERPROFILE, '.npm-cache-install')


function clean() {
  run('rm -rf ' + DEFAULT_CACHE_DIR)
}

module.exports = clean

