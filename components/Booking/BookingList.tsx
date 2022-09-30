import {
  Box,
  Container,
  Flex,
  Heading,
  Img,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BookingDetails } from "../../shared/schemas";
import BookingListCard from "./BookingListCard";
import BookingListHeading from "./BookingListHeading";

interface IProps {
  bookings: BookingDetails[];
}

export default function BookingList({ bookings }: IProps) {
  return (
    <Box>
      <BookingListHeading bookings={bookings} />
      <Stack spacing={0}>
        {bookings?.map((booking) => (
          <BookingListCard key={booking.id} booking={booking} />
        ))}
      </Stack>
    </Box>
  );
}
