import { CalendarIcon } from "@chakra-ui/icons";
import { Button, Text, Flex, Box, Icon, Tooltip } from "@chakra-ui/react";
import { FaClock, FaUser } from "react-icons/fa";
import { dateToReadable, timeToReadable } from "../../utils/dates";
import { TmpSlot } from "./WorkshopSlotForm";

interface IProps {
  slot: TmpSlot;
  onRemoveSlot(id: string): void;
}

export default function WorkshopFormSlot({ slot, onRemoveSlot }: IProps) {
  return (
    <Flex
      justifyContent={"space-between"}
      borderBottomWidth="thin"
      borderBottomColor="gray.100"
      mb="3"
      pb="3"
      alignItems={"center"}
    >
      <Box>
        <Text display={"flex"} alignItems="center" fontWeight={"semibold"}>
          <CalendarIcon pr="1.5" />
          {dateToReadable(slot.date)}
        </Text>
        <Text display={"flex"} alignItems="center">
          <Icon as={FaClock} pr="1.5" />
          {timeToReadable(slot.startTime, slot.endTime)}
        </Text>
        <Text display={"flex"} alignItems="center">
          <Icon as={FaUser} pr="1.5" />
          {slot.capacity}
        </Text>
      </Box>
      <Tooltip label="Remove">
        <Button size={"sm"} onClick={() => onRemoveSlot(slot.id)}>
          x
        </Button>
      </Tooltip>
    </Flex>
  );
}
