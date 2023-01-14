import React from "react";
import Landing from "../components/Landing/Landing";
import Layout from "../components/Layout/Layout";

export default function Home() {
  const [bg, setBg] = React.useState("#2c45b7");

  const listenScrollEvent = (e: any) => {
    if (window.scrollY > 1500 && window.scrollY < 2900) {
      setBg("#503750");
      return;
    }
    if (window.scrollY > 2900) {
      setBg("blue.600");
      return;
    }
    setBg("#2c45b7");
  };

  React.useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <Layout bg={bg}>
      <Landing />
    </Layout>
  );
}
