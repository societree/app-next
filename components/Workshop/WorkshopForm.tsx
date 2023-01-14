import {
  Stack,
  Input,
  Select,
  Button,
  Textarea,
  FormControl,
  Text,
  FormErrorMessage,
  FormLabel,
  Switch,
  Flex,
  Box,
  Heading,
} from "@chakra-ui/react";
import { capitalize } from "lodash";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import config from "../../app-config";
import { Slot, Workshop } from "../../shared/schemas";
import { useSession } from "../../utils/hooks";
import { data } from "../../shared/data/supabase";
import WorkshopSlotForm, { TmpSlot } from "./WorkshopSlotForm";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import WorkshopFormSlot from "./WorkshopFormSlot";
import Show from "../Helpers/Show";

const VIRTUAL_LOCATION_BY_DEFAULT = false;

export default function WorkshopForm(): JSX.Element {
  const session = useSession();

  const [slots, setSlots] = useState<TmpSlot[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    watch,

    formState: { errors },
  } = useForm<Workshop>({
    defaultValues: { virtual: VIRTUAL_LOCATION_BY_DEFAULT },
  });

  const router = useRouter();

  const formState = watch();

  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });

  /**
   * Handles submitting the new workshop to the api
   *
   * @param formData - form field data
   */
  async function onSubmit(formData: Workshop) {
    setIsLoading(true);
    const newWorkshop: Workshop = formData;

    // Current user
    const createdBy = session?.user?.id;

    if (createdBy) {
      newWorkshop.user_id = createdBy;

      const createdWorkshop = await data.createWorkshop(newWorkshop);

      if (createdWorkshop.id) {
        const newId = createdWorkshop.id;

        const newSlots: Slot[] = slots.map((s) => {
          return {
            workshop_id: newId,
            date: s.date,
            start_time: s.startTime,
            end_time: s.endTime,
            capacity: Number.parseInt(s.capacity),
          };
        });

        const slotsSuccessfullyCreated = await data.createSlots(newSlots);

        if (slotsSuccessfullyCreated) {
          router.push(`/workshops/${newId}`);
        }
      }
    }
    setIsLoading(false);
  }

  /**
   * Returns a boolean based on whether the form can be progressed to the next stage
   * i.e have the required fields been completed
   *
   * @returns boolean
   */
  const nextStepIsDisabled = () => {
    switch (activeStep) {
      case 0:
        return !formState.name || !formState.description || !formState.category;
      case 1:
        return (
          formState.virtual === false &&
          (!formState.city ||
            !formState.postcode ||
            !formState.postcode ||
            !formState.street ||
            !formState.house)
        );
      case 2:
        return slots.length === 0;
      default:
        return false;
    }
  };

  /**
   * Description stage step of form
   */
  const descriptionStage = (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel htmlFor="name" fontSize={{ base: "xs", sm: "sm" }}>
          Name
        </FormLabel>
        <Input
          {...register("name", {
            required: "This is required",
          })}
          placeholder="My Workshop"
          autoFocus={true}
          borderColor={"black"}
          focusBorderColor="black"
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="category" fontSize={{ base: "xs", sm: "sm" }}>
          Category
        </FormLabel>
        <Select
          {...register("category", {
            required: "This is required",
          })}
          borderColor={"black"}
          focusBorderColor="black"
        >
          {config.categories.map((category) => {
            return (
              <option key={category} value={category}>
                {capitalize(category)}
              </option>
            );
          })}
        </Select>
        <FormErrorMessage>
          {errors.category && errors.category.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="description" fontSize={{ base: "xs", sm: "sm" }}>
          Description
        </FormLabel>
        <Textarea
          {...register("description", {
            required: "This is required",
          })}
          placeholder="It's a workshop"
          borderColor={"black"}
          focusBorderColor="black"
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>
    </Stack>
  );

  /**
   * Location stage step of form
   */
  const locationStage = (
    <Stack spacing={4}>
      <FormControl
        display="flex"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <FormLabel
          htmlFor="isVirtual"
          mb="0"
          fontSize={{ base: "xs", sm: "sm" }}
        >
          Location
        </FormLabel>
        <Flex alignItems={"center"}>
          <Text mr={2}>Virtual?</Text>
          <Switch
            id="isVirtual"
            colorScheme={"blue"}
            {...register("virtual")}
          />
        </Flex>
      </FormControl>

      <Show showIf={formState.virtual}>
        <Text pt="4" color="gray.700">
          This is a virtual workshop with no associated address. Press Next if
          that is correct.
        </Text>
      </Show>

      <Show showIf={!formState.virtual}>
        <FormControl>
          <Input
            {...register("house", {
              required: "This is required",
            })}
            placeholder="8 Community House"
            borderColor={"black"}
            focusBorderColor="black"
          />
          <FormErrorMessage>
            {errors.house && errors.house.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <Input
            {...register("street", {
              required: "This is required",
            })}
            placeholder="Bristol Road"
            borderColor={"black"}
            focusBorderColor="black"
          />
          <FormErrorMessage>
            {errors.street && errors.street.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <Input
            {...register("postcode", {
              required: "This is required",
            })}
            placeholder="BS1 3SQ"
            borderColor={"black"}
            focusBorderColor="black"
          />
          <FormErrorMessage>
            {errors.postcode && errors.postcode.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <Input
            {...register("city", {
              required: "This is required",
            })}
            placeholder="Bristol"
            borderColor={"black"}
            focusBorderColor="black"
          />
          <FormErrorMessage>
            {errors.city && errors.city.message}
          </FormErrorMessage>
        </FormControl>
      </Show>
    </Stack>
  );

  /**
   * Date stage step of form
   */
  const dateStage = (
    <Flex justifyContent={"space-around"} w="full" flexDir={"column"}>
      <WorkshopSlotForm
        hasSlots={slots.length !== 0}
        onSubmit={(data) => {
          setSlots((old) => [...old, data]);
        }}
      />
      <Flex flexDir={"column"} py="5">
        {slots.map((s) => (
          <WorkshopFormSlot
            key={s.id}
            slot={s}
            onRemoveSlot={(id) =>
              setSlots((prev) => prev.filter((s) => s.id !== id))
            }
          />
        ))}
      </Flex>
    </Flex>
  );

  const FORM_STEPS = [
    { label: "What?", content: descriptionStage },
    { label: "Where?", content: locationStage },
    { label: "When?", content: dateStage },
  ];

  // is the form in its final stage?
  const isFinalStage = activeStep === FORM_STEPS.length - 1;

  return (
    <Flex flexDir="column">
      <Steps hidden colorScheme={"gray"} activeStep={activeStep}>
        {FORM_STEPS.map(({ label, content }) => (
          <Step label={label} key={label}>
            <Box my={{ base: "4", sm: "12" }}>{content}</Box>
          </Step>
        ))}
      </Steps>
      <Flex width="100%" justify="flex-end">
        <Button
          isDisabled={activeStep === 0}
          mr={4}
          onClick={prevStep}
          color={"black"}
          rounded={"full"}
          bg="transparent"
          border={"1px solid transparent"}
          px="4"
          py="3"
          fontWeight={"light"}
          _hover={{
            bg: "transparent",
            color: "black",
            border: "1px solid black",
          }}
        >
          Prev
        </Button>
        <Button
          isLoading={isLoading}
          isDisabled={nextStepIsDisabled()}
          onClick={() => {
            if (isFinalStage) {
              onSubmit(formState);
            } else {
              nextStep();
            }
          }}
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
        >
          {isFinalStage ? "Finish" : "Next"}
        </Button>
      </Flex>
    </Flex>
  );
}
