#!/usr/bin/env node

var commands = {
  install: require('./lib/install.js')
}

var args = process.argv.slice(2)
var cmd = args.shift()

if (commands[cmd]) {
  commands[cmd](args)
} else {
  console.info('try `npm-cache-install install`')
}
