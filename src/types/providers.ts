
import { ServiceCategory } from "./auth";

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Rating {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface ServiceProvider {
  id: string;
  name: string;
  email: string;
  phone: string;
  categories: ServiceCategory[];
  bio: string;
  availability: TimeSlot[];
  ratings: Rating[];
  averageRating: number;
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  avatar?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}
