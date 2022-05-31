import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import HeadingBar from "../../components/HeadingBar";
import Layout from "../../components/Layout";
import WorkshopCard from "../../components/WorkshopCard";
import { Workshop } from "../../shared/schemas";
import { supabase } from "../../utils/supabaseClient";
import { GoSettings } from "react-icons/go";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import Slider from "../../components/Slider";
import { IoMdArrowBack } from "react-icons/io";
import { User } from "@supabase/supabase-js";

export default function Workshops({
  workshops,
  user,
}: {
  workshops: Workshop[];
  user: User;
}) {
  const { register, watch } = useForm();
  const { search } = watch();
  const [isSearching, setIsSearching] = useState(false);
  const [searchedWorkshops, setSearchWorkshops] = useState<Workshop[]>([]);

  const searchWorkshops = useCallback(async (str: string) => {
    let { data: searchData } = await supabase
      .from("workshops")
      .select("*")
      .ilike("name", `%${str}%`);

    if (searchData) {
      setSearchWorkshops(searchData);
    }
  }, []);

  useEffect(() => {
    searchWorkshops(search);
  }, [search, searchWorkshops]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Layout>
      {!isSearching && (
        <HeadingBar>
          <Heading
            fontSize={"md"}
            color={"white"}
            fontWeight="semibold"
            pl={8}
            pb={4}
          >
            Workshops
          </Heading>
        </HeadingBar>
      )}
      <Box pb={2}>
        <Box p={2}>
          <Flex alignItems={"center"} justifyContent="space-between">
            {isSearching && (
              <Flex w="10%" justifyContent={"center"} color="brand.700">
                <IconButton
                  size={"lg"}
                  aria-label="Search database"
                  onClick={() => {
                    setIsSearching(false);
                  }}
                  icon={<IoMdArrowBack />}
                  style={{ fontSize: "25px" }}
                />
              </Flex>
            )}
            <InputGroup display={"flex"} alignItems="center">
              {!isSearching && (
                <InputLeftElement pointerEvents="none">
                  <Search2Icon color="gray.300" />
                </InputLeftElement>
              )}
              <Input
                type="text"
                bg={isSearching ? "gray.100" : "gray.200"}
                placeholder="Search"
                border={"none"}
                {...register("search")}
                onFocus={() => setIsSearching(true)}
                focusBorderColor="transparent"
                boxShadow={"sm"}
                borderRadius="xl"
              />
            </InputGroup>
            {!isSearching && (
              <Flex w="14%" justifyContent={"center"} color="brand.700">
                <IconButton
                  size={"lg"}
                  aria-label="Search database"
                  onClick={onOpen}
                  icon={
                    <GoSettings
                      style={{ transform: "rotate(90deg)", fontSize: "25px" }}
                    />
                  }
                />
              </Flex>
            )}
          </Flex>
        </Box>
        {!isSearching && (
          <Box px={3}>
            <Box mt={2} mb={4}>
              <Heading size={"sm"}>Recent</Heading>
              <Text fontSize={"sm"} color={"gray.500"}>
                Newly added workshops
              </Text>
            </Box>
            <SimpleGrid columns={[1, 2, 3]} spacing={3}>
              {workshops.map((w) => (
                <WorkshopCard key={w.id} workshop={w} />
              ))}
            </SimpleGrid>
          </Box>
        )}
        {isSearching && (
          <Box px={3}>
            <SimpleGrid columns={[1, 2, 3]} spacing={3}>
              {searchedWorkshops.map((w) => (
                <WorkshopCard key={w.id} workshop={w} />
              ))}
            </SimpleGrid>
          </Box>
        )}
        <Slider title="Filter" isOpen={isOpen} onClose={onClose}>
          <Box h="60vh">
            <Box mb={4}>
              <Text fontSize={"sm"} fontWeight={"semibold"}>
                Category
              </Text>
              <Select id="category" defaultValue={""} bg={"white"} mt={4}>
                <option value="bristol">Finance</option>
                <option value="bristol">Legal</option>
                <option value="bristol">Languages</option>
              </Select>
            </Box>
            <Flex>
              <Button size={"lg"} w="35%" mr={3} onClick={onClose}>
                Reset
              </Button>
              <Button
                size={"lg"}
                bg="brand.800"
                color={"white"}
                w="65%"
                onClick={onClose}
              >
                Apply
              </Button>
            </Flex>
          </Box>
        </Slider>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps({ req }: any) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/auth" } };
  }

  const { data: workshops } = await supabase
    .from("workshops")
    .select("*")
    .order("created_at", { ascending: false });

  return {
    props: { user, workshops },
  };
}
