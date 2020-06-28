const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withTypescript = require('@zeit/next-typescript');

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
		webPack(config) {
			console.log('config', config);
			const prod = process.env.NODE_ENV === 'production';
			return {
				...config,
				mode: prod ? 'production' : 'development',
				devtool: prod ? 'hidden-source-map' : 'eval'
			};
		}
	})
);
