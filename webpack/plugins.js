const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const { compact } = require('lodash')

const getCurrentDate = require('./utils/getCurrentDate')
const getLastCommitHash = require('./utils/getLastCommitHash')
const chunkToName = require('./utils/chunkToName')

const currentDate = getCurrentDate()
const lastCommitHash = getLastCommitHash()

module.exports = (isDev) => compact([
  new CleanWebpackPlugin(),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(isDev ? 'development' : 'production'),
    },
    __MODIFICATION_DATE__: JSON.stringify(currentDate),
    __VERSION__: JSON.stringify(lastCommitHash),
  }),

  isDev && new webpack.HotModuleReplacementPlugin(),

  new webpack.NamedChunksPlugin(chunkToName),

  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/template.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),

  process.env.npm_config_report && new BundleAnalyzerPlugin(),
])
