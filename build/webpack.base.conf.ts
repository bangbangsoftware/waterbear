var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
//var PrepackPlugin = require('prepack-webpack-plugin').default

function resolve(dir) {
   return path.join(__dirname, '..', dir)
}

var configuration = {}

module.exports = {
//   plugins: [
//      new PrepackPlugin()
//   ],
   entry: {
      app: './src/main.js'
   },
   output: {
      path: config.build.assetsRoot,
      filename: '[name].js',
      publicPath: process.env.NODE_ENV === 'production' ?
         config.build.assetsPublicPath : config.dev.assetsPublicPath
   },
   resolve: {
      extensions: ['.js', '.vue', '.json', '.html'],
      modules: [
         resolve('src'),
         resolve('node_modules')
      ],
      alias: {
         'vue$': 'vue/dist/vue.common.js',
         'src': resolve('src'),
         'assets': resolve('src/assets'),
         'components': resolve('src/components')
      }
   },
   module: {
      rules: [{
         test: /\.html$/,
         loader: 'vue-html-loader',
         query: {
            minimize: true
         }
         //            {
         //                test: /\.html$/,
         //                use: 'vue-template-loader'
         //            }, {
         //                test: /\.css$/,
         //                use: ['style-loader', 'css-loader?modules'] // Enable CSS Modules 
      }, {
         test: /\.(js|vue)$/,
         loader: 'eslint-loader',
         enforce: "pre",
         include: [resolve('src'), resolve('test')],
         options: {
            formatter: require('eslint-friendly-formatter')
         }
      }, {
         test: /\.vue$/,
         loader: 'vue-loader',
         options: vueLoaderConfig
      }, {
         test: /\.js$/,
         loader: 'babel-loader',
         query: {
            presets: ['es2015']
         },
         include: [resolve('src'), resolve('test')]
      }, {
         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
         loader: 'url-loader',
         query: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
         }
      }, {
         test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
         loader: 'url-loader',
         query: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
         }
      }]
   }
}
