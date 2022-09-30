import { Flex, Box, Heading, Img, Text } from "@chakra-ui/react";

export default function LandingHeading() {
  return (
    <Flex
      flexDir={{ base: "column", sm: "row" }}
      justifyContent={"space-around"}
      alignItems="center"
    >
      <Box w={{ base: "100%", sm: "550px" }}>
        <Heading
          p="4"
          fontWeight={"extrabold"}
          fontSize={{ base: "30px", sm: "48px" }}
          lineHeight="50px"
          pb={{ base: "1", sm: "5" }}
        >
          Grow your community by sharing your knowledge
        </Heading>
        <Text fontSize={"16px"} p="4">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quLorem
          ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
          ligula eget dolor.
        </Text>
      </Box>
      <Img
        mt={{ base: "8", sm: 0 }}
        height={{ base: "150px", sm: "225px" }}
        src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=1080"
      ></Img>
    </Flex>
  );
}
