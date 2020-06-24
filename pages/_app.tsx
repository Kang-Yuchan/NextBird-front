import * as React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { ComponentProps } from '../interface';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware, StoreEnhancer } from 'redux';
import reducer from '../reducers';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import rootSaga from '../sagas';

const NextBird = ({ Component, pageProps, store }: ComponentProps): React.ReactNode => {
	return (
		<Provider store={store}>
			<Head>
				<title>Next Bird</title>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.3.1/antd.css" />
				<link
					rel="stylesheet"
					type="text/css"
					charset="UTF-8"
					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
				/>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
				/>
			</Head>
			<AppLayout>
				<Component {...pageProps} />
			</AppLayout>
		</Provider>
	);
};

NextBird.getInitialProps = async (context) => {
	const { ctx } = context;
	let pageProps = {};
	if (context.Component.getInitialProps) {
		pageProps = await context.Component.getInitialProps(ctx);
	}
	return { pageProps };
};

const configureStore = (initialState, options) => {
	const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
	const middlewares: Array<any> = [ sagaMiddleware ];
	const enhancer: StoreEnhancer =
		process.env.NODE_ENV === 'production'
			? compose(applyMiddleware(...middlewares))
			: compose(
					applyMiddleware(...middlewares),
					!options.isServer && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined'
						? window.__REDUX_DEVTOOLS_EXTENSION__()
						: (f) => f
				);
	const store = createStore(reducer, initialState, enhancer);
	sagaMiddleware.run(rootSaga);
	return store;
};

export default withRedux(configureStore)(NextBird);
