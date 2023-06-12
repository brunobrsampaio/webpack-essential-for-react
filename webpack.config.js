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

module.exports = () => {

  const APP_ENV = process.env.APP_ENV || 'development';
  const port = process.env.PORT;

  const isProduction = APP_ENV === 'production';
  const isLocal = APP_ENV === 'local';

  /**
   * Origem de onde os scripts virão
   */
  const localhost = `//${ip.address()}`;

  /**
   * Pasta raiz aonde se encontram todos os recursos para desenvolvimento
   */
  const resourcesPath = './resources';

  /**
   * Pasta publica aonde todos os arquivos compilados serão colocados após o procesos de build
   */
  const distPath	= './public';

  /**
   * Pasta aonde esta localizado o arquivo de entrada
   */
  const entryPath = `${resourcesPath}/js`;

  return {
    target : 'web',
    devtool : isProduction ? 'eval' : 'source-map',
    entry : {
      bundle : resolve(`${entryPath}/`, 'App.jsx'),
    },
    output : {
      path : resolve(__dirname, distPath),
      filename : `[name]${!isLocal ? '.[chunkhash:8]' : ''}.js`,
      chunkFilename : `[name]${!isLocal ? '.[chunkhash:8]' : ''}.js`,
      publicPath : `${isLocal ? `${localhost}:${port}` : ''}/`,
    },
    devServer : {
      devMiddleware : {
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
        filename : resolve(`${distPath}/index.html`),
        inject : 'body',
        templateParameters : {
          APP_ENV,
        },
      }),
      new EnvironmentPlugin({
        APP_ENV,
      }),
      !isLocal && new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns : [
          resolve(distPath),
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