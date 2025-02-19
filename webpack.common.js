const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
   entry: "./src/index.js",
   output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./src/template.html",
         inject: "body",
         scriptLoading: "module",
      }),
   ],
   module: {
      rules: [
         {
            test: /\.(png|jpe?g|gif|svg)$/i,
            type: 'asset/resource',
            generator: {
               filename: 'assets/[name][ext]',
            },
         },
      ],
   },
};
