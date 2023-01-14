import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Workshop } from "../../shared/schemas";

import { BsArrowRightCircleFill } from "react-icons/bs";

export default function WorkshopCard({ workshop }: { workshop: Workshop }) {
  const router = useRouter();

  return (
    <Card
      boxShadow={"none"}
      onClick={() => router.push(`/workshops/${workshop.id}`)}
      cursor="pointer"
      border="1px solid lightgray"
      _hover={{
        border: "1px solid black",
        transform: "translate(10px, 0px)",
        transition: "transform .3s ease-out",
        boxShadow: "lg",
      }}
      rounded={"2xl"}
      bg="white"
      py="4"
      px="4"
    >
      <CardBody>
        <Heading size={"md"} pb="4" letterSpacing={"wide"}>
          {workshop.name}
        </Heading>
        <Text w="85%">{workshop.description}</Text>

        <Flex justifyContent="start" alignItems="center" pt="5">
          <Flex
            fontSize={"xs"}
            px="2"
            py="1"
            border={"1px solid black"}
            w="fit-content"
            rounded={"full"}
            mr="1"
            bg="black"
            color="white"
          >
            Virtual
          </Flex>

          <Flex
            fontSize={"xs"}
            px="2"
            py="1"
            mr="1"
            border={"1px solid black"}
            w="fit-content"
            rounded={"full"}
          >
            Bristol
          </Flex>

          <Flex
            fontSize={"xs"}
            px="2"
            py="1"
            border={"1px solid black"}
            w="fit-content"
            rounded={"full"}
          >
            3 spaces
          </Flex>
        </Flex>

        <Box pos={"absolute"} top="10" right={"10"} fontSize="30px">
          <BsArrowRightCircleFill />
        </Box>
      </CardBody>
    </Card>
  );
}
