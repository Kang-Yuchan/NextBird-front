import * as React from 'react';
import { Helmet } from 'react-helmet';
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
			<Helmet
				title="Next Bird"
				htmlAttributes={{ lang: 'en' }}
				meta={[
					{
						charSet: 'UTF-8'
					},
					{
						name: 'viewport',
						content:
							'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover'
					},
					{
						'http-equiv': 'X-UA-Compatible',
						content: 'IE-edge'
					},
					{
						name: 'description',
						content: "Kang Yuchan's Next Bird SNS"
					},
					{
						name: 'og:title',
						content: 'Next Bird'
					},
					{
						name: 'og:description',
						content: "Kang Yuchan's Next Bird SNS"
					},
					{
						property: 'og:type',
						content: 'website'
					},
					{
						property: 'og:image',
						content: 'http://nextbird.site/birdlogo.png'
					}
				]}
				link={[
					{
						rel: 'stylesheet',
						href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/4.3.1/antd.css'
					},
					{
						rel: 'stylesheet',
						type: 'text/css',
						charSet: 'UTF-8',
						href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
					},
					{
						rel: 'stylesheet',
						type: 'text/css',
						href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
					}
				]}
			/>
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
