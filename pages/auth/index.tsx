import { Box } from "@chakra-ui/react";
import React from "react";
import AuthenticationForm from "../../components/AuthenticationForm";
import { auth } from "../../shared/auth/supabase";

export default function Authentication() {
  return (
    <Box h="100vh" bg="linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)">
      <AuthenticationForm />
    </Box>
  );
}

export async function getServerSideProps({ req }: any) {
  const user = await auth.getUserByCookie(req);

  if (user) {
    return { props: { user }, redirect: { destination: "/workshops" } };
  }

  return { props: {} };
}
