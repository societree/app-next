import { Box, HStack, Input, Select } from "@chakra-ui/react";
import { capitalize } from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import config from "../../app-config";

interface IProps {
  onFilterChange(filter: any): void;
}

export default function WorkshopListFilter({ onFilterChange }: IProps) {
  const { register, watch } = useForm();

  const filterState = watch();

  React.useEffect(() => {
    onFilterChange(filterState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterState]);

  return (
    <Box pb="7" display={{ base: "none", md: "block" }} w="800px">
      <HStack spacing={1}>
        <Input
          rounded={"full"}
          placeholder="Search for keywords"
          type={"search"}
          {...register("search")}
        />
        <Select
          rounded={"full"}
          fontWeight={"semibold"}
          placeholder="Category"
          bg="gray.100"
          {...register("category")}
        >
          {config.categories.map((c) => (
            <option key={c} value={c}>
              {capitalize(c)}
            </option>
          ))}
        </Select>
        <Select
          fontWeight={"semibold"}
          rounded={"full"}
          bg="gray.100"
          {...register("time")}
        >
          <option>Any day</option>
          <option>Tomorrow</option>
          <option>This weekend</option>
          <option>Next week</option>
        </Select>
      </HStack>
    </Box>
  );
}
