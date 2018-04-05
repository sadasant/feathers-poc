var path = require('path')

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  entry: path.join(__dirname, 'poc/index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'index.js',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}
