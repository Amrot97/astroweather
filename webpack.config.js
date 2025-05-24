const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      // Ensure proper template is used
      template: './web/index.html',
    },
    argv
  );
  
  // Customize the config as needed
  return config;
}; 