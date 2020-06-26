import * as React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { ComponentProps } from '../interface';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { createStore, compose, applyMiddleware, StoreEnhancer } from 'redux';
import reducer from '../reducers';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import rootSaga from '../sagas';
import { LOAD_USER_REQUEST } from '../reducers/user';
import Axios from 'axios';

const NextBird = ({ Component, pageProps, store }: ComponentProps): React.ReactElement => {
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
	const { ctx, Component } = context;
	let pageProps = {};
	const state = ctx.store.getState();
	const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
	if (ctx.isServer && cookie) {
		Axios.defaults.headers.Cookie = cookie;
	}
	if (!state.user.me) {
		ctx.store.dispatch({
			type: LOAD_USER_REQUEST
		});
	}
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
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
	store.sagaTask = sagaMiddleware.run(rootSaga);
	return store;
};

export default withRedux(configureStore)(withReduxSaga(NextBird));
