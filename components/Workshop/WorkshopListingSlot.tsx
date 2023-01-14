import { Box, Button, Text, Flex } from "@chakra-ui/react";
import React from "react";
import { authenticationModalState } from "../../shared/recoil/atoms";
import { Booking, Slot } from "../../shared/schemas";
import { dateToReadable, timeToReadable } from "../../utils/dates";
import { useSession } from "../../utils/hooks";
import { useRecoilState } from "recoil";
import { pluralize } from "@/utils/strings";

interface IProps {
  slot: Slot;
  slotBookings: Booking[];
  onJoin(): void;
}

export default function WorkshopListingSlot({
  slot,
  slotBookings,
  onJoin,
}: IProps) {
  const session = useSession();
  const [_, setAuthModalState] = useRecoilState(authenticationModalState);
  const availableSpaces = slot.capacity - slotBookings.length;
  const availableSpacesMessage = `${pluralize(
    availableSpaces,
    "space",
    "s"
  )} available`;

  return (
    <Flex
      py="7"
      px={{ base: "5", md: "10" }}
      justifyContent={"space-between"}
      bg="white"
      rounded={"lg"}
      alignItems="center"
      border={"1px solid black"}
    >
      <Box>
        <Text>{dateToReadable(slot.date)}</Text>
        <Text mb="3">{timeToReadable(slot.start_time, slot.end_time)}</Text>

        <Flex
          fontSize={"xs"}
          px="2"
          py="1"
          border={"1px solid black"}
          w="fit-content"
          rounded={"full"}
          mr="1"
          bg="black"
          color="white"
        >
          {availableSpacesMessage}
        </Flex>
      </Box>
      <Box>
        <Button
          color={"white"}
          bg="black"
          rounded={"full"}
          border={"1px solid transparent"}
          px="4"
          py="3"
          fontWeight={"light"}
          _hover={{
            bg: "transparent",
            color: "black",
            border: "1px solid black",
          }}
          onClick={() => {
            if (session?.user) {
              onJoin();
            } else {
              setAuthModalState({ open: true, signUp: false });
            }
          }}
        >
          Join
        </Button>
      </Box>
    </Flex>
  );
}
