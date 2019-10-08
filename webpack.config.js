const debug = process.env.NODE_ENV !== "production";
const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
    new HtmlWebpackPlugin({
        template: __dirname + '/src/index.html',
        production: !debug,
        inject: true,
    }),
]

if (!debug) {
    plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({minimize: true, mangle: false, sourcemap: false})
    )

    /*jsEntry.unshift(
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server'
    );*/
}

module.exports = {
    context: __dirname + "/src",
    devtool: debug ? "inline-sourcemap" : false,
    entry: {
        js: ["./index"]
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                query: {
                    presets: ["@babel/react", "@babel/env"],
                    plugins: [
                        "react-html-attrs",
                        "transform-class-properties"
                    ]
                }
            },
            {test: /\.(png|woff|woff2|eot|ttf|svg|jpg|webp)$/, loader: "file-loader"},
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.scss$/, use: [
                {loader: "style-loader"},
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[hash:base64:5][path]-[local]'
                        }
                    }
                },
                {loader: "sass-loader"}
            ]}
        ]
    },
    output: {
        path: __dirname + "/static",
        filename: "bundle.js",
        publicPath: "/"
    },
    plugins: plugins,
    devServer: {
        historyApiFallback: {
            disableDotRule: true
        }
    }
};
