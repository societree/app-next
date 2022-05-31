import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../utils/supabaseClient";
import { OAuthButtonGroup } from "./0AuthButtonGroup";
import { Logo } from "./Logo";
import { useRouter } from "next/router";

enum Mode {
  LOGIN,
  SIGNUP,
}

export default function AuthenticationForm() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const [mode, setMode] = React.useState<Mode>(Mode.LOGIN);

  const logIn = async (data: any) => {
    try {
      const { error } = await supabase.auth.signIn({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      router.push("/workshops");
    } catch (error) {
      console.warn(error);
    }
  };

  const signUp = async (data: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      router.push("/workshops");
    } catch (error) {
      console.warn(error);
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    mode === Mode.LOGIN ? logIn(data) : signUp(data);

    setIsLoading(false);
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "7", sm: "8" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Logo />
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
                {mode === Mode.LOGIN
                  ? "Log in to your account"
                  : "Create an account "}
              </Heading>
              <Heading
                size={useBreakpointValue({ base: "xs", md: "sm" })}
                color="gray.600"
              >
                OR
              </Heading>
              <HStack spacing="1" justify="center">
                <Text
                  color="muted"
                  cursor={"pointer"}
                  textDecoration={"underline"}
                  onClick={() => {
                    setMode((oldMode) => {
                      if (oldMode === Mode.LOGIN) {
                        return Mode.SIGNUP;
                      }
                      return Mode.LOGIN;
                    });
                  }}
                >
                  {mode === Mode.LOGIN ? "Sign up" : "Login"}
                </Text>
              </HStack>
            </Stack>
          </Stack>
          <Box
            py={{ base: "12", sm: "8" }}
            px={{ base: "8", sm: "10" }}
            bg={useBreakpointValue({ base: "white", sm: "white" })}
            boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
            borderRadius={{ base: "2xl", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="3">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    focusBorderColor="brand.700"
                    boxShadow={"sm"}
                    borderRadius="xl"
                    size="lg"
                    placeholder="robinson@crusoe.com"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                    focusBorderColor="brand.700"
                    boxShadow={"sm"}
                    borderRadius="xl"
                    size="lg"
                    placeholder="stuckOnAnIsland1774"
                  />
                </FormControl>
              </Stack>
              <Stack spacing="6">
                <Button
                  color={"white"}
                  variant="contained"
                  bg="brand.700"
                  type="submit"
                  isLoading={isLoading}
                  _hover={{ backgroundColor: "#5c56eeF0" }}
                  boxShadow="lg"
                >
                  {mode === Mode.LOGIN ? "Sign in" : "Sign up"}
                </Button>
                <HStack>
                  <Divider />
                  <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Container>
  );
}
