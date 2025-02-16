"use client"

import { Box, Card, Text, Flex, Img } from "@chakra-ui/react";
import React, { ReactElement } from "react";

export default function AttendeeGuideInstructions(){

    const makeCard = (
        text: string,
        imgSrc: string,
        altText: string
      ) : ReactElement => {
        return (
        <Card w={{base:"100%", sm:"80", md:"70%", lg:"35%"}} boxShadow={"md"} m="3" my="5" p="3">
            <Flex justifyContent="center" alignItems="center" mb="3">
                <Img src={imgSrc} alt={altText} />
            </Flex>
            <Text p="3" mt="3" backgroundColor={"gray.100"} borderRadius={"5"}>
                {text}
            </Text>
        </Card>
        );
      }

    const signUpText = `Log in or create new account and verify email address.`;

    const findWorkshopsText = `Go to "Find workshops" to see available workshops.`;

    const bookSessionText = `Choose workshops you are interested in and book sessions.`;
    
    const dashboardText = `In your dashboard are lists of both past and upcoming bookings.`;

    return (
      <Box my="3">
        <Flex direction={"row"} wrap="wrap" justifyContent={"space-evenly"} alignContent={"stretch"} >
            {makeCard(signUpText, "signup-form.png", "signup")}
            {makeCard(findWorkshopsText, "find-workshops.png", "find workshops")}
            {makeCard(bookSessionText, "book-session.png", "book session")}
            {makeCard(dashboardText, "dashboard.png", "dashboard")}

        </Flex>
      </Box>
    )
}