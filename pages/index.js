import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Link href='/about'>
        <a>About</a>
      </Link>
      <div> Hello! Next.js! </div>
    </>
  );
};

export default Home;
