import { atom } from "recoil";
import { DefaultFilterProps } from "../schemas";

/**
 * Authentication modal open state
 */
export const authenticationModalState = atom({
  key: "authModalState",
  default: { open: false, signUp: false },
});

export const globalSearchState = atom({
  key: "globalSearchState",
  default: DefaultFilterProps,
});
