const path = require('path');

module.exports = {
	mode: process.env.NODE_ENV,
	entry: {
		src: './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'main.js',
	},
	devServer: {
		static: {
			publicPath: '/',
			directory: path.resolve(__dirname, 'dist'),
		},
		port: 8080,
		proxy: {
			'/post': 'http://localhost:3000/',
			'/wasted': 'http://localhost:3000/',
			'/fridge': 'http://localhost:3000/',
			'/tasted': 'http://localhost:3000/',
			'/api': 'http://localhost:3000/',
			'/user': 'http://localhost:3000/',
		},
	},

	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.(sass|scss|css)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
};
