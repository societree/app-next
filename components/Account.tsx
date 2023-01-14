import { Box, Container, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../shared/auth/supabase";
import { data } from "../shared/data/supabase";
import { User } from "../shared/schemas";
import AccountAvatar from "./AccountAvatar";
import { HiOutlineMail, HiUserGroup } from "react-icons/hi";
import { dateToReadable } from "../utils/dates";

export default function Account({ user }: { user: User }) {
  const [_, setLoading] = useState(true);

  const { setValue, watch } = useForm();

  const { username, avatar_url, full_name, member_since, hosted_workshops } =
    watch();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const user = await auth.getUser();

      if (!user) {
        return;
      }

      const profile = await data.getProfile(user.id);

      if (profile) {
        setValue("username", profile.username);
        setValue("avatar_url", profile.avatar_url);
        setValue("full_name", `${profile.name} ${profile.surname}`);
        setValue("member_since", profile.created_at);
        setValue("hosted_workshops", profile.hosted_workshops);
      }
    } catch (error: any) {
      alert(`Error getting profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [setValue]);

  async function updateProfile({ avatar_url }: any) {
    try {
      setLoading(true);
      const user = await auth.getUser();

      if (!user) {
        return;
      }

      const updates = {
        user_id: user.id,
        avatar_url: avatar_url,
      };

      await data.updateProfile(updates);
    } catch (error: any) {
      alert(`Error updating profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  return (
    <Box mb="20">
      <Heading size={"2xl"}>
        {full_name} (@{username})
      </Heading>
    </Box>
  );
}
