import { Box, Img, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Workshop } from "../../shared/schemas";

export default function WorkshopCard({ workshop }: { workshop: Workshop }) {
  const router = useRouter();

  return (
    <Box
      cursor={"pointer"}
      borderBottom="1px"
      borderBottomColor={"gray.300"}
      bg="white"
      onClick={() => router.push(`/workshops/${workshop.id}`)}
      py={{ base: "2", md: "4" }}
      _hover={{
        background: "gray.50",
      }}
    >
      <Box display="flex" pr="4">
        <Img
          src="https://thumbs.dreamstime.com/b/software-development-programming-coding-learning-information-technology-courses-courses-all-levels-computing-hi-tech-158671629.jpg"
          rounded={"lg"}
          mx="4"
          height={{ base: "40px", md: "90px" }}
        />
        <Box
          display={"flex"}
          flexDir="column"
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Box>
            <Text
              fontSize={"14px"}
              fontWeight="bold"
              bgGradient="linear(to-r, teal.500, green.500)"
              bgClip="text"
            >
              {workshop.category}
            </Text>
            <Text
              fontSize={"16px"}
              fontWeight="semibold"
              noOfLines={1}
              color="gray.600"
            >
              {workshop.name}
            </Text>
            <Text color={"gray.600"} fontSize={"14px"} noOfLines={2}>
              {workshop.description}
            </Text>
          </Box>
          {/* <Box
            justifyContent="space-between"
            pr={10}
            color={"gray.500"}
            display={{ base: "none", md: "flex" }}
            pt="2"
          >
            <Text fontSize={"14px"} fontWeight="medium">
              4 spaces available
            </Text>
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
}
