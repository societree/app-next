import React from "react";
import Landing from "../components/Landing/Landing";
import Layout from "../components/Layout/Layout";

export default function Home() {
  const [state, setState] = React.useState("#2c45b7");

  const listenScrollEvent = (e: any) => {
    if (window.scrollY > 1500 && window.scrollY < 2900) {
      setState("#503750");
      return;
    }
    if (window.scrollY > 2900) {
      setState("blue.600");
      return;
    }
    setState("#2c45b7");
  };

  React.useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <Layout bg={state}>
      <Landing />
    </Layout>
  );
}
