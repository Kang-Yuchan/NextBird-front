import React from "react";
import Link from "next/link";
import Head from "next/head";
import AppLayout from "../components/AppLayout";

const Home = () => {
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
        <div>Hello, Next.js!</div>
      </AppLayout>
    </>
  );
};

export default Home;
