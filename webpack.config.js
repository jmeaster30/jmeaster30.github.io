var webpack = require('webpack');
var path = require('path');

// variables
var isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './build');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  context: sourcePath,
  mode: isProduction ? 'production' : 'development',
  entry: {
    app: './main.tsx',
  },
  output: {
    path: outPath,
    filename: isProduction ? '[contenthash].js' : '[fullhash].js',
    chunkFilename: isProduction
      ? '[name].[contenthash].js'
      : '[name].[fullhash].js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    mainFields: ['module', 'browser', 'main'],
    alias: {
      app: path.resolve(__dirname, 'src/app/'),
      'assets': path.resolve(__dirname, 'src/assets/'),
    },
  },
  module: {
    rules: [
      // sass
      {
        test: /\.((s[ac])|c)ss$/i,
        use: [
          { loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader' },
          { loader: 'css-modules-typescript-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction,
              importLoaders: 1,
              modules: {
                localIdentName: '[local]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require.resolve("sass"),
              sourceMap: !isProduction,
              warnRuleAsWarning: true,
            },
          },
        ],
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { 
        test: /\.(a?png|svg|jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2|jfif)$/i,
        type: 'asset/resource',
      },
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: [
          !isProduction && {
            loader: 'babel-loader',
            options: { plugins: ['react-refresh/babel'] },
          },
          'ts-loader',
        ].filter(Boolean),
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: false,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10,
          filename: isProduction
            ? 'vendor.[contenthash].js'
            : 'vendor.[fullhash].js',
        },
      },
    },
    runtimeChunk: false,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[contenthash].css' : '[fullhash].css',
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.html',
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  devServer: {
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  // https://webpack.js.org/configuration/devtool/
  devtool: isProduction ? 'hidden-source-map' : 'eval-cheap-module-source-map',
};
