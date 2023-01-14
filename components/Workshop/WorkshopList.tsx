import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Img,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import WorkshopCard from "./WorkshopListCard";
import WorkshopListFilter from "./WorkshopListFilter";
import { data } from "../../shared/data/supabase";
import { useEffect, useState } from "react";
import {
  FilterProps,
  DefaultFilterProps,
  TimeFilter,
} from "../../shared/schemas";
import { useAsync } from "@react-hookz/web";
import { IoMdCloseCircle, IoMdCloseCircleOutline } from "react-icons/io";

interface IProps {
  hideFilter?: boolean;
}

export default function WorkshopList({ hideFilter }: IProps) {
  const [page, setPage] = React.useState(1);
  const [filter, setFilter] = useState<FilterProps>(DefaultFilterProps);

  const [workshops, workshopsActions] = useAsync(() =>
    data.filterAvailableWorkshops(filter, page)
  );

  useEffect(() => {
    workshopsActions.execute();
  }, [filter, workshopsActions, page]);

  const filterActive = () => {
    return Boolean(
      filter.category || filter.time !== TimeFilter.ANY_TIME || filter.text
    );
  };

  const showLoadMore = () => {
    return (
      workshops.status !== "loading" &&
      workshops.result?.count !== workshops.result?.workshops.length
    );
  };
  return (
    <Box>
      <Container maxW={"container.md"} my="20" minH={"100vh"}>
        {!hideFilter ? (
          <WorkshopListFilter
            activeFilter={filter}
            onFilterChange={setFilter}
          />
        ) : null}

        <Center my="12" display={{ base: "none", sm: "flex" }}>
          <Text
            fontWeight={"normal"}
            fontSize={"2xl"}
            display="flex"
            alignItems={"center"}
          >
            <strong style={{ paddingRight: "5px" }}>
              {workshops.result?.workshops.length}
            </strong>
            workshops in
            <strong style={{ paddingLeft: "5px" }}>
              {filter.category || "all categories"}
            </strong>
            {filter.category !== "" && (
              <IoMdCloseCircle
                fontSize={"30px"}
                style={{
                  display: "inline",
                  paddingRight: "5px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setFilter((prev) => {
                    return {
                      ...prev,
                      category: "",
                    };
                  })
                }
              />
            )}
            ,
            <strong style={{ paddingLeft: "5px", paddingRight: "5px" }}>
              {filter.time.toLowerCase()}.
            </strong>
            {filter.time !== TimeFilter.ANY_TIME && (
              <IoMdCloseCircle
                fontSize={"30px"}
                style={{
                  display: "inline",
                  paddingRight: "5px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setFilter((prev) => {
                    return {
                      ...prev,
                      time: TimeFilter.ANY_TIME,
                    };
                  })
                }
              />
            )}
            {filterActive() && (
              <Flex alignItems={"center"} color="gray.500">
                <Text style={{ paddingLeft: "10px", paddingRight: "5px" }}>
                  Clear all filters
                </Text>
                <IoMdCloseCircleOutline
                  fontSize={"30px"}
                  style={{
                    display: "inline",
                    paddingRight: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => setFilter(DefaultFilterProps)}
                />
              </Flex>
            )}
          </Text>
        </Center>

        <Stack spacing={2} mt="10">
          {workshops.result?.workshops.map((w) => (
            <WorkshopCard key={w.id} workshop={w} />
          ))}
        </Stack>

        {!workshops.result?.workshops.length &&
        workshops.status === "success" ? (
          <Center mt="40">
            <Heading
              size="lg"
              p="10"
              fontWeight={"normal"}
              textAlign={"center"}
            >
              Wow, this is awkward... We don’t have any workshops that match
              your search right now. Why not change things up a bit and try
              removing some filters?
            </Heading>
          </Center>
        ) : null}
      </Container>

      {workshops.status === "loading" ? (
        <Flex justifyContent={"center"} py="20">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="black"
            size="xl"
          />
        </Flex>
      ) : null}

      {showLoadMore() && (
        <Box mb="36">
          <Center mb="7" color="gray.500" fontWeight={"semibold"}>
            <Text>
              Showing {workshops.result?.workshops.length} out of{" "}
              {workshops.result?.count}
            </Text>
          </Center>

          <Center>
            <Button
              color={"white"}
              size="lg"
              bg="black"
              border="1px solid white"
              rounded={"full"}
              transition={"all .3s ease-out"}
              px="7"
              py="7"
              fontWeight={"light"}
              _hover={{
                bg: "transparent",
                color: "black",
                border: "1px solid black",
              }}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Load more
            </Button>
          </Center>
        </Box>
      )}

      <Box bg="blue.800" color={"white"} py="20">
        <Center mb="10">
          <Img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjAgMTBhMjguNjUgMjguNjUgMCAwMC0yOC43IDI4LjY0djUwLjQyaDU3LjI5VjM4LjY0QTI4LjY0IDI4LjY0IDAgMDA2MCAxMHoiIGZpbGw9IiNGRjQ2MzIiLz48cGF0aCBkPSJNNDAuMjggODlWMzguNjRhMTkuNjcgMTkuNjcgMCAwMTM5LjM0IDBWODlINDAuMjh6IiBmaWxsPSIjMkQ0NkI5Ii8+PHBhdGggZD0iTTkyIDg5LjA2SDI3Ljg5djEyLjY5SDkyVjg5LjA2eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik05My44MiA5Ny45OUgyNi4wN1YxMTBoNjcuNzVWOTcuOTl6IiBmaWxsPSIjMkQ0NkI5Ii8+PHBhdGggZD0iTTQwLjI4IDM3LjU3djE2LjY3Yy42Ni4xMTQgMS4zMy4xNzQgMiAuMThhMTMuMTYgMTMuMTYgMCAwMDEzLjE5LTEzLjE2IDEyLjkgMTIuOSAwIDAwLTEyLjE2LTEzLjExIDE3LjggMTcuOCAwIDAwLTMuMDMgOS40MnpNODIuMyA3OC4xM2M0LjE3LjMyIDcuNjYtMS4yNyAxMi0yIDQtLjcyIDguMTUgMCAxMi4yMy0uMTNhNi44IDYuOCAwIDAwMy4yNS0uNjIgMS45MzUgMS45MzUgMCAwMDEtMS4zMyAyLjE0OCAyLjE0OCAwIDAwLTEuNTktMi4wNmMtLjg4LS4zMS0xLjg0LS4zMS0yLjc1LS41Ni00LjQ3LTEuMjItMy4zOS02LTQuMTgtOS4zOWE3Ljc4MyA3Ljc4MyAwIDAwLTYuODctNS42MiAxMC42MSAxMC42MSAwIDAwLTguMzkgMy41Yy0xIDEuMDktMS44MSAyLjM0LTIuODYgMy4zOWE2LjcxIDYuNzEgMCAwMS00LjE4IDIuMDZjLTEuOCAwLTMuMzQtMS4yOC01LjIyLS44OC0yLjE0LjQ1LTMuNTEgMi4yMi01IDMuNjNBOS4zMzggOS4zMzggMCAwMTY3IDY5Ljg5Yy0xIC40My0yLjQxLjc1LTMuMDggMS42N0ExLjgyIDEuODIgMCAwMDY0IDc0Yy43NC41NyAyLjM0LjU5IDMuMjUuNThhMjkuMDA2IDI5LjAwNiAwIDAxNC4zNy4wN2MzIC40MyA1LjM0IDIuMzcgOC4yNyAzLjExLjc5MS4xOTIgMS41OTcuMzE2IDIuNDEuMzd6TTk4LjA2IDI4LjI0YTM2Ljg4IDM2Ljg4IDAgMDEtMy42NiA4LjE5IDQwLjI1NiA0MC4yNTYgMCAwMS01LjQgNy4xNCAzMy4xNiAzMy4xNiAwIDAxLTcgNS42MSAyMy42MiAyMy42MiAwIDAxLTguNDIgMy4wOC4xNS4xNSAwIDAxLS4xNy0uMTMuMTUuMTUgMCAwMS4xMi0uMTcgMjUuNCAyNS40IDAgMDA4LjEzLTMuMzRBMzUuMTU2IDM1LjE1NiAwIDAwODguMzggNDNhNDIuNTggNDIuNTggMCAwMDUuNDEtNyA0NC42NzIgNDQuNjcyIDAgMDA0LTcuOS4xNS4xNSAwIDAxLjE5LS4wOS4xNC4xNCAwIDAxLjA4LjIzek04My42OCA1Mi43NmEyMC44NjQgMjAuODY0IDAgMDA0LjA3LS45MiAyOC43NjMgMjguNzYzIDAgMDAzLjg2LTEuNTljMS4yNi0uNjEgMi40Ni0xLjMzIDMuNjgtMkw5OC45MSA0NmEuMTYuMTYgMCAwMS4yMSAwIC4xNi4xNiAwIDAxMCAuMmMtMS4xMS44OC0yLjI2IDEuNzEtMy40NCAyLjVBMzMuOTAzIDMzLjkwMyAwIDAxOTIgNTFjLTEuMjgxLjY1LTIuNjIgMS4xOC00IDEuNTgtMS4zOS4zODEtMi44MjkuNTYtNC4yNy41M2EuMTQuMTQgMCAwMS0uMTQtLjE2LjE1LjE1IDAgMDEuMDktLjE5eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==" />
        </Center>

        <Center my="6">
          <Heading size={"2xl"} fontWeight={"semibold"}>
            Got a question?
          </Heading>
        </Center>
        <Center>
          <Heading size={"lg"} fontWeight="thin" textAlign={"center"} w="50%">
            Head over to the FAQ or the Contact Us.
          </Heading>
        </Center>

        <Center mt="12">
          <Button
            color={"white"}
            size="lg"
            border="2px solid white"
            rounded={"full"}
            px="7"
            bg="transparent"
            py="7"
            fontWeight={"light"}
            mr="4"
            transition={"all .3s ease-out"}
            _hover={{
              bg: "white",
              color: "blue.800",
              border: "2px solid white",
            }}
          >
            Email us
          </Button>

          <Button
            color={"white"}
            size="lg"
            bg="transparent"
            border="2px solid white"
            rounded={"full"}
            px="7"
            transition={"all .3s ease-out"}
            py="7"
            fontWeight={"light"}
            _hover={{
              bg: "white",
              color: "blue.800",
              border: "2px solid white",
            }}
          >
            Read our FAQ
          </Button>
        </Center>
      </Box>
    </Box>
  );
}
