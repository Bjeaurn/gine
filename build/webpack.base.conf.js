var path = require('path')

module.exports = {
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/static/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel!eslint',
        exclude: /node_modules/
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
  }
}