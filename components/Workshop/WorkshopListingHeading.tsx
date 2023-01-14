import { Box, Text, Link, Flex, Avatar, Heading } from "@chakra-ui/react";
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
    <Box pb="10">
      <Heading size={"2xl"} pb="1" fontWeight="bold" letterSpacing={"wide"}>
        {workshop.name}
      </Heading>
    </Box>
  );
}
