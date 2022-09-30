import { Stack } from "@chakra-ui/react";
import React from "react";
import { Workshop } from "../../shared/schemas";
import ResponsiveContainer from "../Layout/ResponsiveContainer";
import WorkshopCard from "./WorkshopListCard";
import WorkshopListFilter from "./WorkshopListFilter";

interface IProps {
  workshops: Workshop[];
  hideFilter?: boolean;
}

export default function WorkshopList({ workshops, hideFilter }: IProps) {
  return (
    <ResponsiveContainer>
      {!hideFilter ? (
        <WorkshopListFilter onFilterChange={(data) => console.log(data)} />
      ) : null}
      <Stack overflow="scroll" spacing={0}>
        {workshops?.map((w) => (
          <WorkshopCard key={w.id} workshop={w} />
        ))}
      </Stack>
    </ResponsiveContainer>
  );
}
