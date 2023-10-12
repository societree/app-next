import { useEffect, useState } from "react";
import { Avatar, Box, FormLabel, Input } from "@chakra-ui/react";
import { data } from "@data/supabase";

export default function AccountAvatar({ url, onUpload }: any) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: any) {
    try {
      const url = await data.getAvatarUrl(path);
      setAvatarUrl(url ? url : null);
    } catch (error: any) {
      console.log("Error downloading image: ", error.message);
    }
  }

  async function uploadAvatar(event: any) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const success = await data.uploadAvatar(filePath, file);
      if (success) onUpload(filePath);
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <Box>
      <Box pos={"relative"} display="flex" justifyContent={"center"}>
        <FormLabel
          htmlFor="single"
          boxShadow={"lg"}
          style={{
            cursor: "pointer",
            borderRadius: "100%",
          }}
        >
          {avatarUrl ? <Avatar size={"xl"} src={avatarUrl} /> : null}
        </FormLabel>
      </Box>
      <Box>
        <Input
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          style={{
            display: "none",
          }}
        />
      </Box>
    </Box>
  );
}
