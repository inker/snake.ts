const { createLodashTransformer } = require('typescript-plugin-lodash')

const tsOptions = env => env === 'dev' ? {} : {
  getCustomTransformers: () => ({ before: [createLodashTransformer()] }),
  ignoreDiagnostics: [],
}

module.exports = env => [
  {
    test: /\.tsx?$/,
    use: {
      loader: 'awesome-typescript-loader',
      options: tsOptions(env),
    },
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
    ],
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 1,
      },
    },
  },
].filter(item => item)
