import { User } from "@supabase/supabase-js";
import React from "react";
import { Booking, Slot, Workshop } from "../../shared/schemas";
import { data } from "../../shared/data/supabase";
import { auth } from "../../shared/auth/supabase";
import WorkshopListing from "../../components/Workshop/WorkshopListing";
import Layout from "@/components/Layout/Layout";

export default function Wid({
  workshop,
  slots,
  bookings,
  user,
}: {
  workshop: Workshop;
  slots: Slot[];
  bookings: Booking[];
  user: User;
}) {
  return (
    <Layout>
      <WorkshopListing workshop={workshop} slots={slots} bookings={bookings} />
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const id = context.query.wid;

  const user = await auth.getUserByCookie(context.req);

  try {
    const workshop = await data.getWorkshop(id);
    const slots = await data.getWorkshopSlots(id);
    const bookings = await data.getWorkshopBookings(id);

    return { props: { workshop, slots, bookings, user } };
  } catch (error) {
    console.log(JSON.stringify(error));

    return { props: {}, redirect: { destination: "/workshops" } };
  }
}
