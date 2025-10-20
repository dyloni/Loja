export interface Address {
  city: string;
  country: string;
}

export interface Reviewer {
  name: string;
  avatarUrl: string;
}

export interface Review {
  id: string;
  reviewer: Reviewer;
  createdAt: string;
  content: string;
}

export interface Host {
  id: string;
  name: string;
  avatarUrl: string;
  isVerified: boolean;
}

export interface Listing {
  id: string;
  title: string;
  address: Address;
  photos: string[];
  pricePerMonth: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  amenities: string[];
  description: string;
  isAvailable: boolean;
  host: Host;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  houseRules: string[];
  features: string[];
  analytics: {
    viewCount: number;
    inquiryCount: number;
  };
  isFeatured?: boolean;
}

export interface User {
  id: string;
  name: string;
  role: 'tenant' | 'landlord';
  avatarUrl: string;
  isVerified: boolean;
  subscriptionStatus?: 'active' | 'inactive';
  subscriptionExpiry?: string;
}

export interface ViewingRequestTenant {
    id: string;
    name: string;
    avatarUrl: string;
}

export interface ViewingRequest {
  id: string;
  propertyId: string;
  tenant: ViewingRequestTenant;
  landlordId: string;
  dateTime: {
    date: string;
    timeSlot: string;
  };
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}
