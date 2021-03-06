const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/index.tsx'],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/typescript', '@babel/preset-env']
                    }
                }
            },
            {
                test: /.tsx$/,
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/typescript', '@babel/preset-react', '@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'url-loader',
                options: {
                    name: (resourcePath, resourceQuery) => {
                        if (/assets\/img\/favimg/.test(resourcePath)) {
                            return '[name].[ext]';
                        }

                        return 'asssts/img/[name].[hash].[ext]';
                    },
                    limit: 1024,
                    esModule: false
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'assets/media/[name].[hash].[ext]',
                    limit: 8192,
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'assets/fonts/[name].[hash].[ext]',
                    limit: 8192,
                }
            }
        ]
    },
    devServer: {
        inline: true,
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${__dirname}/public/index.html`,
            filename: 'index.html',
            inject: 'body',
            favicon: `${__dirname}/public/favicon.ico`,
        })
    ]
};