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
    <Flex flexDir={"column"} alignItems="center">
      <Img src={img}></Img>
      <Link fontWeight={"bold"} color={"green.500"} fontSize="20px" pb="2">
        {title}
      </Link>
      <Text fontSize={"14px"} width="400px" textAlign={"center"}>
        {description}
      </Text>
    </Flex>
  );
}
