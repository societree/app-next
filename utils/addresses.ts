import { Workshop } from "../shared/schemas";

/**
 * Returns a readable address given the workshop
 * @param workshop a workshop for which the address is to be built
 * @returns a built readable address
 */
export function workshopToReadableAddress(workshop: Workshop): string {
  return `${workshop.house} ${workshop.street}, ${workshop.postcode}`;
}