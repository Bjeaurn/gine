var webpack = require('webpack'),
    path = require('path');

var libraryName = 'gine2',
    outputFile = 'index.js';

module.exports = {
  entry: {
    index: './src/index.ts'
  },
  output: {
    path: path.resolve('./dist/'),
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts' ],
  },
  externals: [ 'rxjs' ],
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: 'gine'
    })
  ],

};