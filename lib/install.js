var path = require('path')
var semver = require('semver')
var isExist = require('./util').isExist
var mkdirIfNotExist = require('./util').mkdirIfNotExist
var run = require('./util').run

var DEFAULT_CACHE_DIR = path.resolve(
  process.env.HOME || process.env.USERPROFILE, '.npm-cache-install')

function Dependency(name, version) {
  this.name = name
  this.version = version
  this.fullname = name + '@' + version
  this.moduleDir = path.resolve(process.cwd(), 'node_modules', name)
  this.cacheFile = path.resolve(DEFAULT_CACHE_DIR, this.fullname + '.tar.gz')
}
Dependency.prototype.isInstalled = function(){
  if(!isExist(this.moduleDir)) {
    return false
  }
  var installedVersion = require(path.resolve(this.moduleDir,'package.json')).version
  return semver.satisfies(installedVersion, this.version)
}
Dependency.prototype.isCached = function() {
  return isExist(this.cacheFile)
}

function getDependencies() {
  var packageJson = require(path.resolve(process.cwd(), './package.json'))
  return ['dependencies', 'devDependencies']
    .map(function(key){
      return packageJson[key] || {}
    })
    .map(function(dep){
      return Object.keys(dep).map(function(name){ return new Dependency(name, dep[name]) }
    )})
    .reduce(function(prev, cur){
      return prev.concat(cur)
    }, [])
}

function restoreCached(dep) {
  console.info('[nci] restoring from cache:', dep.name)
  mkdirIfNotExist(path.resolve(process.cwd(), 'node_modules'))
  run('rm -rf ' + dep.moduleDir)
  mkdirIfNotExist(dep.moduleDir)
  run('tar -zxf ' + dep.cacheFile + ' -C ' + dep.moduleDir)
}

function saveToCache(dep) {
  mkdirIfNotExist(DEFAULT_CACHE_DIR)
  run('tar -zcf ' + dep.cacheFile+ ' -C ' + dep.moduleDir + ' . ')
}

function npmInstall(dep, args) {
  console.info('[nci] running:', 'npm install ' + dep.fullname + ' ' + args.join(' '))
  run('npm install ' + dep.fullname + ' ' + args.join(' '))
}

function clean(dep) {
  run('rm ' + dep.cacheFile)
  run('rm -rf ' + dep.moduleDir)
}

function install(args) {
  var dependencies = getDependencies()
  dependencies.forEach(function (dep) {
    try {
      if(dep.isInstalled()) {
        console.info('[nci] installed, skip:', dep.fullname);
        return
      }
      if(dep.isCached()){
        restoreCached(dep)
      } else {
        npmInstall(dep, args)
        saveToCache(dep)
      }
    } catch (err) {
      console.error('[nci] failed to install:', dep.fullname);
      console.error(err.stack || err);
      clean(dep)
    }
  })
}

module.exports = install

