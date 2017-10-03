var path = require('path');

module.exports = {
    entry: './dist/main.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: './bundle.js'
    },
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)
    
        modules: [
          "node_modules",
          path.resolve(__dirname, "app")
        ]
    },
    devServer: {
        proxy: { // proxy URLs to backend development server
          '/api': 'http://localhost:3000'
        },
        contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        inline: true
        // ...
    }
  }