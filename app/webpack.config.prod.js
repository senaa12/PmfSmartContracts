const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebPackPlugin = require("copy-webpack-plugin");


const htmlWebpackPlugin = new HtmlWebPackPlugin({ 
  template: "./src/index.html"
});

const copyWebpackPlugin = new CopyWebPackPlugin([
  './src/common/favicon.ico',
  { from: './dist'}
])

module.exports = {
  entry: [ "babel-polyfill", "./src/index.js"],
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
  plugins: [ htmlWebpackPlugin, copyWebpackPlugin ]
};