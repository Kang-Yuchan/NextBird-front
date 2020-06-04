import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { ComponentProps } from '../interface';

const NextBird = ({ Component, pageProps }: ComponentProps): React.ReactNode => {
  return (
    <React.Fragment>
      <Head>
        <title>Next Bird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.3.1/antd.css" />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </React.Fragment>
  );
};

export default NextBird;
