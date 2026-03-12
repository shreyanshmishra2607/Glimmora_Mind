export interface Therapist {
  id: string;
  name: string;
  avatarUrl?: string | null;
  specialization: string[];
  languages: string[];
  rating: number;
  reviewCount: number;
  bio: string;
  availableSlots?: string[]; // ISO date strings for next 7 days
}

export interface TherapistFilters {
  specialization?: string;
  language?: string;
  minRating?: number;
}
