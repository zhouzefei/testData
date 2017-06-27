var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var htmlPlugins = [];
var entry = {}
var appDir = path.resolve(__dirname, './views/src');
fs.readdirSync(appDir).filter(function(child) {
  return fs.lstatSync(appDir + '/' + child).isDirectory()
}).forEach(function(child) {
  if(fs.existsSync(path.resolve(__dirname, './views/src/' + child + '/js/index.js'))) {
    entry[child] = [
      './views/src/' + child + '/js/index.js'
    ];
    var conf = {
      filename:  __dirname + "/views/dist/" + child + '.html', //output
      template:  __dirname + "/views/src/" + child + '/index.ejs', //input
      inject: true,    //js插入的位置，true/'head'/'body'/false
      chunks: child + ".js",
      hash: false,
      minify: { //压缩HTML文件
        removeComments: false, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    };
    htmlPlugins.push(new HtmlWebpackPlugin(conf));
  };
});

module.exports = {
  entry: entry,
  output: {
      path: __dirname + "/views/dist/",
      filename: "[name].js",
      publicPath: "/views/dist/"
  },
  externals:{
    react:'React',
    'react-dom':'ReactDOM',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.ejs|\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ].concat(htmlPlugins)
}
