const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const webpack = require('webpack');
// const webpack = require('webpack')
const mode = '';

const config = {
    // this is a preprocessor that maps bundled code into its initial sourced code and other minified files
    devtool: 'source-map',

    mode: 'development',
    // to accept HMR middlewares entry points will be tweaked to be an array or object
    entry: {
        app: ['./src/index.js',],
        vendor: ['react', 'react-dom', 'whatwg-fetch', 'react-router-dom', 'react-bootstrap'],
    },
    // the output filename will be hashed
    output: {
        // path: path.resolve(`${__dirname}/static`),
        path: path.join(__dirname, 'static'),
        // publicPath: '/static/',
        filename: mode === 'production' ? '[name].[chunkhash].js' : '[name].[hash].js',
    },
    // bundle splitting and  splitting vendor node_modules packages into individual packages 
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            // state and define rules that webpack will use while splitting our vendor packages
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },
    resolve: {
        modules: [path.resolve(__dirname, './src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            reducers: path.resolve(__dirname, './src/reducers')
        }
    },


    // this plugin is for HMR middlewaress
    module: {
        rules: [{
            test: /\.(js|jsx)?$/,
            use: { loader: 'babel-loader' },
            exclude: /node_modules/
        },
        {
            // Apply rule for .sass, .scss or .css files
            test: /\.(sa|sc|c)ss$/,

            // Set loaders to transform files.
            // Loaders are applying from right to left(!)
            // The first loader will be applied after others
            use: [
                {
                    // After all CSS loaders we use plugin to do his work.
                    // It gets all transformed CSS and extracts it into separate
                    // single bundled file
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    // This loader resolves url() and @imports inside CSS
                    loader: "css-loader",
                },
                {
                    // Then we apply postCSS fixes like autoprefixer and minifying
                    loader: "postcss-loader"
                },
                {
                    // First we transform SASS to standard CSS
                    loader: "sass-loader",
                    options: {
                        implementation: require("sass")
                    }
                }
            ]
        },
        {
            // Now we apply rule for images
            test: /\.(png|jpe?g|gif|svg|ico)$/,
            use: [
                {
                    // Using file-loader for these files
                    loader: "file-loader",
                    options: {
                        name: "[path][name]-[hash:8].[ext]"
                    }
                }
            ]
        },
        {
            // Apply rule for fonts files
            test: /\.(woff|woff2|ttf|otf|eot)$/,
            use: [
                {
                    // Using file-loader too
                    loader: "file-loader",
                    options: {
                        name: "[path][name]-[hash:8].[ext]"
                    }
                }
            ]
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './static/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new webpack.HashedModuleIdsPlugin(),// so that file hashes don't change unexpectedly
    ],
    // this one handle the webpark-dev-server port to apis
    devServer: {
        port: 8080,
        contentBase: 'static',
        historyApiFallback: true,
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000',
            },
        },
    },


};
module.exports = config;