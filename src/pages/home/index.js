/* eslint-disable */
import React, { useEffect } from "react";
import Banner from "./components/banner";
import Discovery from "./components/discovery";
import AboutUs from "./components/aboutUs";
import Inform from "./components/inform";

import "./index.scss";

function Home({ isSignIn }) {
  useEffect(() => {
    document.title = "eWorkbook - Home"
  }, [])
  return (
    <div>
      <Banner isSignIn={isSignIn} />
      <Discovery />
      <AboutUs />
      <Inform />
    </ div>
  );
}

export default Home;
