const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { Generator } = require("webpack");

module.exports = merge(common, {
   mode: "development",
   devtool: "eval-source-map",
   devServer: {
      watchFiles: ["./src/template.html"],
   },
   module: {
      rules: [
         {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
         },
         {
            test: /\.html$/i,
            loader: "html-loader",
         },
         
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: "asset/resource",
         },
      ],
   },
});
