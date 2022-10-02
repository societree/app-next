import { atom } from "recoil";

/**
 * Authentication modal open state
 */
export const authenticationModalState = atom({
  key: "authModalState",
  default: false,
});
