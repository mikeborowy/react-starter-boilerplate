const webpack = require("webpack");
const path = require("path");
const flexBugs = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer')({
	browsers: [
		'>1%',
		'last 4 versions',
		'Firefox ESR',
		'not ie < 9', // React doesn't support IE8 anyway
	],
	flexbox: 'no-2009',
});

const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	entry: [
		'webpack-hot-middleware/client',
		path.join( __dirname, '../src/index.js')
	],
	target: 'web',
	output: {
		path: '/',
		filename: './bundle.js'
	},
	resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.optimize\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			},
			canPrint: true
		}),
	],
	node:{
		net: 'empty',
		dns: 'empty'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets:['@babel/preset-react']
					}
				}
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				include: path.join(__dirname, 'src'),
				loader: require.resolve('babel-loader'),
				options: {
					// This is a feature of `babel-loader` for webpack (not Babel itself).
					// It enables caching results in ./node_modules/.cache/babel-loader/
					// directory for faster rebuilds.
					cacheDirectory: true,
					plugins: ['react-hot-loader/babel'],
				},
			},
			{
				test: /\.json$/,
				exclude: /(node_modules)/,
				loader: "json-loader"
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: require.resolve('css-loader'),
							options: {
								importLoaders: 1,
							},
						},
						{
							loader: require.resolve('postcss-loader'),
							options: {
								ident: 'postcss',
								plugins: () => [flexBugs,autoprefixer],
						},
					}
				],
			},
			{
				test: /\.scss$/,
				loaders: [
					require.resolve('style-loader'),
					require.resolve('css-loader'),
					require.resolve('sass-loader'),
				]
			},
			{
				test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file-loader?limit=10000&mimetype=application/font-woff"
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file-loader?limit=10000&mimetype=application/octet-stream"
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file-loader"
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file-loader?limit=10000&mimetype=image/svg+xml"
			},
			//Images
			{
				test: /\.(jpg|jpeg|gif|png)$/,
				exclude: /(node_modules)/,
				loader: "file-loader?name=../images/[name].[ext]"
			}
		]
	}
};