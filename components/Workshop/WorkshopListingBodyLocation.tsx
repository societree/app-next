import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { BsCameraVideo, BsPinMap } from "react-icons/bs";
import { Workshop } from "../../shared/schemas";
import { workshopToReadableAddress } from "../../utils/addresses";

interface IProps {
  workshop: Workshop;
}

export default function WorkshopListingBodyLocation({ workshop }: IProps) {
  return (
    <Box py="6" px={{ base: "2", md: "10" }}>
      <Box maxW={"300px"} px="5" py="5" rounded="xl" border="1px solid black">
        <Flex alignItems={"center"}>
          <Box mr="5" fontSize={"25px"}>
            {workshop.virtual ? <BsCameraVideo /> : <BsPinMap />}
          </Box>
          <Box>
            <Text display={"flex"} alignItems="center">
              {workshop.virtual
                ? "Online event"
                : workshopToReadableAddress(workshop)}
            </Text>
            <Text>
              {workshop.virtual ? "Link visible for attendees" : workshop.city}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
