import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function ResponsiveContainer({ children }: IProps) {
  return (
    <Container
      maxW={{ base: "100vw", sm: "94vw" }}
      py={{ base: "7", sm: "14" }}
    >
      {children}
    </Container>
  );
}
