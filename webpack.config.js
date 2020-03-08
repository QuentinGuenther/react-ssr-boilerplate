var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')

var browserConfig = {
  mode: "production",
  devtool: "source-map",
  entry: './src/client/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { 
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
              loader: "ts-loader"
          }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  externals: {
    "cors": "CORS",
    "express": "Express",
    "isomorphic-fetch": "IsomorphicFetch",
    "react": "React",
    "react-dom": "ReactDOM",
    "react-router-dom": "ReactRouterDOM",
    "serialize-javascript": "SerializeJavascript"
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ]
}

var serverConfig = {
  mode: "production",
  devtool: "source-map",
  entry: './src/server/index.tsx',
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { 
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
              loader: "ts-loader"
          }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
}

module.exports = [browserConfig, serverConfig]