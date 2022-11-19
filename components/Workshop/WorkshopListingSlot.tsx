import { Box, Button, Text, Badge } from "@chakra-ui/react";
import React from "react";
import { MdOutlineIosShare } from "react-icons/md";
import { authenticationModalState } from "../../shared/recoil/atoms";
import { Booking, Slot } from "../../shared/schemas";
import { dateToReadable, timeToReadable } from "../../utils/dates";
import { useSession } from "../../utils/hooks";
import { useRecoilState } from "recoil";
import { data } from "../../shared/data/supabase"

interface IProps {
  slot: Slot;
  slotBookings: Booking[];
  onJoin(): void;
}

export default function WorkshopListingSlot({ slot, slotBookings, onJoin }: IProps) {
  const session = useSession();
  const [_, setAuthModalIsOpen] = useRecoilState(authenticationModalState);
  const availableSpaces = slot.capacity - slotBookings.length
  const availableSpacesMessage = `${availableSpaces} ${availableSpaces == 1 ? "space" : "spaces"} available`

  return (
    <Box
      py="5"
      px={{ base: "2", md: "10" }}
      borderTop={"1px"}
      borderTopColor="gray.200"
      display="flex"
      justifyContent={"space-between"}
    >
      <Box fontSize={"sm"}>
        <Text>{dateToReadable(slot.date)}</Text>
        <Text fontWeight={"bold"}>
          {timeToReadable(slot.start_time, slot.end_time)}
        </Text>
        <Badge variant={"subtle"} colorScheme="green">
          {availableSpacesMessage}
        </Badge>
      </Box>
      <Box>
        <Button
          rounded="full"
          colorScheme="green"
          rightIcon={<MdOutlineIosShare />}
          variant={"outline"}
          onClick={() => onJoin()}
          size={{ base: "xs", sm: "md" }}
          mr="3"
        >
          Share
        </Button>

        <Button
          rounded="full"
          colorScheme="green"
          variant={"solid"}
          onClick={() => {
            if (session?.user) {
              onJoin();
            } else {
              setAuthModalIsOpen(true);
            }
          }}
          size={{ base: "xs", sm: "md" }}
        >
          Join
        </Button>
      </Box>
    </Box>
  );
}
