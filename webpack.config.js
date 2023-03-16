let path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',          //файл входа
  output: {                         //файл выхода
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')/*__dirname + '/dist/js' */    //__dirname - корень папки
  },
  watch: true,

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
                debug: true,
                corejs: 3,
                useBuiltIns: "usage"
            }]]
          }
        }
      }
    ]
  }
};