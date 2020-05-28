const path = require('path');
const webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getPlugins () {
    return [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject  : true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new VueLoaderPlugin()
    ];
}

module.exports = (mode, argv) => {
    const config = {
        entry: {
            main: [__dirname + '/src/js/app.js']
        },
        output: {
            filename: 'js/[name].js',
            path    : path.resolve(__dirname, '/public')
        },
        devServer: {
            contentBase : path.join(__dirname, 'public'),
            hot         : true,
            watchOptions: {
                poll: true
            }
        },
        module: {
            rules: [
                {
                    test   : /\.vue$/,
                    exclude: /node_modules/,
                    use    : 'vue-loader'
                },
                {
                    test   : /\.js$/,
                    exclude: /node_modules/,
                    use    : {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/i,
                    use : ['style-loader', 'css-loader'],
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.vue'],
            alias     : {
                'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
            }
        },
        plugins: getPlugins(argv.mode)
    };

    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    return config;
};