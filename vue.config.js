'use strict'
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, dir)
}

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    moment: 'moment',
    'ant-design-vue': 'antd'
  },
  css: [],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.3.2/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
    'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
    'https://cdn.jsdelivr.net/npm/moment@2.25.3/moment.min.js',
    'https://cdn.jsdelivr.net/npm/moment@2.25.3/locale/zh-cn.js',
    'https://cdn.jsdelivr.net/npm/ant-design-vue@1.6.2/dist/antd.min.js'
  ]
}

module.exports = {
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:7001',
    //     pathRewrite: { '^/api': '' }
    //   }
    // },
    before: require('./mock/mock-server.js')
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: ['src/styles/ant-variable.less', 'src/styles/app-variable.less']
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack (config) {
    config.when(isProd, config => {
      config.externals(assetsCDN.externals)
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: module => {
              return !/lodash/.test(module.context)
            },
            priority: 50,
            chunks: 'initial'
          },
          lodash: {
            name: 'chunk-lodash',
            priority: 10,
            test: module => {
              return /lodash/.test(module.context)
            },
            chunks: 'initial'
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            priority: 5,
            chunks: 'initial'
          }
        }
      })
    })
  }
}
