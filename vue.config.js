const BabelMinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    optimization: {
      minimizer: [new BabelMinifyPlugin()],
    },
    
  },
};
