import { atom } from "recoil";

export const authenticationModalIsOpen = atom({
  key: "authModalState",
  default: false,
});
