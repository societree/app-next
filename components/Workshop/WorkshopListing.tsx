import { Box } from "@chakra-ui/react";
import React from "react";
import { Slot, Workshop } from "../../shared/schemas";
import WorkshopListingBody from "./WorkshopListingBody";
import WorkshopListingHeading from "./WorkshopListingHeading";
import WorkshopListingSlotList from "./WorkshopListingSlotList";

interface IProps {
  workshop: Workshop;
  slots: Slot[];
}

export default function WorkshopListing({ workshop, slots }: IProps) {
  return (
    <Box>
      <WorkshopListingHeading workshop={workshop} />
      <WorkshopListingBody workshop={workshop} />
      <WorkshopListingSlotList workshop={workshop} slots={slots} />
    </Box>
  );
}
