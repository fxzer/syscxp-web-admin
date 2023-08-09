const path = require('path');
function resolve(relativePath) {
  return path.join(__dirname, relativePath)
}
module.exports = {
  publicPath: '/boss/web/',
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.module
      .rule('js')
      .exclude.add(resolve('src/assets/fonts'))
      .end()
  },
  devServer: {
    proxy: {
      '/hybridwan/api': {
        target: 'http://192.168.211.63:8100',
        ws: false,
        changeOrigin: true
      },
      '/account/api': {
        target: 'http://192.168.211.63',
        ws: false,
        changeOrigin: true
      },
      '/website/api': {
        target: 'http://192.168.211.63:8130',
        ws: false,
        changeOrigin: true,
      },
    }
  }
}