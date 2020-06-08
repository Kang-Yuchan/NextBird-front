import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { ComponentProps } from '../interface';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';

const NextBird = ({ Component, pageProps, store }: ComponentProps): React.ReactNode => {
  return (
    <Provider store={store}>
      <Head>
        <title>Next Bird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.3.1/antd.css" />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
};

export default withRedux((initialState, options) => {
  const middlewares: Array<any> = [];
  const enhancer = compose(
    applyMiddleware(...middlewares),
    !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f,
  );
  const store = createStore(reducer, initialState, enhancer);
  return store;
})(NextBird);
