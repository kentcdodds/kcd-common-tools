#!/usr/bin/env bash
set -e

echo "Installing kcd-common-tools"

ln -s node_modules/kcd-common-tools/shared/link/editorconfig .editorconfig
ln -s node_modules/kcd-common-tools/shared/link/eslintignore .eslintignore
ln -s node_modules/kcd-common-tools/shared/link/gitignore .gitignore
ln -s node_modules/kcd-common-tools/shared/link/npmignore .npmignore

cp node_modules/kcd-common-tools/shared/copy/* .

echo "Things linked and copied."
echo "You may want to run this to install some deps for your project:"
echo "> npm i -D webpack webpack-dev-server karma karma-chai karma-mocha istanbul isparta karma-chrome-launcher karma-firefox-launcher babel babel-core babel-loader node-libs-browser mocha chai with-package sinon uglify-loader lodash karma-webpack karma-sinon sinon isparta-loader ghooks eslint eslint-loader codecov.io babel-eslint"
