const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.ts',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@src': path.resolve(__dirname, 'src')
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Wolfenstein 3d"
		})
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		port: 9000,
	},
	output: {
		clean: true,
		filename: 'index.js',
		path: path.resolve(__dirname, 'build'),
	},
};
