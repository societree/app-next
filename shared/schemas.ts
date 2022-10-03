export interface Booking {
  id?: string;
  created_at?: number;
  workshop_id: string;
  user_id: string;
  slot_id: string;
}

export interface BookingDetails extends Booking {
  workshops: Workshop;
  slots: Slot;
}

export interface Workshop {
  id?: string;
  created_at?: number;
  name: string;
  user_id: string;
  description: string;
  category: string;
  house?: string;
  street?: string;
  postcode?: string;
  city?: string;
  virtual: boolean;
}

export interface Profile {
  created_at?: number;
  user_id: string;
  username?: string;
  name?: string;
  surname?: string;
  hosted_workshops?: number;
  avatar_url?: string;
}

export interface Slot {
  id?: string;
  created_at?: number;
  workshop_id: string;
  date: string;
  start_time: string;
  end_time: string;
  capacity: number;
}

export interface User {
  id: string
  email?: string
  phone?: string
}

export interface Session {
  provider_token?: string | null
  access_token: string
  user: User | null
}