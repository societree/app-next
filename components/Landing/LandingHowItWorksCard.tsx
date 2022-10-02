import { Flex, Img, Text, Link } from "@chakra-ui/react";

interface IProps {
  img: string;
  title: string;
  description: string;
}

export default function LandingHowItWorksCard({
  img,
  title,
  description,
}: IProps) {
  return (
    <Flex
      flexDir={"column"}
      alignItems="center"
      pb={{ base: "12", sm: "0" }}
      px={{ base: "0", sm: "7" }}
    >
      <Img pb="2" src={img}></Img>
      <Link
        fontWeight={"bold"}
        color={"green.500"}
        fontSize="lg"
        pb="3"
        textDecor={"underline"}
      >
        {title}
      </Link>
      <Text
        fontSize={"md"}
        textAlign={"center"}
        w={{ base: "full", sm: "380px" }}
      >
        {description}
      </Text>
    </Flex>
  );
}
