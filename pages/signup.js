import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";

const Signup = () => {
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
        <div>Sign Up</div>
      </AppLayout>
    </>
  );
};

export default Signup;
