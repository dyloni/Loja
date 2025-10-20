export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  hostSince: string;
  responseRate: number;
  isVerified: boolean;
}

export interface Review {
  id: string;
  reviewer: Pick<User, 'name' | 'avatarUrl'>;
  rating: number;
  content: string;
  createdAt: string;
}

export interface Listing {
  id: string;
  host: User;
  title: string;
  description: string;
  propertyType: string;
  address: {
    city: string;
    country: string;
  };
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  houseRules: string[];
  features: string[];
  photos: string[];
  pricePerMonth: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export interface Filters {
  propertyTypes: string[];
  bedrooms: number | null;
  minPrice: number | null;
  maxPrice: number | null;
}