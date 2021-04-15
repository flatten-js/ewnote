module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './srv'
    }
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  }
}
