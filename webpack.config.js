/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");

module.exports = {
  entry: { index: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: "svg-sprite-loader"
      },
      // {
      //   test: /\.svg$/i,

      //   // from all svg images
      //   // include only sprite image
      //   include: /.*_sprite\.svg/,

      //   use: [
      //     {
      //       loader: "svg-sprite-loader",
      //       options: {
      //         publicPath: ""
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.svg$/,
      //   loader: "svg-inline-loader"
      // },
      { test: /\.txt$/, use: "raw-loader" },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          "css-loader"
        ]
      },
      {
        test: /\.s[sc]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new SpriteLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({ template: "./src/index.html" }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new ESLintPlugin({ extensions: "ts" }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "static"),
          noErrorOnMissing: true
        }
      ]
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devServer: {
    compress: true,
    port: 8080
  }
};
