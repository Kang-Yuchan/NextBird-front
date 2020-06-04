import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";

const NextBird = ({ Component }) => {
  return (
    <>
      <Head>
        <title>Next Bird</title>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/antd/4.3.1/antd.css'
        />
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </>
  );
};

export default NextBird;
