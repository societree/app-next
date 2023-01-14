import Layout from "@/components/Layout/Layout";
import React from "react";
import WorkshopList from "../../components/Workshop/WorkshopList";

export default function Workshops() {
  const [bg, setBg] = React.useState("gray.50");

  const listenScrollEvent = (e: any) => {
    if (window.scrollY > 1000) {
      setBg("pink.50");
    } else {
      setBg("gray.50");
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  }, []);
  return (
    <Layout bg={bg}>
      <WorkshopList />
    </Layout>
  );
}
