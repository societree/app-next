"use client"

import { Box, Stack, Heading, Text } from "@chakra-ui/react";

export default function AttendeeGuideHeading(){
    return (
      <Box p="1em">
        <Stack spacing={6}>
          <Heading pb="5" size={"lg"} textAlign={"center"}>How to attend workshops</Heading>
          <Text pt="2" fontWeight={"bold"} textAlign={"start"}>
              Can you imagine learning something new, 
              directly from a real person — completely free of charge?
          </Text>
          <Text textAlign="justify">
            At Voluntree, passionate individuals volunteer to share their skills 
            and knowledge for free. No hidden fees, no subscriptions—just real people, building real connections.
            Whether it’s languages, coding, cooking, or something entirely unique, our community of volunteers 
            is here to help you grow.

          </Text>
        </Stack>
      </Box>
    )
}