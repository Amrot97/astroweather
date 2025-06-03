const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      // Ensure proper template is used
      template: './web/index.html',
    },
    argv
  );
  
  // Add CopyWebpackPlugin to copy icon.png to favicon.png
  if (!config.plugins) {
    config.plugins = [];
  }

  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets', 'icon.png'),
          to: path.resolve(__dirname, 'assets', 'favicon.png'),
        },
      ],
    })
  );

  // Add polyfills for Node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "path": require.resolve("path-browserify"),
    "fs": false,
    "os": require.resolve("os-browserify/browser"),
    "buffer": require.resolve("buffer/"),
  };

  // Add Buffer polyfill
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  );

  // Customize the config as needed
  return config;
}; 