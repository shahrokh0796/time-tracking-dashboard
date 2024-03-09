const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");



module.exports = {
    entry: {
        index: "./src/index.js",
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            inject: true,
            scriptLoading: "defer",
            cache: true,
        }),
        new MiniCssExtractPlugin(),
    ],
    stats: {
        children: true
      },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader", "postcss-loader",],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|ttf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    },
    optimization: {
        runtimeChunk: 'single',
      },
};