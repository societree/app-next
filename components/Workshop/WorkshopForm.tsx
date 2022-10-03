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
  useDisclosure,
  Box,
  InputGroup,
  InputRightElement,
  Container,
} from "@chakra-ui/react";
import { capitalize } from "lodash";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import config from "../../app-config";
import { Slot, Workshop } from "../../shared/schemas";
import { useSession } from "../../utils/hooks";
import { data } from "../../shared/data/supabase";
import Slider from "../Slider";
import WorkshopSlotForm from "./WorkshopSlotForm";

export default function WorkshopForm(): JSX.Element {
  const session = useSession();
  const [slots, setSlots] = useState<any[]>([]);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Workshop>({
    defaultValues: { virtual: true },
  });

  const router = useRouter();

  const { virtual } = watch();

  async function onSubmit(formData: Workshop) {
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

        const slotsSuccessfulyCreated = await data.createSlots(newSlots);

        if (slotsSuccessfulyCreated) {
          router.push(`/workshops/${newId}`);
        }
      }
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container py="20">
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
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
              <FormLabel htmlFor="description">Description</FormLabel>
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

            <FormControl
              display="flex"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <FormLabel htmlFor="isVirtual" mb="0">
                Location
              </FormLabel>
              <Flex alignItems={"center"}>
                <Text mr={2}>Virtual?</Text>
                <Switch
                  id="isVirtual"
                  colorScheme={"twitter"}
                  {...register("virtual")}
                />
              </Flex>
            </FormControl>

            {!virtual ? (
              <>
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
              </>
            ) : null}

            <FormControl>
              <FormLabel htmlFor="category">Category</FormLabel>
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

            {slots.length !== 0 ? (
              <FormLabel htmlFor="category">Sessions</FormLabel>
            ) : null}

            {slots.map((s, i) => (
              <InputGroup size="md" key={i}>
                <Input
                  key={i}
                  disabled
                  value={`${s.date}, ${s.startTime} - ${s.endTime}, ${s.capacity} spaces`}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => {
                      setSlots((old) =>
                        old.filter((element) => element.id !== s.id)
                      );
                    }}
                  >
                    <BiTrash />
                  </Button>
                </InputRightElement>
              </InputGroup>
            ))}

            <Button variant="text" size="md" onClick={onOpen}>
              Add Session
            </Button>

            <Button
              type="submit"
              isLoading={isSubmitting}
              boxShadow="lg"
              disabled={slots.length === 0}
              colorScheme="green"
            >
              Save
            </Button>
          </Stack>
        </form>
      </Box>

      <Slider title="Create slot" onClose={onClose} isOpen={isOpen}>
        <WorkshopSlotForm
          onSubmit={(data) => {
            setSlots((old) => [...old, data]);
            onClose();
          }}
        />
      </Slider>
    </Container>
  );
}
