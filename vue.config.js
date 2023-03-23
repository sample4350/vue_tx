const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  devServer: {
    open: true,
    host: 'localhost',
    port: 3000,
    // proxy: { // 进行代理转发
    //   '/api': {
    //   // 要解决跨域的接口的域名
    //     target: 'http://124.220.192.79:10011',
    //     // 是否开启本地代理 默认true; 如果接口跨域，需要进行此参数配置
    //     changeOrigin: true,
    //     // 如果是https接口，需要配置这个参数
    //     secure: false,
    //     pathRewrite: {
    //       '/api': '' // 重写地址
    //     }
    //   }
    // }
  }
})
