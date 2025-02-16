"use client"

import { Container } from "@chakra-ui/react";
import AttendeeGuideHeading from "./AttendeeGuideHeading";
import AttendeeGuideInstructions from "./AttendeeGuideInstructions";

export default function AttendeeGuide(){
    return (
      <Container px={{ base: "6", sm: "16" }} maxW={"7xl"}>
        <AttendeeGuideHeading />
        <AttendeeGuideInstructions />
      </Container>
    )
}