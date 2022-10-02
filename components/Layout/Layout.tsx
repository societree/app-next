import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Footer from "../Footer";
import Navbar from "./Navbar";
import ResponsiveContainer from "./ResponsiveContainer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  return (
    <Box
      minH={"100vh"}
      display="flex"
      flexDir={"column"}
      justifyContent="space-between"
    >
      <Box>
        <Navbar />
        <ResponsiveContainer>{props.children}</ResponsiveContainer>
      </Box>
      <Footer />
    </Box>
  );
}
