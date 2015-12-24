# npm-cache-install

Use locally cached packages to speed up `npm install`, greatly reducing network & binary compilation time for subsequent deploys.

The idea is based on [npm-cache](https://github.com/swarajban/npm-cache), but instead of caching whole `node_modules` directory, `npm-cache-install` will cache each package independently, so that if one or more packages are changed, other package caches are still valid.

Also, any npm options will be passed to `npm install` (like `--registry`, etc.)

## Usage:

Run `npm-cache-install install [options]` instead of `npm install`, it will:

- read `package.json`, get a list of dependencies
- for each dependency
  + if already installed and satisfies specified version, continue
  + if cached in cache directory (in `~/.npm-cache-install`), restore to `./ node_modules/[dependency]` , continue
  + actually runs `npm install dependency@version [options]`,
  + save installed package to cache directory

## Caveat:

1. Windows is not supported for now
2. Does not differentiate node version and node architecture (if node version changes, please clean cache directory manually)
3. Not tested with npm@3

Issues and PRs are welcomed
