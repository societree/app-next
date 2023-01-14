import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  useToast,
  Avatar,
  Card,
  Heading,
  Button,
  Box,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { data } from "../../shared/data/supabase";
import { BookingDetails } from "../../shared/schemas";
import { dateToReadable, timeToReadable } from "../../utils/dates";

interface IProps {
  booking: BookingDetails;
}
export default function BookingListCard({ booking }: IProps) {
  const router = useRouter();

  const toast = useToast();

  const [loading, setLoading] = useState(false);

  async function cancelBooking(booking: BookingDetails): Promise<void> {
    setLoading(true);

    try {
      if (booking.id) {
        const success = await data.cancelBooking(booking.id.toString());

        // Redirect if booking cancelled successfully
        if (success) {
          router.push("/dashboard");

          toast({
            title: "Booking cancelled",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      const message = (error as any).message;

      toast({
        title: "Problem cancelling booking",
        description: message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      boxShadow={"none"}
      cursor="pointer"
      minW="container.md"
      bg="white"
      py="8"
      px="6"
      rounded={"none"}
      pos="relative"
      w="50vw"
      borderBottomColor={"black"}
      borderBottomWidth="1px"
    >
      <Link href={`/workshops/${booking.workshop_id}`}>
        <Heading size={"md"} pb="2">
          {booking.workshops?.name}
        </Heading>
      </Link>
      <Text>{dateToReadable(booking.slots.date)}</Text>
      <Text>
        {timeToReadable(booking.slots?.start_time, booking.slots?.end_time)}
      </Text>
      <Button
        pos={"absolute"}
        bottom="0"
        right={"0"}
        mt="4"
        color={"white"}
        h="100%"
        bg="black"
        rounded={"none"}
        border={"1px solid transparent"}
        px="4"
        py="3"
        fontWeight={"light"}
        _hover={{
          bg: "black",
        }}
        onClick={() => cancelBooking(booking)}
      >
        Cancel
      </Button>
    </Box>
  );
}
