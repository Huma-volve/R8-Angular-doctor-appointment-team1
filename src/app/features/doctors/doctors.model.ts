export interface DoctorsModel {
  id: number;
  name: string;
  email: string;
  mobile: string | null;
  profile_photo: string;
  specialty: Specialty;
  license_number: string;
  bio: string;
  session_price: number;
  clinic_address: string;
  location: Location;
  experience_years: number;
}

export interface Specialty {
  id: number;
  name: string;
  image: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}
