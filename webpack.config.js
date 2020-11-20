const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/App.jsx',
  output: {
    // path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.js.map',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [new HtmlWebPackPlugin({ template: './public/index.html' })],
  devServer: {
    contentBase: path.join(__dirname, './public'),
    compress: true,
    host: 'localhost',
    // host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true, //for ngrok
  },
  devtool: 'source-map',
}
