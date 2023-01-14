import { DataAccessor } from "./data";
import { supabase } from "../../supabase/supabaseClient";
import {
  Workshop,
  Slot,
  Booking,
  BookingDetails,
  Profile,
  FilterProps,
  TimeFilter,
} from "../schemas";
import {
  dateAsISOString,
  endOfThisWeekAsISOString,
  startOfThisWeekendAsISOString,
  endOfThisWeekendAsISOString,
  startOfNextWeekAsISOString,
  endOfNextWeekAsISOString,
} from "../../utils/dates";

/**
 * A supabase implementation of the DataAccessor interface
 */
class SupabaseDataAccessor implements DataAccessor {
  async createProfile(profile: Profile): Promise<Profile> {
    const { data, error } = await supabase.from("profiles").insert([profile]);
    if (error) throw error;
    if (data) {
      return data[0] as Profile;
    } else {
      throw Error(
        `Failed to create a user profile: ${JSON.stringify(profile)}`
      );
    }
  }

  async updateProfile(profile: Profile): Promise<Profile> {
    const { data, error } = await supabase.from("profiles").upsert([profile]);
    if (error) throw error;
    if (data) {
      return data[0] as Profile;
    } else {
      throw Error(
        `Failed to update a user profile: ${JSON.stringify(profile)}`
      );
    }
  }

  async getProfile(id: string): Promise<Profile> {
    let { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", id)
      .single();
    if (error) throw error;
    if (data) {
      return data;
    } else {
      throw Error(`Failed to find a profile with the user_id: ${id}`);
    }
  }

  async createWorkshop(workshop: Workshop): Promise<Workshop> {
    const { data, error } = await supabase.from("workshops").insert([workshop]);
    if (error) throw error;
    if (data) {
      await supabase.rpc("increment_hosted_workshops", {
        id: workshop.user_id,
      });
      return data[0] as Workshop;
    } else {
      throw Error(`Failed to create a workshop: ${JSON.stringify(workshop)}`);
    }
  }

  async filterAvailableWorkshops(
    filters: FilterProps,
    page = 1
  ): Promise<{ workshops: Workshop[]; count: number | null } | null> {
    const query = supabase
      .from("workshops")
      .select("*, slots!inner(date, at_capacity)", { count: "exact" })
      .eq("slots.at_capacity", false)
      .order("created_at", { ascending: false });

    if (filters.category !== "") {
      query.eq("category", filters.category);
    }

    if (filters.text !== "") {
      query.ilike("name", `%${filters.text}%`);
    }

    switch (filters.time) {
      case TimeFilter.THIS_WEEK:
        query.gte("slots.date", dateAsISOString());
        query.lte("slots.date", endOfThisWeekAsISOString());
        break;
      case TimeFilter.THIS_WEEKEND:
        query.gte("slots.date", startOfThisWeekendAsISOString());
        query.lte("slots.date", endOfThisWeekendAsISOString());
        break;
      case TimeFilter.NEXT_WEEK:
        query.gte("slots.date", startOfNextWeekAsISOString());
        query.lte("slots.date", endOfNextWeekAsISOString());
        break;
      default:
        query.gte("slots.date", dateAsISOString());
        break;
    }

    const {
      data: filteredData,
      error: error,
      count,
    } = await query.range(0, page * 6);

    if (error) throw error;

    return filteredData ? { workshops: filteredData, count } : null;
  }

  async getWorkshopsByCategory(category: string): Promise<Workshop[]> {
    const { data: workshops, error } = await supabase
      .from("workshops")
      .select("*")
      .eq("category", category);
    if (error) throw error;
    return workshops;
  }

  async getWorkshop(id: string): Promise<Workshop> {
    const { data: workshop, error: error } = await supabase
      .from("workshops")
      .select("*")
      .eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    if (workshop) {
      return workshop[0] as Workshop;
    } else {
      throw Error(`Failed to find a workshop with id: ${id}`);
    }
  }

  async getWorkshopSlots(id: string): Promise<Slot[]> {
    const { data: slots, error: error } = await supabase
      .from("slots")
      .select("*")
      .eq("workshop_id", id);
    if (error) throw error;
    return slots;
  }

  async getWorkshopBookings(id: string): Promise<Booking[]> {
    const { data: bookings, error: error } = await supabase
      .from("bookings")
      .select("*")
      .eq("workshop_id", id);
    if (error) throw error;
    return bookings;
  }

  async getUserWorkshops(user_id: string): Promise<Workshop[]> {
    const { data: workshopData, error } = await supabase
      .from("workshops")
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      throw new Error(error.message);
    }

    return workshopData;
  }

  async createSlots(slots: Slot[]): Promise<boolean> {
    const { error: error } = await supabase.from("slots").insert([...slots]);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }

  async getUserBookings(user_id: string): Promise<BookingDetails[]> {
    const { data: bookings, error: error } = await supabase
      .from("bookings")
      .select(
        `
      id,
      user_id,
      workshop_id,
      workshops:workshop_id(name),
      slots:slot_id(date, start_time, end_time)
    `
      )
      .eq(`user_id`, user_id);

    if (error) {
      throw new Error(error.message);
    }

    return bookings;
  }

  async bookSlot(
    workshop_id: string,
    slot_id: string,
    user_id: string
  ): Promise<boolean> {
    const { data, error } = await supabase.rpc("book_slot", {
      p_workshop_id: workshop_id,
      p_slot_id: slot_id,
      p_user_id: user_id,
    });
    if (error) throw error;

    if (data && data[0]) {
      if (!data[0].success) {
        throw Error(data[0].message);
      } else {
        return true;
      }
    }

    return false;
  }

  async cancelBooking(id: string): Promise<boolean> {
    const { data, error } = await supabase.rpc("cancel_booking", {
      p_booking_id: id,
    });
    if (error) throw error;

    return data ? true : false;
  }

  async getAvatarUrl(path: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from("avatars")
      .getPublicUrl(path);
    if (error) throw error;
    if (data) {
      return data?.publicURL;
    } else {
      throw Error(`Failed to find an avatar on the given path: ${path}`);
    }
  }

  async uploadAvatar(path: string, file: string): Promise<boolean> {
    let { error } = await supabase.storage.from("avatars").upload(path, file);
    if (error) throw error;
    return true;
  }
}

export const data = new SupabaseDataAccessor();
