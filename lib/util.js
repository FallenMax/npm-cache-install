var path = require('path')
var fs = require('fs')
var execSync = require('child_process').execSync

exports.isExist = function (path) {
  try {
    fs.accessSync(path)
    return true
  } catch (err) {
    return false
  }
}

exports.mkdirIfNotExist = function (dir) {
  if (!exports.isExist(dir)) {
    fs.mkdirSync(dir)
  }
}

exports.run = function (cmd) {
  return execSync(cmd, {stdio: [0,2,2]})
}
