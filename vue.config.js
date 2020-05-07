module.exports = {
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 9096,
    open: true,
    proxy: {
        '/api': {
            target: 'http://47.105.71.81:3306',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
},
}
