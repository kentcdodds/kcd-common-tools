# 1.0.0-beta

## Features

- Support a bunch of common files to be linked using symbolic link:
  - .editorconfig
  - .eslintignore
  - .gitignore
  - .npmignore
  - .travis.yml
  - LICENSE
- Support two code-check scripts (which should actually probably be eslint plugins...
  - console-check.js
  - only-check.js
- Support `.eslintrc` which should be extended using `extends`
- Support `karma.conf.js` with override option available via `kcdCommon.karma` property in `package.json`
- Support `webpack.config.js` with override option available via `kcdCommon.webpack` property in `package.json`
