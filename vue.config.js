const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Element Admin' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 3737
const port = process.env.port || process.env.npm_config_port || 3737 // dev port

module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development', // eslint-loader 是否在保存的时候检查
  devServer: {
    port: port, // 端口
    open: true, // 自动打开浏览器
    https: false, // 启用https
    overlay: {
      warnings: false,
      errors: true
    }, // 错误、警告在页面弹出
    proxy: {
      '/api': {
        target: 'https://www.imooc.com',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {// 别名配置
        '@': resolve('src')
      }
    }
    // devServer: {
    //   before (app) {
    //     app.get('/api/login', function (req, res) {
    //       const { username, password } = req.query
    //       if (username === 'admin' && password === 'admin') {
    //         res.json({
    //           code: 0,
    //           token: 'qwerty123456'
    //         })
    //       } else {
    //         res.json({
    //           code: 1,
    //           message: '用户名或密码错误'
    //         })
    //       }
    //     })
    //   }
    // }
  },
  // webpack配置
  chainWebpack (config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
