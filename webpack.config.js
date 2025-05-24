const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

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

  // Customize the config as needed
  return config;
}; 