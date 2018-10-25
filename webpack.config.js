const path = require('path'),
pathToPhaser = path.join(__dirname, '/node_modules/phaser/'),
phaser = path.join(pathToPhaser, 'dist/phaser.js'),
MinifyPlugin = require("babel-minify-webpack-plugin"),
{BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = {
  entry: './src/game.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.min.js',
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
      { test: /phaser\.js$/, loader: 'expose-loader?Phaser' }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //     analyzerMode: 'static'
    // }),
    new MinifyPlugin({}, {})
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    publicPath: '/build/',
    host: '127.0.0.1',
    port: 9000,
    open: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      phaser: phaser
    }
  }
};