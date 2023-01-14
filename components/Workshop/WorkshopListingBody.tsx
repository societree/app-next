import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Workshop } from "../../shared/schemas";
import WorkshopListingBodyLocation from "./WorkshopListingBodyLocation";

interface IProps {
  workshop: Workshop;
}

export default function WorkshopListingBody({ workshop }: IProps) {
  return (
    <Flex
      bg="white"
      rounded={"xl"}
      py={{ md: "4" }}
      px={{ base: "8", md: "0" }}
      border="1px solid black"
      minHeight="50vh"
      flexDir={"column"}
      justifyContent="space-between"
    >
      <Box px={{ base: "2", md: "10" }} pt="6">
        <Heading size={"lg"} mb="6">
          Description
        </Heading>
        <Text maxW="60%">{workshop.description}</Text>
      </Box>

      <WorkshopListingBodyLocation workshop={workshop} />
    </Flex>
  );
}
