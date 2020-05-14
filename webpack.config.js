const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: './src/index.tsx',
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
		alias: {
			"@": path.resolve(__dirname, "src/components/common"),
		  },
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		contentBase: path.join(__dirname, 'index.html'),
		port: 9000,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		})
	],
	module: {
		rules: [
			{
				test: /\.(js|ts)x?$/,

				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-url-loader',
						options: {
							limit: 10000,
						},
					},
				],
			},
		]
	}
};
