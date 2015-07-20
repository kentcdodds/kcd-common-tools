# kcd-common-tools

Common build tools for projects by Kent C. Dodds

## Init tasks

This still needs a little bit of work, but here's some stuff you may want to do when starting a project with
kcd-common-tools:

### Install dependencies:

```
npm i -D kcd-common-tools@1.0.0-beta.10 webpack webpack-dev-server karma karma-chai karma-mocha istanbul isparta karma-chrome-launcher karma-firefox-launcher babel babel-core babel-loader node-libs-browser mocha chai with-package sinon uglify-loader lodash karma-webpack karma-sinon sinon isparta-loader ghooks eslint eslint-loader codecov.io babel-eslint angular-mocks angular
```

### Copy files and create symlinks

Note, this happens as part of the installation of `kcd-common-tools`

```
ln -s node_modules/kcd-common-tools/shared/link/editorconfig .editorconfig && ln -s node_modules/kcd-common-tools/shared/link/eslintignore .eslintignore && ln -s node_modules/kcd-common-tools/shared/link/gitignore .gitignore && ln -s node_modules/kcd-common-tools/shared/link/npmignore .npmignore
cp node_modules/kcd-common-tools/shared/copy/* .
```

### Create webpack & karma overrides

Overrides exist in the `package.json` under the property `kcdCommon`. They can either be overrides themselves or point
to a file which contains the overrides. Examples of overrides:

#### Directly in package.json

```json
{
  "kcdCommon": {
    "webpack": {
      "output": { "library": "myLib" }
    },
    "karma": {
      "autoWatchBatchDelay": 300
    }
  }
}
```

#### As file

```json
{
  "kcdCommon": {
    "webpack": "scripts/webpack-overrides.js",
    "karma": "scripts/karma-overrides.js"
  }
}
```

#### Forms of Overrides

Overrides can take several forms. You can have it be an object that is deep merged with the defaults for all
environments. You can also nest overrides based on environment and have the overrides apply only for a particular
NODE_ENV. For example:

```json
{
  "webpack": {
    "development": {
    },
    "test": {
    },
    "production": {
    }
  }
}
```

Also, if you put your overrides in a separate file, you can make your overrides be a function which returns the
resulting configuration (you manage merging yourself in this case). For example:

```javascript
var _ = require('lodash');
module.exports = webpackOverrides;

function webpackOverrides(defaultConfig) {
  var newConfig = _.cloneDeep(defaultConfig);
  // modifications
  return newConfig;
}
```

### Create scripts

Here are some handy scripts you may want to have:

```json
{
  "scripts": {
    "build:dev": "NODE_ENV=development webpack --config node_modules/kcd-common-tools/shared/webpack.config.js --progress --colors",
    "build:prod": "NODE_ENV=production webpack --config node_modules/kcd-common-tools/shared/webpack.config.js --progress --colors",
    "build": "npm run build:dev & npm run build:prod",
    "check-coverage": "./node_modules/istanbul/lib/cli.js check-coverage --statements 80 --functions 80 --lines 80 --branches 80",
    "ci": "npm run eslint && npm run test:single && npm run check-coverage && npm run build",
    "eslint": "eslint src/ -c node_modules/kcd-common-tools/shared/test.eslintrc",
    "release": "npm run build && with-package git commit -am pkg.version && with-package git tag pkg.version && git push && npm publish && git push --tags",
    "release:beta": "npm run release && npm run tag:beta",
    "report-coverage": "cat ./coverage/lcov.info | codecov",
    "start": "npm run test",
    "test": "COVERAGE=true NODE_ENV=test karma start",
    "test:single": "COVERAGE=true NODE_ENV=test karma start --single-run",
    "test:debug": "NODE_ENV=test karma start --browsers Chrome",
    "tag:beta": "with-package npm dist-tag add pkg.name@pkg.version beta"
  }
}
```
