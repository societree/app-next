import { Box } from "@chakra-ui/react";
import LandingHeading from "./LandingHeading";
import LandingHowItWorks from "./LandingHowItWorks";

export default function Landing() {
  return (
    <Box p={{ base: "6", sm: "0" }}>
      <Box pb={{ base: "16", sm: "20" }}>
        <LandingHeading />
      </Box>
      <Box pb={{ base: "16", sm: "10" }}>
        <LandingHowItWorks />
      </Box>
    </Box>
  );
}
