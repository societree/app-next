import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { BsCameraVideo, BsPinMap } from "react-icons/bs";
import { Workshop } from "../../shared/schemas";
import { workshopToReadableAddress } from "../../utils/addresses";

interface IProps {
  workshop: Workshop;
}

export default function WorkshopListingBodyLocation({ workshop }: IProps) {
  return (
    <Box color="gray.700" bg="gray.50" py="6" px={{ base: "2", md: "10" }}>
      <Box
        bg="white"
        maxW={"300px"}
        p="4"
        rounded="md"
        borderWidth={"1px"}
        borderColor="gray.100"
      >
        <Flex alignItems={"center"}>
          <Box mr="4" color="gray.500" fontSize={"25px"}>
            {workshop.virtual ? <BsCameraVideo /> : <BsPinMap />}
          </Box>
          <Box>
            <Text
              display={"flex"}
              color={"black"}
              alignItems="center"
              fontSize={"14px"}
            >
              {workshop.virtual ? "Online event" : workshopToReadableAddress(workshop)}
            </Text>
            <Text fontSize={"14px"} color={"gray.600"}>
              {workshop.virtual ? "Link visible for attendees" : workshop.city}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}