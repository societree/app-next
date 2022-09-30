import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function ResponsiveContainer({ children }: IProps) {
  return (
    <Container
      maxW={{ base: "100vw", sm: "89vw" }}
      py={{ base: "0", sm: "10" }}
      px={{ base: "0", sm: "20" }}
    >
      {children}
    </Container>
  );
}
