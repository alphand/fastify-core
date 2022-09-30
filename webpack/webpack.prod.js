/* eslint-disable filenames/match-regex */

const {merge} = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports = merge(common, {
  mode: 'production',
});
