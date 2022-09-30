import ResponsiveContainer from "../Layout/ResponsiveContainer";
import LandingHeading from "./LandingHeading";
import LandingHowItWorks from "./LandingHowItWorks";

export default function Landing() {
  return (
    <ResponsiveContainer>
      <LandingHeading />
      <LandingHowItWorks />
    </ResponsiveContainer>
  );
}
