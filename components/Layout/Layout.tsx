import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Footer from "../Footer";
import Navbar from "./Navbar";

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
        <Box p={{ base: "2", md: "0" }}>{props.children}</Box>
      </Box>
      <Footer />
    </Box>
  );
}
