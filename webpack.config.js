const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: './src/index.ts',
	resolve: {
		extensions: [".js", ".ts"]
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		contentBase: path.join(__dirname, 'index.html'),
		port: 9000,
	},
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
	module: {
		rules: [
			{
				test: /\.(js|ts)x?$/,

				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-typescript']
					}
				}
			}
		]
	}
};
