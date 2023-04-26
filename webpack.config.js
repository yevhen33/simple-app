'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/script.js',
  target: 'web',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
