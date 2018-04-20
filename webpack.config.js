const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
        'fs': 'memfs',
    }
  },
  // node: {
  //   fs: 'mock',
  // },
  // target: 'web',
  // target: "webworker", // or 'node' or 'node-webkit'
  // externals: {
  //     fs:    "commonjs fs",
  //     path:  "commonjs path"
  // },
};