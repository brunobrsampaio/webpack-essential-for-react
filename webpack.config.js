/**
 * Pasta raiz aonde se encontram todos os recursos para desenvolvimento
 */
const resources_path = './resources';

/**
 * Pasta publica aonde todos os arquivos compilados serão colocados após o procesos de build
 */
const public_path	= './public';

/**
 * Pasta aonde esta localizado o arquivo de entrada
 */
const entry_path = `${resources_path}/js`;

/**
 * Pasta de saida dos arquivos após a compilação
 */
const output_path = `${public_path}/assets/js`;

/**
 * Libs
 */
const { resolve } = require('path');
const { EnvironmentPlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (_, { mode, env }) => {

    const APP_ENV = env ? env.APP_ENV : 'development';

    const isProduction = APP_ENV === 'production';
    const isLocal = APP_ENV === 'local';

    return {
        mode : mode ? mode : 'development',
        target : 'web',
        entry : {
            bundle : resolve(`${entry_path}/`, 'App.jsx'),
        },
        output : {
            path : resolve(__dirname, output_path),
            filename : `[name]${!isLocal ? '.[chunkhash:8]' : ''}.js`,
            chunkFilename : `[name]${!isLocal ? '.[chunkhash:8]' : ''}.js`,
            publicPath : '/assets/js/',
        },
        devServer : {
            devMiddleware : {
                writeToDisk : true,
                publicPath : '/',
            },
            headers : {
                'Access-Control-Allow-Origin' : '*',
            },
            port : 3000,
            hot : false,
            compress : true,
            historyApiFallback : true,
        },
        module : {
            rules : [
                {
                    test : /\.(js|jsx)$/,
                    exclude : /node_modules/,
                    use : [
                        {
                            loader : 'babel-loader',
                        },
                    ],
                },
            ],
        },
        plugins : [
            new ESLintPlugin({
                extensions : [
                    '.jsx',
                    '.js',
                    '.json',
                ],
            }),
            new HtmlWebpackPlugin({
                template : resolve(`${resources_path}/index.html`),
                filename : resolve(`${public_path}/index.html`),
                inject : true,
                templateParameters : {
                    APP_ENV,
                },
            }),
            new EnvironmentPlugin({
                APP_ENV,
            }),
            !isLocal && new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns : [
                    resolve(output_path, '..', 'js'),
                ],
            }),
            isProduction && new CompressionPlugin({
                algorithm : 'gzip',
                test : /\.(js)$/,
            }),
        ].filter((plugin) => plugin),
        resolve : {
            extensions : [
                '.jsx',
                '.js',
                '.json',
            ],
            modules : [
                'node_modules',
                resolve(entry_path),
            ],
            alias : {
                ['~'] : resolve(entry_path),
            },
        },
        optimization : {
            minimize : isProduction,
            minimizer : [
                new TerserPlugin({
                    terserOptions : {
                        output : {
                            comments : false,
                        },
                    },
                    extractComments : false,
                }),
            ],
            splitChunks : {
                cacheGroups : {
                    default : false,
                    bundle : {
                        test : /node_modules/,
                        name : 'bundle',
                        chunks : 'async',
                    },
                },
            },
        },
    };

};