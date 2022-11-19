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
          fontWeight={"extrabold"}
          fontSize={{ base: "2xl", sm: "5xl" }}
          lineHeight={{ base: "35px", sm: "50px" }}
          pb={{ base: "5", sm: "5" }}
        >
          Societree is a knowledge-sharing platform with a difference.
        </Heading>
        <Text fontSize={"md"} pb={{ base: "5", sm: "0" }}>
          Totally <b>transparent</b>, directly <b>democratic</b>, and
          <b> free</b> to use, Societree will enable you to help your community,
          build your reputation and learn some brand new skills! Built on a
          commitment to the idea that social exchange has real material value,
          Societree is a social experiment platform that challenges the conventional
          capitalist business structures.
        </Text>
      </Box>
      <Img
        mt={{ base: "8", sm: "0" }}
        height={{ base: "150px", sm: "225px" }}
        src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=1080"
      ></Img>
    </Flex>
  );
}
