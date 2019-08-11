const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({ template: "./src/index.html" });

const definePlugin = new webpack.DefinePlugin({ 
  'process.env': {  NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
});


module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  devServer: {
    inline: true, 
    port: 1212
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }, 
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: ["url-loader"]
      },
      {
          test: /\.svg$/,
          loader: "svg-sprite-loader",
          include: [path.resolve("./src/common")]
      }
    ]
  },
  plugins: [ htmlWebpackPlugin, definePlugin ]
};