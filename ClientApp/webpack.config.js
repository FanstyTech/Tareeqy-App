const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


var config = {
    entry: {
        app: ['./src/App.tsx'],
        vendor: ['react', 'react-dom']
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '/'
    },
    cache: true,
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
            {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ],
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
        port: 8051,
    },
    optimization: {
        //minimize: true,
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            inject: true
        }),
        new MiniCssExtractPlugin(),
        new Dotenv({
            path: './.env'
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),
        new CompressionPlugin()
    ]
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = false;
    }

    if (argv.mode === 'production') {
        //...
        config.optimization = {
            ...config.optimization,
            minimizer: [...config.optimization.minimizer, new UglifyJsPlugin()],
        }
        config.plugins = [...config.plugins,
            new webpack.optimize.AggressiveMergingPlugin(),]
    }

    return config;
};