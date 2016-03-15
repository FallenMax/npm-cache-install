# npm-cache-install

Offline `npm install`, using locally cached packages.

The idea is based on [npm-cache](https://github.com/swarajban/npm-cache), but instead of caching whole `node_modules` directory, `npm-cache-install` will cache each package seperately, so changing any of them will not invalidate whole cache.

Also, any npm options will be passed to `npm install` (like `--registry`, etc.)

## Usage:

### 1. npm-cache-install install [options]

Run it instead of `npm install [options]`, it will:

- read `package.json`, get a list of dependencies
- for each dependency
  + if already installed and satisfies specified version, continue
  + if cached in cache directory (`~/.npm-cache-install`), restore to `./node_modules/[dependency]`, continue
  + actually runs `npm install dependency@version [options]`,
  + save installed package to cache directory

### 2. npm-cache-install clean

`rm -rf` cache directory for you.


## Caveat:

1. Windows is not supported for now
2. Does not differentiate node version and node architecture (if node version changes, please clean cache directory manually)
3. Bad support for `peerDependency`, which might cause problems.
4. Not tested with npm@3

Issues and PRs are welcomed


## History

#### 2016-03-15 `0.1.0`

- add: 'clean' command
- fix: git/github/http(s) dependencies support
- fix: problem when handling intallation failure
