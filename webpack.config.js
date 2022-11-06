const path = require('path');
const NodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: "./index.ts",
  mode: "development",
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  externals: [NodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
  ],
}
