import { User } from "@supabase/supabase-js";
import React from "react";
import Layout from "../../components/Layout/Layout";
import { BookingDetails, Workshop } from "../../shared/schemas";
import { data } from "../../shared/data/supabase";
import { auth } from "../../shared/auth/supabase";
import BookingList from "../../components/Booking/BookingList";
import WorkshopList from "../../components/Workshop/WorkshopList";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import ResponsiveContainer from "../../components/Layout/ResponsiveContainer";

export default function MyBookingsPage({
  workshops,
  bookings,
}: {
  workshops: Workshop[];
  bookings: BookingDetails[];
  user: User;
}) {
  return (
    <Layout>
      <ResponsiveContainer>
        <BookingList bookings={bookings} />
      </ResponsiveContainer>
    </Layout>
  );
}

export async function getServerSideProps({ req }: any) {
  const user = await auth.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/" } };
  }

  try {
    const workshops = await data.getUserWorkshops(user.id);
    const bookings = await data.getUserBookings(user.id);
    return { props: { bookings, workshops, user } };
  } catch (error) {
    console.error(`Error: ${JSON.stringify(error)}`);
    return { props: { user } };
  }
}
