const path = require('path')
const rules = require('./rules')
const plugins = require('./plugins')

const rootDir = process.cwd()
const distDir = path.join(rootDir, 'docs')

module.exports = env => ({
  target: 'web',
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: distDir,
    filename: env === 'dev' ? '[name].js' : '[name].[chunkhash].js',
    sourceMapFilename: '[file].map',
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
    ],
    modules: [
      path.resolve(rootDir, 'src'),
      'node_modules',
    ],
  },
  devtool: env === 'dev' ? 'source-map' : undefined,
  module: {
    rules: rules(env),
  },
  plugins: plugins(env),
  devServer: {
    contentBase: distDir,
    port: 9080,
    compress: env !== 'dev',
    historyApiFallback: {
      rewrites: [
        {
          from: /./,
          to: '/404.html',
        },
      ],
    },
    open: true,
  },
})
