import { Box, Container } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Footer from "../Footer";
import Navbar from "./Navbar";

type LayoutProps = {
  bg?: string;
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  return (
    <Box
      minH={"100vh"}
      display="flex"
      flexDir={"column"}
      justifyContent="space-between"
      bg={props.bg}
      w="full"
      transition="background-color 3s ease"
    >
      <Box>
        <Navbar />
        <Container maxW="100vw" p="0">
          {props.children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
