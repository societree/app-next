import Layout from "@/components/Layout/Layout";
import { Box, Container, Flex, Heading, Img } from "@chakra-ui/react";
import React from "react";
import WorkshopForm from "../../components/Workshop/WorkshopForm";
import enforceAuthenticated from "../../utils/enforceAuthenticated";

export default function New() {
  return (
    <Layout>
      <Container
        maxW={"container.sm"}
        p={{ base: "6", lg: "20" }}
        rounded={"lg"}
        border="1px solid black"
        minH={"75vh"}
      >
        <Heading size={"xl"} fontWeight={"normal"}>
          Create a workshop
        </Heading>
        <WorkshopForm />
      </Container>
    </Layout>
  );
}

export const getServerSideProps = enforceAuthenticated();
