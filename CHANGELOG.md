# 1.0.0-beta.21

## New Features

- Overriding existing symlinks so updates can happen.

# 1.0.0-beta.20

## New Features

- Adding `.eslintrc` to copy which simply extends the main `.eslintrc`

# 1.0.0-beta.19

## Breaking Changes

- Updating `postinstall` script to point to the correct script... :-/

# 1.0.0-beta.18

## Breaking Changes

- Changing `install` to `postinstall`

## Bug Fixes

- Fixing broken symlinks...

# 1.0.0-beta.17

## Updates

- All the last versions were just trial and error for the install script.... relative paths are awesome...

# 1.0.0-beta.12

## Breaking Changes

- Attempting to fix install script

# 1.0.0-beta.11

## New Features

- Adding `copy` directory for things that need to be copied.
- Adding `install` script to automatically create symlinks and copy files when `kcd-common-tools` is installed.

## Breaking Changes

- Removing console-check because eslint should do that for us.
- Adding a ton of rules to `.eslintrc` and adding a `test.eslintrc`

# 1.0.0-beta.10

## Enhancement

- Adding `CODE_OF_CONDUCT.md`

# 1.0.0-beta.9

## Enhancement

- Adding `*.ignored/`, `*.ignored.*`, and `*.ignored` to `gitignore`

# 1.0.0-beta.8

## Breaking Change

- Removing `link/travis.yml`
- Changing `ON_CI` for `CI` because all CI servers set this to `true`.

# 1.0.0-beta.7

## Breaking Changes

- Adding some ignored files

# 1.0.0-beta.6

## Breaking Changes

- Not sure about these dependencies... It's a little confusing..

# 1.0.0-beta.5

## Breaking Changes

- Removing `externals` to allow them to be configured on a per-use basis.

# 1.0.0-beta.4

## Enhancements

- Improving the recognition of dependencies for karma plugins/frameworks and webpack loaders.

# 1.0.0-beta.3

## Other Changes

- Adding sinon, chai, and mocha as strict dependencies.

# 1.0.0-beta.2

## Other Changes

- Removing `api-check` on webpack config to make everything more flexible.

# 1.0.0-beta.1

## Bug Fixes

- Fixed issue where npm ignore was ignoring everything that this library should include.

# 1.0.0-beta.0

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
