const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'app/index.js'),
  ],
  output: {
    path: path.resolve(process.cwd(), 'server/public'),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['react', 'babel-preset-react-hmre'],
        },
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    
  ],
};