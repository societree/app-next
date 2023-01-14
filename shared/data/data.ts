import {
  Profile,
  Workshop,
  Slot,
  Booking,
  BookingDetails,
  FilterProps,
} from "../schemas";

export interface DataAccessor {
  /**
   * Creates given user profile
   * @param profile A profile to create
   * @return A created profile
   */
  createProfile(profile: Profile): Promise<Profile>;

  /**
   * Updates given user profile
   * @param profile A profile to be updated
   * @return An updated profile
   */
  updateProfile(profile: Profile): Promise<Profile>;

  /**
   * Returns a profile associated with the given id
   * @param id A profile/user id
   * @return A profile associated with the given id
   */
  getProfile(id: string): Promise<Profile>;

  /**
   * Creates given workshop
   * @param workshop A workshop to create
   * @return A created workshop
   */
  createWorkshop(workshop: Workshop): Promise<Workshop>;

  /**
   * Returns all workshops that have available slots at any point in the future,
   * optionally filtered
   * @param filters A set of additional filters([FilterProps]) to be applied
   * @return A list of matching workshops
   */
  filterAvailableWorkshops(
    filters: FilterProps
  ): Promise<{ workshops: Workshop[]; count: number | null } | null>;

  /**
   * Returns a list of workshops associated with the given category
   * @param category A category name
   * @return A list of matching workshops
   */
  getWorkshopsByCategory(category: string): Promise<Workshop[]>;

  /**
   * Returns a workshop associated with the given id
   * @param id A workshop id
   * @return A workshop associated with the given id
   */
  getWorkshop(id: string): Promise<Workshop>;

  /**
   * Returns a list of workshop slots associated with the given workshop id
   * @param id A workshop id
   * @return A list of matching slots
   */
  getWorkshopSlots(id: string): Promise<Slot[]>;

  /**
   * Returns a list of workshop bookings associated with the given workshop id
   * @param id A workshop id
   * @return A list of matching bookings
   */
  getWorkshopBookings(id: string): Promise<Booking[]>;

  /**
   * Returns all workshops hosted by the given user
   * @param user_id A user id
   * @return A list of matching workshops
   */
  getUserWorkshops(user_id: string): Promise<Workshop[]>;

  /**
   * Creates given slots
   * @param slots A list of slots to be created
   * @return A boolean representing the success of the method
   */
  createSlots(slots: Slot[]): Promise<boolean>;

  /**
   * Returns all bookings a user has made
   * @param user_id A user id
   * @return A list of matching bookings
   */
  getUserBookings(user_id: string): Promise<BookingDetails[]>;

  /**
   * Books a workshop slot for the user
   * @param workshop_id A workshop id
   * @param slot_id A slot id
   * @param user_id A user id
   * @return A boolean representing the success of the method
   */
  bookSlot(
    workshop_id: string,
    slot_id: string,
    user_id: string
  ): Promise<boolean>;

  /**
   * Cancels a booking with a given id
   * @param id A booking id
   * @return A boolean representing the success of the method
   */
  cancelBooking(id: string): Promise<boolean>;

  /**
   * Returns an avatar public URL given the path
   * @param path An avatar path
   * @return The avatar public URL
   */
  getAvatarUrl(path: string): Promise<string>;

  /**
   * Uploads an avatar given the path and the file body
   * @param path An avatar path
   * @param file A file body
   * @return A boolean representing the success of the method
   */
  uploadAvatar(path: string, file: string): Promise<boolean>;
}
