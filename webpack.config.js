import HtmlWebpackPlugin from 'html-webpack-plugin';
import 'webpack';
import { resolve as _resolve } from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin, { loader as _loader } from "mini-css-extract-plugin";
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export const entry = './src/index.ts';
export const mode = 'production';
export const devServer = {
  // contentBase: path.join(__dirname, 'dist'),
  compress: true,
  port: 8080,
};
export const output = {
  path: _resolve(__dirname, 'dist'),
  filename: 'bundle.js',
};
export const module = {
  rules: [
    { test: /\.txt$/, use: 'raw-loader' },
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: _loader,
          options: {},
        },
        "css-loader",
      ],
    },

    {
      test: /\.s[sc]ss$/i,
      use: [
        {
          loader: _loader,
          options: {},
        },
        "css-loader",
        "sass-loader",
      ],
    },
  ],
};
export const plugins = [new HtmlWebpackPlugin({ template: './src/index.html' }),
new MiniCssExtractPlugin({
  filename: "[name].[contenthash].css",
}),];
export const resolve = {
  extensions: [".tsx", ".ts", ".js"]
};