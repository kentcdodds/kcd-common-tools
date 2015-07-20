#!/usr/bin/env bash
set -e

echo "Installing kcd-common-tools"

pushd ../../

ln -sf node_modules/kcd-common-tools/shared/link/editorconfig .editorconfig
ln -sf node_modules/kcd-common-tools/shared/link/eslintignore .eslintignore
ln -sf node_modules/kcd-common-tools/shared/link/gitignore .gitignore
ln -sf node_modules/kcd-common-tools/shared/link/npmignore .npmignore

cp node_modules/kcd-common-tools/shared/copy/* .

popd

echo "Things linked and copied."
echo "You may want to run this to install some deps for your project:"
echo "> npm i -D webpack webpack-dev-server karma karma-chai karma-mocha istanbul isparta karma-chrome-launcher karma-firefox-launcher babel babel-core babel-loader node-libs-browser mocha chai with-package sinon uglify-loader lodash karma-webpack karma-sinon sinon isparta-loader ghooks eslint eslint-loader codecov.io babel-eslint"
