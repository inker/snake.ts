const { createLodashTransformer } = require('typescript-plugin-lodash')

const tsOptions = env => env === 'dev' ? {} : {
  getCustomTransformers: () => ({ before: [createLodashTransformer()] }),
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
  // other loaders
].filter(item => item)
