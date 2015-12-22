# npm-cache-install

Accelerate `npm install` by caching installed packages.

The idea is based on [npm-cache](https://github.com/swarajban/npm-cache), but `npm-cache-install` will cache every package listed in `package.json`, not whole `node_modules` directory, so if one or more packages are changed, other packages cache will stay valid.

## Usage

Run `npm-cache-install install` instead of `npm install`, it will:

- read `package.json`, get a list of dependencies
- for each dependency
  + if already installed and satisfies specified version, continue
  + if cached in cache directory (in `~/.npm-cache-install`), restore to `./ node_modules/[dependency]` , continue
  + actually runs `npm install dependency@version [options]`,
  + save installed package to cache directory

## Caveat:

1. Windows is not supported for now
2. Does not support node version and node architecture

Issues and PRs are welcomed
