/* eslint-disable no-undef */

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
const path						= require('path');
const TerserPlugin				= require('terser-webpack-plugin');
const HtmlWebpackPlugin 		= require('html-webpack-plugin');
const CompressionPlugin 		= require('compression-webpack-plugin');
const { CleanWebpackPlugin }	= require('clean-webpack-plugin');
const MiniCssExtractPlugin 		= require('mini-css-extract-plugin');

module.exports = (_, env) => {

	const production = env.mode === 'production';

	return {
		target  : 'web',
		entry   : {
			bundle : path.resolve(`${entry_path}/`, 'App.jsx'),
		},
		output  : {
			path			: path.resolve(__dirname, output_path),
			filename		: '[name].js',
			publicPath      : '/js/'
		},
		devServer: {
			contentBase         : path.join(__dirname, public_path),
			port                : 3000,
			compress            : true,
			watchContentBase    : true,
			writeToDisk         : true,
			historyApiFallback  : true,
			headers: {
				'Access-Control-Allow-Origin' : '*'
			}
		},
		stats : {
			colors          : true,
			modules         : false,
			reasons         : false,
			errorDetails    : true,
			entrypoints     : false
		},
		module  : {
			rules: [
				{
					test    : /\.(js|jsx)$/,
					exclude : /node_modules/,
					use 	: [
						{
							loader : 'babel-loader'
						},
						{
							loader : 'eslint-loader'
						}
					]
				},
				{
					test	: /\.scss$/,
					exclude	: /node_modules/,
					use		: [
						MiniCssExtractPlugin.loader,
						{ 
							loader: 'css-loader',
							options : {
								url : false
							}
						},
						{
							loader : 'sass-loader'
						}
					]
				}
			]
		},
		plugins : [
			new MiniCssExtractPlugin({
				filename 	: '../css/[name].css',
				ignoreOrder	: true
			}),
			new HtmlWebpackPlugin({
				template 	: path.resolve(`${resources_path}/index.html`),
				filename 	: path.resolve(`${public_path}/index.html`),
				inject		: true,
				chunks		: [
					'vendor',
					'bundle'
				]
			}),
			production && new CleanWebpackPlugin(),
			production && new CompressionPlugin({
				algorithm	: 'gzip',
				test		: /\.(jsx|js|css)$/,
			}),
		].filter((plugin) => plugin),
		resolve : {
			extensions : [ 
				'.jsx', 
				'.js',
				'.json'
			],
			modules: [
				'node_modules',
				path.resolve(entry_path)
			],
			alias: {
				['~'] : path.resolve(entry_path)
			}
		},
		optimization : {
			minimizer : [
				new TerserPlugin({	
					terserOptions : {
						output : {
							comments : false
						}
					},
					extractComments : false
				})
			],
			splitChunks : {
				cacheGroups : {
					default : false,
					vendor : {
						test	: /node_modules/,
						name	: 'vendor',
						chunks	: 'async',
						enforce	: true
					},
					styles: {
						name	: 'bundle',
						test	: /\.scss$/,
						chunks	: 'all',
						enforce	: true
					}
				}
			}
		}
	};
};