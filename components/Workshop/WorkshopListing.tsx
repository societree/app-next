import { Box, Container } from "@chakra-ui/react";
import React from "react";
import { Booking, Slot, Workshop } from "../../shared/schemas";
import WorkshopListingBody from "./WorkshopListingBody";
import WorkshopListingHeading from "./WorkshopListingHeading";
import WorkshopListingSlotList from "./WorkshopListingSlotList";

interface IProps {
  workshop: Workshop;
  slots: Slot[];
  bookings: Booking[];
}

export default function WorkshopListing({ workshop, slots, bookings }: IProps) {
  return (
    <Container maxW={"container.lg"} py="20">
      <WorkshopListingHeading workshop={workshop} />
      <WorkshopListingBody workshop={workshop} />
      <WorkshopListingSlotList
        workshop={workshop}
        slots={slots}
        bookings={bookings}
      />
    </Container>
  );
}
