"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Text,
  Badge,
  Flex,
  useDisclosure,
  useToast,
  Link,
  ButtonGroup,
} from "@chakra-ui/react";
import { MdOutlineCancel, MdKeyboardArrowRight, MdStart } from "react-icons/md";
import { Booking, Slot, User, Workshop } from "@schemas";
import { dateToReadable, timeToReadable } from "@util/dates";
import Show from "@components/Helpers/Show";
import { ConfirmActionDialog } from "@components/Helpers/ConfirmActionDialog";
import { useRouter } from "next/navigation";
import { clientData } from "@data/supabase";

interface IProps {
  workshop: Workshop;
  slot: Slot;
  slotBookings: Booking[];
  user: User | null;
}

export function WorkshopListingUpcomingSlot({
  workshop,
  slot,
  slotBookings,
  user,
}: IProps) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const isUserHost = () => user?.id == workshop.user_id;
  const availableSpaces = slot.capacity - slotBookings.length;
  const availableSpacesMessage = `${availableSpaces} ${
    availableSpaces == 1 ? "space" : "spaces"
  } available`;

  async function confirmBooking(): Promise<void> {
    setLoading(true);
    try {
      if (workshop.id && slot.id && user) {
        const success = await clientData.bookSlot(workshop, slot, user.id);

        // Redirect if booking created successfully
        if (success) {
          router.refresh();
        } else {
          toast({
            title: "Problem creating booking",
            description: "Please finish setting up your profile",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          router.push("/auth/setup-profile")
        }
      }
    } catch (error) {
      const message = (error as any).message;
      toast({
        title: "Problem creating booking",
        description: message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      onClose();
    }
  }

  async function cancelSlot(): Promise<void> {
    setLoading(true);
    try {
      if (slot.id) {
        const success = await clientData.cancelSlot(slot);
        // Redirect if slot created successfully
        if (success) {
          router.refresh();
        }
      }
    } catch (error) {
      const message = (error as any).message;
      toast({
        title: "Problem canceling a session",
        description: message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return (
    <Box
      py="5"
      borderBottom={"1px"}
      borderBottomColor="gray.200"
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
      <Flex alignItems={"center"}>
        <Show showIf={isUserHost()}>
          <Flex direction={{ base: "column", sm: "row" }} gap={{ base: "2", md: "4" }} >
              <Link as={NextLink} href={workshop.meeting_link} target="_blank">
                <Button
                  rounded="full"
                  colorScheme="linkedin"
                  variant="solid"
                  rightIcon={<MdStart />}
                  size={{ base: "sm", sm: "md" }}        
                  w={{ base: "100%", sm: "auto" }}
                >
                  Enter
                </Button>
              </Link>
                <Button
                  rounded="full"
                  colorScheme="red"
                  variant="solid"
                  onClick={onOpen}
                  rightIcon={<MdOutlineCancel />}
                  size={{ base: "sm", sm: "md" }}
                  w={{ base: "100%", sm: "auto" }}
                >
                Cancel
              </Button>
          </Flex>
          <ConfirmActionDialog
            title="Cancel Session"
            message="Are you sure you want to cancel this session? This action cannot be undone."
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={cancelSlot}
          />
          
        </Show>
        <Show showIf={!isUserHost()}>
          <Button
            rounded="full"
            colorScheme={availableSpaces == 0 ? "blackAlpha" : "green"}
            isDisabled={availableSpaces == 0}
            variant={"solid"}
            onClick={() => {
              if (user) {
                onOpen();
              } else {
                router.push("/login");
              }
            }}
            rightIcon={<MdKeyboardArrowRight />}
            size={{ base: "sm", sm: "md" }}
          >
            Book
          </Button>
          <ConfirmActionDialog
            title="Confirm Booking"
            message="Are you sure you would like to book this session?"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={confirmBooking}
          />
        </Show>
      </Flex>
    </Box>
  );
}
