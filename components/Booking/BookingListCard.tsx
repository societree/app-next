import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { Flex, Text, useToast, Link, Avatar } from "@chakra-ui/react";
import dayjs from "dayjs";
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

  const directToWorkshop = (booking: BookingDetails) => {
    router.push(`/workshops/${booking.workshop_id}`);
  };

  const toast = useToast();

  const [loading, setLoading] = useState(false);

  async function cancelBooking(booking: BookingDetails): Promise<void> {
    setLoading(true);

    try {
      if (booking.id) {
        const success = await data.cancelBooking(booking.id.toString());

        // Redirect if booking cancelled successfully
        if (success) {
          router.push("/me/dashboard");

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
    <Flex
      px="7"
      py="3"
      justifyContent="space-between"
      alignItems={"center"}
      borderBottomWidth="1px"
      borderBottomColor={"gray.300"}
      w={"80%"}
      _hover={{
        background: "gray.50",
      }}
    >
      <Flex w={"100%"}>
        <Avatar
          src="https://static.vecteezy.com/system/resources/previews/003/452/135/original/man-riding-bicycle-sport-illustration-vector.jpg"
          size={"lg"}
          mr="3"
          cursor={"pointer"}
          onClick={() => directToWorkshop(booking)}
        ></Avatar>
        <Flex alignItems={"center"} justifyContent="space-between" w={"100%"}>
          <Flex flexDir={"column"} w={"100%"}>
            <Link
              fontWeight={"bold"}
              mb="0.5"
              onClick={() => directToWorkshop(booking)}
            >
              {booking.workshops?.name}
            </Link>
            <Text
              color="gray.500"
              display={"flex"}
              alignItems="center"
              fontSize="small"
              mb="0.5"
            >
              <CalendarIcon mr="2" />
              {dateToReadable(booking.slots.date)}
            </Text>
            <Text
              color="gray.500"
              display={"flex"}
              alignItems="center"
              fontSize="small"
            >
              <TimeIcon mr="2" />{" "}
              {timeToReadable(
                booking.slots?.start_time,
                booking.slots?.end_time
              )}
            </Text>
          </Flex>
          <Link
            color="red"
            onClick={() => cancelBooking(booking)}
            rounded="full"
          >
            Cancel
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
