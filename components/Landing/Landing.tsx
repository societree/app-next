import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Center,
  Text,
  Flex,
  Img,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { BsArrowRightCircleFill } from "react-icons/bs";

export default function Landing() {
  const router = useRouter();
  return (
    <Box
      px={{ base: "10", sm: "28" }}
      color={"white"}
      pt={{ base: "10", sm: "40" }}
    >
      <Center pb={{ base: "14", sm: "16" }}>
        <Heading
          textAlign={"center"}
          fontSize={{ base: "6xl", sm: "100px" }}
          fontWeight="400"
        >
          We&apos;re a platform with purpose
        </Heading>
      </Center>

      <Center pb={{ base: "24", sm: "36" }}>
        <Button
          color={"white"}
          size="lg"
          onClick={() => router.push("/workshops")}
          bg="transparent"
          border="1px solid white"
          rounded={"full"}
          px="7"
          py="7"
          transition={"all .3s ease-out"}
          fontWeight={"light"}
          _hover={{
            bg: "white",
            color: "#2c45b7",
          }}
        >
          Browse workshops
        </Button>
      </Center>

      <Box w={{ base: "100%", sm: "75%" }}>
        <Heading size={{ base: "3xl", sm: "4xl" }} pb="8" fontWeight="400">
          Better begins today
        </Heading>

        <Text fontSize={"2xl"} fontWeight="light">
          Showing up for people and the planet, using the platform to drive
          meaningful change where it matters most.
        </Text>
      </Box>

      <Flex
        direction={{ base: "column", sm: "row" }}
        justifyContent={"space-around"}
        pt={{ base: "10", sm: "28" }}
      >
        <Box
          border={"1px solid white"}
          p="10"
          py="8"
          rounded={"2xl"}
          w={{ base: "100%", sm: "350px" }}
          mb={{ base: "4", sm: "0" }}
        >
          <Heading pb="2" fontWeight={"semibold"} size={"4xl"}>
            145
          </Heading>
          <Text pl={"2"} fontWeight="light">
            workshops
          </Text>
        </Box>

        <Box
          border={"1px solid white"}
          p="10"
          py="8"
          rounded={"2xl"}
          w={{ base: "100%", sm: "350px" }}
          mb={{ base: "4", sm: "0" }}
        >
          <Heading pb="2" fontWeight={"semibold"} size={"4xl"}>
            452
          </Heading>
          <Text pl={"1"} fontWeight="light">
            number of volunteers
          </Text>
        </Box>

        <Box
          border={"1px solid white"}
          p="10"
          py="8"
          rounded={"2xl"}
          w={{ base: "100%", sm: "350px" }}
          mb={{ base: "4", sm: "0" }}
        >
          <Heading pb="2" fontWeight={"semibold"} size={"4xl"}>
            406K
          </Heading>
          <Text pl={"1"} fontWeight="light">
            monthly users
          </Text>
        </Box>
      </Flex>

      <Center my={{ base: "14", sm: "32" }}>
        <Img
          rounded={"xl"}
          w="75%"
          src="https://images.unsplash.com/photo-1490187763999-9f273a5b7516?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        />
      </Center>

      <Box>
        <Center>
          <Heading
            size={{ base: "3xl", sm: "4xl" }}
            pb="8"
            fontWeight="400"
            textAlign={"center"}
          >
            Directly democratic
          </Heading>
        </Center>

        <Center>
          <Text
            textAlign={"center"}
            fontSize={{ base: "2xl", sm: "3xl" }}
            fontWeight="light"
            w={{ base: "100%", sm: "75%" }}
          >
            Totally transparent, directly democratic, and free to use, Societree
            will enable you to help your community, build your reputation and
            learn some brand new skills.
          </Text>
        </Center>
      </Box>

      <Flex
        justifyContent={"space-around"}
        pt={{ base: "20", sm: "28" }}
        direction={{ base: "column", sm: "row" }}
      >
        <Link href={"/workshops"}>
          <Box
            border={"1px solid white"}
            p="10"
            py="8"
            rounded={"2xl"}
            w={{ base: "100%", sm: "350px" }}
            mb={{ base: "4", sm: "0" }}
            _hover={{
              bg: "white",
              color: "#503750",
            }}
            transition={"all .3s ease-out"}
          >
            <Heading pb="2" fontWeight={"semibold"} size={"2xl"}>
              Languages
            </Heading>
            <Flex alignItems={"center"}>
              <Text pr={2} fontWeight="light">
                12 available
              </Text>
              <ArrowRightIcon fontSize={"8px"} />
            </Flex>
          </Box>
        </Link>

        <Link href={"/workshops"}>
          <Box
            border={"1px solid white"}
            p="10"
            py="8"
            rounded={"2xl"}
            mb={{ base: "4", sm: "0" }}
            w={{ base: "100%", sm: "350px" }}
            _hover={{
              bg: "white",
              color: "#503750",
            }}
            transition={"all .3s ease-out"}
          >
            <Heading pb="2" fontWeight={"semibold"} size={"2xl"}>
              Finance
            </Heading>
            <Flex alignItems={"center"}>
              <Text pr={2} fontWeight="light">
                12 available
              </Text>
              <ArrowRightIcon fontSize={"8px"} />
            </Flex>
          </Box>
        </Link>

        <Link href={"/workshops"}>
          <Box
            border={"1px solid white"}
            p="10"
            py="8"
            rounded={"2xl"}
            w={{ base: "100%", sm: "350px" }}
            mb={{ base: "4", sm: "0" }}
            _hover={{
              bg: "white",
              color: "#503750",
            }}
            transition={"all .3s ease-out"}
          >
            <Heading pb="2" fontWeight={"semibold"} size={"2xl"}>
              Arts
            </Heading>
            <Flex alignItems={"center"}>
              <Text pr={2} fontWeight="light">
                12 available
              </Text>
              <ArrowRightIcon fontSize={"8px"} />
            </Flex>
          </Box>
        </Link>
      </Flex>

      <Flex my={{ base: "20", sm: "40" }} justifyContent="space-between">
        <Box w={{ base: "100%", sm: "60%" }}>
          <Heading size={"3xl"} pb="8" fontWeight="400">
            Social exchange
          </Heading>

          <Text fontSize={"2xl"} fontWeight="light" lineHeight={"10"} pb="8">
            Built on a commitment to the idea that social exchange has real
            material value, Societree is a social experiment platform that
            challenges the conventional capitalist business structures.
          </Text>

          <Flex fontSize={"xl"} alignItems={"center"}>
            <Text
              fontWeight="semibold"
              pr={3}
              _hover={{
                color: "gray.200",
              }}
            >
              <Link href={"/workshops"}>Check out workshops</Link>
            </Text>
            <BsArrowRightCircleFill />
          </Flex>
        </Box>

        <Img
          display={{ base: "none", sm: "block" }}
          h="400px"
          src="https://images.unsplash.com/photo-1541976844346-f18aeac57b06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        />
      </Flex>
    </Box>
  );
}
