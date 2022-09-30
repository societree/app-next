import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import LandingHowItWorksCard from "./LandingHowItWorksCard";

export default function LandingHowItWorks() {
  const router = useRouter();

  return (
    <Flex
      flexDir={"column"}
      alignItems="center"
      pt="20"
      pb={{ base: "10", sm: "0" }}
      px={{ base: "7", sm: "0" }}
    >
      <Heading fontWeight={"bold"} fontSize="30px" pb="3">
        How Shared works
      </Heading>
      <Text w={{ base: "100%", sm: "470px" }} textAlign="center">
        Meet new people who share your interests through online and in-person
        events. It’s free to create an account.
      </Text>
      <Flex
        flexDir={{ base: "column", sm: "row" }}
        justifyContent={"space-around"}
        py={{ base: "10", sm: "16" }}
      >
        <LandingHowItWorksCard
          description="Do what you love, meet others who love it, find your community.
        The rest is history!"
          title=" Join a workshop"
          img="https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=384"
        />
        <LandingHowItWorksCard
          description="Do what you love, meet others who love it, find your community.
        The rest is history!"
          title=" Join a workshop"
          img="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=384"
        />
        <LandingHowItWorksCard
          description="Do what you love, meet others who love it, find your community.
        The rest is history!"
          title=" Join a workshop"
          img="https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=384"
        />
      </Flex>

      <Button onClick={() => router.push("/workshops")} colorScheme={"green"}>
        Find workshops
      </Button>
    </Flex>
  );
}
