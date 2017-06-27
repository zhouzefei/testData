var path = require('path')
module.exports = {
  share: {
    viewSrcPath: 'views/src/',
    viewPath: 'views/dist/'
  },
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../public/'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '//img.maihaoche.com/testAdmin/assets/', //七牛的地址
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 5000,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  }
}
