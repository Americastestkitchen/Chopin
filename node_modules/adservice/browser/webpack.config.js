const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/form.js",
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: "eval-source-map",
  output: {
    publicPath: "auto",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Piano Test",
      template: __dirname + "/src/index.html",
      inject: "head",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, "src")],
        use: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  performance: {
    hints: false,
  },
};
