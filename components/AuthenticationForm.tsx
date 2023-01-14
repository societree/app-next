"use client";

import {
  Box,
  Button,
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
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { OAuthButtonGroup } from "./0AuthButtonGroup";
import { useRouter } from "next/navigation";
import { auth } from "../shared/auth/supabase";
import { data } from "../shared/data/supabase";
import { authenticationModalState } from "@/shared/recoil/atoms";
import { useRecoilState } from "recoil";

interface IProps {
  onSuccess(): void;
}

enum Mode {
  LOGIN,
  SIGNUP,
}

export default function AuthenticationForm({ onSuccess }: IProps) {
  const [authModalState] = useRecoilState(authenticationModalState);

  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const [mode, setMode] = React.useState<Mode>(
    authModalState.signUp ? Mode.SIGNUP : Mode.LOGIN
  );
  const toast = useToast();

  /**
   * Get the path to be redirected to after successful authentication
   * Remain on listing route after authentication if user was viewing a listing,
   * otherwise redirect to workshop list route
   *
   * @returns redirect route
   */
  const getRedirectPath = () => {
    return router.pathname === "/workshops/[wid]"
      ? router.asPath
      : "/workshops";
  };

  const logIn = async (formData: any) => {
    setIsLoading(true);
    try {
      const success = await auth.signIn(formData.email, formData.password);

      if (success) {
        onSuccess();
        showToast("Login Successful");

        router.push(getRedirectPath());
      }
    } catch (error: any) {
      showToast("Login Unsuccessful", error.message, false);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (formData: any) => {
    setIsLoading(true);

    try {
      const user = await auth.signUp(formData.email, formData.password);

      if (user) {
        const values = {
          user_id: user.id,
          username: formData.username,
          name: formData.name,
          surname: formData.surname,
          dob: formData.dob,
        };

        await data.createProfile(values);
      }

      showToast("Sign Up Successful");
      onSuccess();
      router.push(getRedirectPath());
    } catch (error: any) {
      showToast("Sign Up Unsuccessful", error.message, false);
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (
    title: any,
    description: any = null,
    success: boolean = true
  ) => {
    toast({
      title: title,
      description: description,
      status: success ? "success" : "error",
      duration: 4000,
      isClosable: true,
    });
  };

  const onSubmit = async (formData: any) => {
    mode === Mode.LOGIN ? logIn(formData) : signUp(formData);
  };

  const makeFormField = (
    id: string,
    type: string,
    title: string,
    placeholder: string
  ): ReactElement => {
    return (
      <FormControl>
        <FormLabel fontSize={"sm"} htmlFor={id}>
          {title}
        </FormLabel>
        <Input
          {...register(id)}
          id={id}
          type={type}
          isRequired={true}
          placeholder={placeholder}
          p="4"
        />
      </FormControl>
    );
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", sm: "10" }}
      px={{ base: "0", sm: "8" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading
                size={useBreakpointValue({ base: "xs", md: "sm" })}
                pt="10"
              >
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
            py={{ base: "4", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={useBreakpointValue({ base: "white", sm: "white" })}
            boxShadow={{ base: "none" }}
            borderRadius={{ base: "2xl", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="3">
                {mode === Mode.SIGNUP
                  ? makeFormField("name", "text", "Name", "Name")
                  : null}
                {mode === Mode.SIGNUP
                  ? makeFormField("surname", "text", "Surname", "Surname")
                  : null}
                {mode === Mode.SIGNUP
                  ? makeFormField("dob", "date", "Date of Birth", "01/01/2000")
                  : null}
                {mode === Mode.SIGNUP
                  ? makeFormField("username", "text", "Username", "luckyHelper")
                  : null}
                {makeFormField(
                  "email",
                  "email",
                  "Email",
                  "robinson@crusoe.com"
                )}
                {makeFormField(
                  "password",
                  "password",
                  "Password",
                  "stuckOnAnIsland1774"
                )}
              </Stack>
              <Stack spacing="6">
                <Button
                  colorScheme={"green"}
                  type="submit"
                  isLoading={isLoading}
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
