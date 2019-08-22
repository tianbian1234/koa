const webpack = require('webpack')
module.exports = {
    entry: {
        main: [
          'webpack-hot-middleware/client?noInfo=true&reload=true', // 生产环境的入口建议把这个去掉
          './app.js'
        ]
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin()
      ]
}