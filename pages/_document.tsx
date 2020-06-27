import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';

type Props = {
	styleTags: any;
};

export default class MyDocument extends Document<Props> {
  static async getInitialProps(context) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    try {
      context.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });
      const initialProps = await Document.getInitialProps(context);
      return {
        ...initialProps,
        helmet: Helmet.renderStatic(),
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  

	render() {
		const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
		const htmlAttrs = htmlAttributes.toComponent();
		const bodyAttrs = bodyAttributes.toComponent();

		return (
			<Html {...htmlAttrs}>
				<Head>
					<meta charSet="utf-8" />
					{this.props.styleTags}
					{Object.values(helmet).map((el) => el.toComponent())}
				</Head>
				<body {...bodyAttrs}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
