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
            colorScheme={"green"}
            {...register("virtual")}
          />
        </Flex>
      </FormControl>

      <Show showIf={!formState.virtual}>
        <FormControl>
          <Input
            {...register("house", {
              required: "This is required",
            })}
            placeholder="8 Community House"
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
    <Stack spacing={4}>
      <WorkshopSlotForm
        hasSlots={slots.length !== 0}
        onSubmit={(data) => {
          setSlots((old) => [...old, data]);
        }}
      />
    </Stack>
  );

  const FORM_STEPS = [
    { label: "What?", content: descriptionStage },
    { label: "Where?", content: locationStage },
    { label: "When?", content: dateStage },
  ];

  // is the form in its final stage?
  const isFinalStage = activeStep === FORM_STEPS.length - 1;

  return (
    <Flex flexDir={{ base: "column", sm: "row" }}>
      <Box minW={{ base: "", sm: "50vw" }}>
        <Heading mb={{ base: "7", sm: "12" }}>Create</Heading>
        <Flex flexDir="column" width="100%">
          <Steps activeStep={activeStep}>
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
              variant="ghost"
            >
              Prev
            </Button>
            <Button
              isLoading={isLoading}
              isDisabled={nextStepIsDisabled()}
              colorScheme={isFinalStage ? "green" : "gray"}
              onClick={() => {
                if (isFinalStage) {
                  onSubmit(formState);
                } else {
                  nextStep();
                }
              }}
            >
              {isFinalStage ? "Finish" : "Next"}
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Box pt={{ base: "10", sm: "0" }} pl={{ base: "0", sm: "10" }}>
        <Show showIf={slots.length !== 0}>
          <Box
            borderColor={"gray.100"}
            rounded="lg"
            borderWidth={"thin"}
            px={{ base: "7", sm: "10" }}
            py={{ base: "10", sm: "14" }}
            minW={{ base: "", sm: "600px" }}
            boxShadow="lg"
            mt="20"
          >
            <Stack spacing={2}>
              {slots.map((slot) => (
                <WorkshopFormSlot
                  key={slot.id}
                  slot={slot}
                  onRemoveSlot={(id: string) =>
                    setSlots((prev) => prev.filter((s) => s.id !== id))
                  }
                />
              ))}
            </Stack>
          </Box>
        </Show>
      </Box>
    </Flex>
  );
}
