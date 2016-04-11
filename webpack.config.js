'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const process = require('process');

const config = {
	entry: {
		app: [
			'imports?exports=>false&module=>false!webcom',
			'babel-polyfill',
			'script!html2canvas',
			'react',
			'./src/assets/images/test.jpg',
			'react-dom',
			'./src/index'
		]
	}, 
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'feedy.js',
		publicPath: process.env.PUBLIC_PATH || '/',
		libraryTarget: 'umd',
		library: 'feedy'
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.js', '.css'],
		root: __dirname,
		modulesDirectories: ['node_modules', 'src'],
		alias: {
			jquery: 'jquery/dist/jquery.min.js',
			webcom: 'webcom/webcom.js'
		}
	},
	module: {
		loaders: [
			{ test: /\.js/, loaders: ['babel'], exclude: /node_modules/ },
			{ test: /\.jpg$/, loader: 'file?name=[name].[ext]'},
			{ test: /\.less/, loaders: [ 'style', 'css?sourceMap', 'less?sourceMap' ]}
		],
		noParse: [
			/react\.min\.js$/,
			/jquery\.min\.js$/,
			/bootstrap\.min\.js$/
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: 'head'
		}),
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		}),
		new webpack.DefinePlugin({
			__DEVTOOLS__: process.env.NODE_ENV !== 'production'
		})
	],				
	progress: true,
	target: 'web'
};

if (process.env.NODE_ENV !== 'production') {
	config.entry.app = [
		'./hotReload',
		'webpack/hot/dev-server'
	].concat(config.entry.app);

	config.module.loaders = config.module.loaders.concat([
		{ test: /\.css/, loaders: [
			'style',
			'css?sourceMap&modules'
		]}
	]);
	config.devtool = 'source-map';
	config.debug = true;
} else {
	config.module.loaders = config.module.loaders.concat([
		{ test: /\.css/, loaders:[
			'style',
			'css-loader?minimize&modules'
		]}
	]);
	config.debug = false;
}

module.exports = config;
