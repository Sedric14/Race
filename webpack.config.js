import HtmlWebpackPlugin from "html-webpack-plugin";
import "webpack";
import { resolve as _resolve } from "path";

export const entry = "./src/index.ts";
export const mode = "development";
export const devServer = {
  compress: true,
  port: 8080,
};
export const output = {
  path: _resolve(__dirname, "dist"),
  filename: "bundle.js",
};
export const module = {
  rules: [
    { test: /\.txt$/, use: "raw-loader" },
    {
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    },
    {
      test: /\.css$/i,
      use: [
        {
          loader: "style-loader",
          options: { injectType: "singletonStyleTag" },
        },
        "css-loader",
      ],
    },
  ],
};
export const plugins = [
  new HtmlWebpackPlugin({ template: "./src/index.html" }),
];
export const resolve = {
  extensions: [".tsx", ".ts", ".js"],
};
