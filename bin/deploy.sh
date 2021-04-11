#!/usr/bin/env bash

set -e

npm version patch
NEW_VERSION=$(< package.json grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[:space:]')

rm -rf dist/*
npm run build
pushd dist || exit
  touch .nojekyll
  git add .
  git commit -m "${NEW_VERSION}"
  git push
popd || exit
