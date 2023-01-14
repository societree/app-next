import { Box, Container, Flex, Heading, Img, Stack } from "@chakra-ui/react";
import React from "react";
import { BookingDetails } from "../../shared/schemas";
import BookingListCard from "./BookingListCard";

interface IProps {
  bookings: BookingDetails[];
}

export default function BookingList({ bookings }: IProps) {
  return (
    <Stack spacing={0}>
      {bookings?.map((booking) => (
        <BookingListCard key={booking.id} booking={booking} />
      ))}
    </Stack>
  );
}
