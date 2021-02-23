const webpack = require("webpack");
module.exports = {
  devServer: {
    proxy: "http://49.233.191.35:3000"
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      }),
      // new webpack.ProvidePlugin({
      //   editormd: "editormd",
      //   "windows.editormd": "editormd"
      // }),
    ]
  }
};
