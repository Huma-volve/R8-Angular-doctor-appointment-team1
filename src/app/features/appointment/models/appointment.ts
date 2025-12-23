export type DayVM = { id: string; label: string; dayNumber: number; dateISO: string; disabled?: boolean };
export type SlotVM = { id: string; label: string; value: string; disabled?: boolean };

export type AppointmentDraft = {
  day?: DayVM;
  slot?: SlotVM;
};

export type DoctorVM = {
  name: string;
  specialty: string;
  avatarUrl: string;
  verified?: boolean;
  stats: { patients: string; experience: string; rating: string; reviews: string };
  about: string;
  address: string;
  mapEmbedUrl: string;
};

export type ReviewVM = {
  id: string;
  userName: string;
  userAvatarUrl: string;
  timeAgo: string;
  rating: number;
  text: string;
};
// doctor.api-types.ts
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: any;
}

export interface ApiSpecialty {
  id: number;
  name: string;
  image: string;
}

export interface ApiDoctor {
  id: number;
  name: string;
  email: string;
  mobile: string | null;
  profile_photo: string | null;
  specialty: ApiSpecialty;
  license_number: string;
  bio: string;
  session_price: number;
  clinic_address: string;
  location: { latitude: number; longitude: number };
  experience_years: number;
}

// doctor.model.ts
export interface DoctorVm {
  id: number;
  name: string;
  specialtyName: string;
  bio: string;
  sessionPrice: number;
  clinicAddress: string;
  experienceYears: number;
  photoUrl: string; // رابط كامل للصورة
}
