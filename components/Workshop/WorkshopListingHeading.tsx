import { Box, Text, Link, Flex, Avatar } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { data } from "../../shared/data/supabase";
import { Workshop } from "../../shared/schemas";

interface IProps {
  workshop: Workshop;
}

export default function WorkshopListingHeading({ workshop }: IProps) {
  const ownerProfileQuery = useQuery(["profile"], () =>
    data.getProfile(workshop.user_id)
  );

  return (
    <Box
      borderBottomWidth={"1px"}
      borderBottomColor="gray.200"
      pb="6"
      px={{ base: "2", md: "10" }}
    >
      {" "}
      <Flex alignItems={"center"}>
        <Avatar
          src="https://static.vecteezy.com/system/resources/previews/003/452/135/original/man-riding-bicycle-sport-illustration-vector.jpg"
          size={"lg"}
          mr="3"
        ></Avatar>
        <Flex flexDir={"column"}>
          <Text
            pb="1"
            color={"gray.700"}
            fontSize="20px"
            fontWeight="extrabold"
          >
            {workshop.name}
          </Text>

          <Text color="gray.500">
            Hosted by{" "}
            <Link color={"red.400"}>{ownerProfileQuery.data?.username}</Link>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
