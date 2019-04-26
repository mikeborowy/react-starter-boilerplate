const webpack = require('webpack');
const path = require("path");
const autoprefixer = require('autoprefixer');
const precss = require('precss');
//Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	entry: {
		app: './src/index.js'
	},
	target: 'web',
	output: {
		path: path.join(__dirname, "../public/assets"),
		publicPath: "/assets",
		filename: '[name].js'
	},
	devServer: {
		inline: true,
		contentBase: './public',
		port: 3000
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: false,
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
				}
			}
		},
		minimizer: [
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					ecma: 6,
					output: {
						comments: false
					}
				},
			}),
			new OptimizeCssAssetsPlugin({
				assetNameRegExp: /\.optimize\.css$/g,
				cssProcessor: require('cssnano'),
				cssProcessorOptions: {
					discardComments: {
						removeAll: true
					}
				},
				canPrint: true
			})
		],
	},
	plugins: [
		new webpack.DefinePlugin(GLOBALS),//defines vars avaialble to livraries
		new webpack.optimize.OccurrenceOrderPlugin(), //optimizes the order files are bundled
		new ExtractTextPlugin({
			filename: 'styles.css',
			allChunks: true
		})
	],
	node:{
		net: 'empty',
		dns: 'empty'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: path.join(__dirname, '../src'),
				exclude: /(node_modules)/,
				loader: "babel-loader",
				options: {
					presets:[ '@babel/preset-react', "@babel/preset-typescript" ]
				}
			},
			{
				test: /\.json$/,
				exclude: /(node_modules)/,
				loader: "json-loader"
			},
			{
				test: /bootstrap\/js\//,
				loader: 'imports?jQuery=jquery'
			},
			// CSS Definitions
			{
				test: /\.(css|scss)$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader', // translates CSS into CommonJS modules
						},
						{
							loader: 'postcss-loader', // Run post css actions
							options: {
								plugins: () => [precss, autoprefixer] // post css plugins, can be exported to postcss.config.js
							}
						},
						{
							loader: 'sass-loader' // compiles SASS to CSS
						}
					]
				})
			},
			// Font Definitions
			{
				test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
				use: ['file-loader?limit=10000&name=/fonts/[name].[ext]']
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				use: ['file-loader?limit=10000&name=/fonts/[name].[ext]']
			},
			{
				test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/,
				use: ['file-loader?limit=10000&name=/fonts/[name].[ext]']
			},
			//Svg
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: ['file-loader?limit=10000&name=/fonts/[name].[ext]']
			},
			// Images
			{
				test: /\.(jpg|jpeg|gif|png)$/,
				exclude: /(node_modules)/,
				use: ["file-loader?name=/images/[name].[ext]"]
			}
		]
	}
};