#!/usr/bin/env bash
set -e

echo "Installing kcd-common-tools"

ln -s ./shared/link/editorconfig ../../.editorconfig
ln -s ./shared/link/eslintignore ../../.eslintignore
ln -s ./shared/link/gitignore ../../.gitignore
ln -s ./shared/link/npmignore ../../.npmignore

cp ./shared/copy/* ../../.

echo "Things linked and copied."
echo "You may want to run this to install some deps for your project:"
echo "> npm i -D webpack webpack-dev-server karma karma-chai karma-mocha istanbul isparta karma-chrome-launcher karma-firefox-launcher babel babel-core babel-loader node-libs-browser mocha chai with-package sinon uglify-loader lodash karma-webpack karma-sinon sinon isparta-loader ghooks eslint eslint-loader codecov.io babel-eslint"
