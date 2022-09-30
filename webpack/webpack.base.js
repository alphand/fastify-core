/* eslint-disable filenames/match-regex */

const path = require('path');

const webpack = require('webpack');

const nodeExternals = require('webpack-node-externals');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const {name, version} = require('../package.json');

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  '$WP_APP_NAME': JSON.stringify(name),
  '$WP_APP_VERSION': JSON.stringify(version),
});

module.exports = {
  target: 'node',
  mode: 'production',
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.resolve('dist'),
    library: {
      type: 'commonjs2',
      export: 'default',
    },
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        include: [path.resolve('src')],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  externalsPresets: {node: true},
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.json', '.ts'],
  },
  devtool: 'source-map',
  plugins: [new CleanWebpackPlugin(), DefinePluginConfig, new ForkTsCheckerWebpackPlugin()],
};
