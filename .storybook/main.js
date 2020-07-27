const path = require('path');

module.exports = {
	stories: ['../src/**/*.stories.tsx'],
	addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-knobs/register',],
	webpackFinal: async config => {
		// remove svg from existing rule
		const rules = config.module.rules.map(rule => {
			if (
				String(rule.test) === String(/\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/)
			) {
				return {
					...rule,
					test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
				}
			}

			return rule
		});

		rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				{
					loader: require.resolve('ts-loader'),
				},
			],
		});

		// use svgr for svg files
		rules.push({
			test: /\.svg$/,
			use: [require.resolve("@svgr/webpack"), require.resolve("url-loader")],
		})

		config.module.rules = rules;

		config.resolve.extensions.push('.ts', '.tsx', '.svg');
		config.resolve.alias = {
			...config.resolve.alias,
			"@": path.resolve(__dirname, "../src/components"),
			"@services": path.resolve(__dirname, "../src/services"),
			"@models": path.resolve(__dirname, "../src/models"),
			"@modules": path.resolve(__dirname, "../src/modules"),
		  };
		return config;
	},
};
