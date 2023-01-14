import BookingList from "@/components/Booking/BookingList";
import Layout from "@/components/Layout/Layout";
import { data } from "@/shared/data/supabase";
import { BookingDetails } from "@/shared/schemas";
import { Box, Container } from "@chakra-ui/react";
import { User } from "@supabase/supabase-js";
import React from "react";
import Account from "../../components/Account";
import { auth } from "../../shared/auth/supabase";

export default function Dashboard({
  user,
  bookings,
}: {
  user: User;
  bookings: BookingDetails[];
}) {
  return (
    <Layout>
      <Box bg="black" w="full" h="50vh" p="10">
        {<Account user={user} />}
      </Box>

      <BookingList bookings={bookings} />
    </Layout>
  );
}

export async function getServerSideProps({ req }: any) {
  const user = await auth.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/" } };
  }

  const bookings = await data.getUserBookings(user.id);

  return {
    props: { user, bookings },
  };
}
