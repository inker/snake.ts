const { createLodashTransformer } = require('typescript-plugin-lodash')
const { compact } = require('lodash')

const tsOptions = (isDev) => isDev ? {
  useCache: true,
} : {
  getCustomTransformers: () => ({
    before: [
      createLodashTransformer(),
    ],
  }),
  ignoreDiagnostics: [],
}

module.exports = (isDev) => compact([
  {
    test: /\.tsx?$/,
    use: {
      loader: 'awesome-typescript-loader',
      options: tsOptions(isDev),
    },
    exclude: /node_modules/,
  },
])
