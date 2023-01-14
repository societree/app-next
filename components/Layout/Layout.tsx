import { Box, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import Footer from "../Footer";
import Navbar from "./Navbar";
import ResponsiveContainer from "./ResponsiveContainer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  const router = useRouter();

  const bg = {
    "/": "#2c45b7",
    "/workshops": "gray.50",
    "/workshops/[wid]": "gray.50",
    "/dashboard": "gray.50",
  };

  return (
    <Box
      minH={"100vh"}
      display="flex"
      flexDir={"column"}
      justifyContent="space-between"
      bg={(bg as any)[router.route]}
      {...props}
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
