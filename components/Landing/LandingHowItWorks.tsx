import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import LandingHowItWorksCard from "./LandingHowItWorksCard";

export default function LandingHowItWorks() {
  const router = useRouter();

  return (
    <Flex flexDir={"column"} alignItems="center">
      <Heading fontWeight={"bold"} size="lg" pb="3">
        How Societree works
      </Heading>
      <Text
        w={{ base: "100%", sm: "470px" }}
        textAlign="center"
        fontSize={"md"}
      >
        Join, host or sponsor community workshops. It’s totally free to create
        an account and always will be.
      </Text>

      <Flex
        flexDir={{ base: "column", sm: "row" }}
        justifyContent={"space-between"}
        alignItems="baseline"
        py={{ base: "10", sm: "16" }}
      >
        <LandingHowItWorksCard
          title="Host"
          description="Volunteers are an integral part of the platform: they're the ones that volunteer their skills and time to the community."
          img="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=384"
        />
        <LandingHowItWorksCard
          title=" Join"
          description="Users are the main beneficiaries of the platform: they're the ones receiving the support, knowledge and skills, totally free."
          img="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=384"
        />
        <LandingHowItWorksCard
          title="Sponsor"
          description="Sponsors are community members and companies that support the work of volunteers through regular monthly donations of as little as £1."
          img="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=384"
        />
      </Flex>
      <Button onClick={() => router.push("/workshops")} colorScheme={"green"}>
        Find workshops
      </Button>
    </Flex>
  );
}
