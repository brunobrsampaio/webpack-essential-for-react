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
const ip = require('ip');

require('dotenv').config();

module.exports = (_, { mode }) => {

    const APP_ENV = process.env.APP_ENV || 'development';

    const isProduction = APP_ENV === 'production';
    const isLocal = APP_ENV === 'local';

    const port = 8080;

    /**
     * Origem de onde os scripts virão
     */
    const ipLocal = `//${ip.address()}`;

    /**
     * Pasta raiz aonde se encontram todos os recursos para desenvolvimento
     */
    const resourcesPath = './resources';

    /**
     * Pasta publica aonde todos os arquivos compilados serão colocados após o procesos de build
     */
    const publicPath	= './public';

    /**
     * Pasta aonde esta localizado o arquivo de entrada
     */
    const entryPath = `${resourcesPath}/js`;

    /**
     * Pasta de saida dos arquivos após a compilação
     */
    const outputPath = `${publicPath}/assets/js`;

    return {
        mode,
        target : 'web',
        entry : {
            bundle : resolve(`${entryPath}/`, 'App.jsx'),
        },
        output : {
            path : resolve(__dirname, outputPath),
            filename : `[name]${!isLocal ? '.[chunkhash:8]' : ''}.js`,
            chunkFilename : `[name]${!isLocal ? '.[chunkhash:8]' : ''}.js`,
            publicPath : `${isLocal ? `${ipLocal}:${port}` : ''}/`,
        },
        devServer : {
            devMiddleware : {
                writeToDisk : true,
                publicPath : '/',
            },
            headers : {
                'Access-Control-Allow-Origin' : '*',
            },
            port,
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
                template : resolve(`${resourcesPath}/index.html`),
                filename : resolve(`${publicPath}/index.html`),
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
                    resolve(outputPath, '..', 'js'),
                ],
            }),
            isProduction && new CompressionPlugin({
                algorithm : 'gzip',
                test : /\.(js|css|svg|png|jpe?|gif|woff|woff2|eot|ttf)$/,
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
                resolve(entryPath),
            ],
            alias : {
                ['~'] : resolve(entryPath),
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