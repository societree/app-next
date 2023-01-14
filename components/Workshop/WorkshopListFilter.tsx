import { Center, Flex, HStack, Input, Select } from "@chakra-ui/react";
import { capitalize } from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import config from "../../app-config";
import {
  FilterProps,
  DefaultFilterProps,
  TimeFilter,
} from "../../shared/schemas";

interface IProps {
  activeFilter: FilterProps;
  onFilterChange(filter: FilterProps): void;
}

export default function WorkshopListFilter({
  onFilterChange,
  activeFilter,
}: IProps) {
  const { register, watch } = useForm<FilterProps>({
    defaultValues: DefaultFilterProps,
  });

  React.useEffect(() => {
    const subscription = watch((data) => {
      onFilterChange(data as FilterProps);
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <Flex flexDir={"column"} alignItems="center" justifyContent={"center"}>
      <Center mb="12" pl="60">
        <Input
          border={"none"}
          bg="transparent"
          placeholder="Search"
          color={"black"}
          autoFocus={true}
          _placeholder={{ color: "black" }}
          fontWeight="semibold"
          p="10"
          fontSize="6xl"
          borderWidth={"1px"}
          borderColor={"black"}
          _hover={{
            borderWidth: "0px",
            borderColor: "transparent",
            cursor: "pointer",
          }}
          focusBorderColor="transparent"
          {...register("text")}
        />
      </Center>
      <HStack spacing={2}>
        <Select
          rounded={"full"}
          placeholder="All Categories"
          fontWeight={"semibold"}
          bg={activeFilter.category ? "black" : "transparent"}
          color={activeFilter.category ? "white" : "black"}
          h="12"
          borderWidth={"1px"}
          borderColor={"black"}
          boxShadow={"sm"}
          _hover={{
            borderWidth: "1px",
            borderColor: "black",
            cursor: "pointer",
          }}
          {...register("category")}
        >
          {config.categories.map((c) => (
            <option key={c} value={c}>
              {capitalize(c)}
            </option>
          ))}
        </Select>

        <Select
          rounded={"full"}
          fontWeight={"semibold"}
          bg={
            activeFilter.time === TimeFilter.ANY_TIME ? "transparent" : "black"
          }
          color={activeFilter.time === TimeFilter.ANY_TIME ? "black" : "white"}
          h="12"
          _hover={{
            borderWidth: "1px",
            borderColor: "black",
            cursor: "pointer",
          }}
          borderWidth={"1px"}
          borderColor={"black"}
          boxShadow={"sm"}
          {...register("time")}
        >
          {config.timeFilters.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </HStack>
    </Flex>
  );
}
