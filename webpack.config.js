const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: './src/index.tsx',
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
		alias: {
			"@": path.resolve(__dirname, "src/components"),
			"@services": path.resolve(__dirname, "src/services"),
			"@models": path.resolve(__dirname, "src/models"),
			"@modules": path.resolve(__dirname, "src/modules"),
		  },
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
	devServer: {
		historyApiFallback: true,
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
