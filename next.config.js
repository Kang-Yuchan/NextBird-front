const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withTypescript = require('@zeit/next-typescript');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = withTypescript(
	withBundleAnalyzer({
		distDir: '.next',
		typescript: {
			ignoreBuildErrors: true
		},
		analyzeServer: [ 'server', 'both' ].includes(process.env.BUNDLE_ANALYZE),
		analyzeBrowser: [ 'browser', 'both' ].includes(process.env.BUNDLE_ANALYZE),
		bundleAnalyzerConfig: {
			server: {
				analyzerMode: 'static',
				reportFilename: '../../bundles/server.html'
			},
			browser: {
				analyzerMode: 'static',
				reportFilename: '../bundles/client.html'
			}
		},
		webpack(config) {
			const prod = process.env.NODE_ENV === 'production';
			const plugins = [ ...config.plugins ];
			if (prod) {
				plugins.push(new CompressionPlugin());
			}
			return {
				...config,
				mode: prod ? 'production' : 'development',
				devtool: prod ? 'hidden-source-map' : 'eval',
				plugins
			};
		}
	})
);
