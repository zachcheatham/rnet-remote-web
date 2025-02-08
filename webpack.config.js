const debug = process.env.NODE_ENV !== "production";
const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const minimizer = [];

if (!debug) {
    minimizer.push(
        new TerserPlugin({
            terserOptions: {
                mangle: true
            }
        })
    );
}

module.exports = {
    mode: debug ? "development" : "production",
    context: __dirname + "/src",
    devtool: debug ? "source-map" : false,
    entry: "./js/index",
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    optimization: {
        minimize: (!debug),
        minimizer: minimizer,
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: "/node_modules/"
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader"
            },
            {
                test: /\.scss?$/, use: [
                {loader: "style-loader"},
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            localIdentName: debug ? "[hash:base64:5][path]-[local]" : "[hash:base64:10]"
                        }
                    }
                },
                {
                    loader: "sass-loader",
                    options:
                    {
                        implementation: require("sass")
                    }
                }
            ]},
            {
                test: /\.html?$/,
                exclude: /node_modules/,
                use: {
                    loader: "html-loader",
                    options: {minimize: true}
                }
            },
            {test: /\.(png|woff|woff2|otf|eot|ttf|svg|jpg|webp)$/, type: "asset/resource"},
        ]
    },
    output: {
        publicPath: '/',
        path: __dirname + "/static",
        filename: "[name].js",
        chunkFilename: debug ? "[id].[chunkhash].js" : "[chunkhash].js",
        assetModuleFilename: debug ? "assets/[name]__[hash][ext]" : "assets/[hash][ext]"
    },
    devServer: {
        static: path.join(__dirname, '/static'),
        hot: true,
        historyApiFallback: true,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            // favicon: __dirname + '/src/img/favicon.png',
            production: !debug,
            inject: true,
        })
    ],
};
