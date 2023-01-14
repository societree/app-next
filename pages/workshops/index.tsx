import Layout from "@/components/Layout/Layout";
import React from "react";
import WorkshopList from "../../components/Workshop/WorkshopList";

export default function Workshops() {
  const [state, setState] = React.useState("gray.50");

  const listenScrollEvent = (e: any) => {
    if (window.scrollY > 1000) {
      setState("blue.50");
    } else {
      setState("gray.50");
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  }, []);
  return (
    <Layout bg={state}>
      <WorkshopList />
    </Layout>
  );
}
