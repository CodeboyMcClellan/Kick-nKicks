import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// ——— Domain types ———

export type ListingCondition = 'DS' | 'VNDS' | 'GC' | 'Fair' | 'Poor';

export type ShoeCondition = 'deadstock' | 'lightly_worn' | 'used' | 'beaters';

export interface Listing {
  id: string;
  title: string;
  brand: string;
  size: string;
  condition: ListingCondition;
  price: number;
  imageUrl: string;
  sellerId: string;
  sellerName: string;
  trending?: boolean;
  description?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  rating: number;
  totalSales: number;
  memberSince: string;
}

export interface VideoPost {
  id: string;
  userId: string;
  username: string;
  caption: string;
  videoUrl: string;
  likes: number;
}

export interface Cobbler {
  id: string;
  name: string;
  rating: number;
  latitude: number;
  longitude: number;
  address: string;
  services: string[];
}

export interface Order {
  id: string;
  listingTitle: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  createdAt: string;
  trackingNumber?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
  isMine: boolean;
}

export interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface RestoreQuote {
  tierId: string;
  tierName: string;
  estimatedPriceLow: number;
  estimatedPriceHigh: number;
  estimatedDays: number;
}

export type RestorationServiceType = 'clean' | 'repaint' | 'sole_swap' | 'reglue' | 'custom';

export interface RestorationService {
  id: RestorationServiceType;
  name: string;
  description: string;
  icon: string;
  priceLow: number;
  priceHigh: number;
}

export interface SustainabilityStats {
  shoesSaved: number;
  co2KgAvoided: number;
  restoresCompleted: number;
}

export type ListingFilters = {
  brand?: string;
  condition?: ShoeCondition;
  minPrice?: number;
  maxPrice?: number;
};

// ——— Navigation types ———

export type AuthStackParamList = {
  Auth: undefined;
};

export type RootStackParamList = {
  AuthFlow: undefined;
  MainTabs: undefined;
  ListingDetail: { listingId: string };
  Restore: undefined;
  CobblerMap: undefined;
  Checkout: { listingId?: string };
  OrderTracking: { orderId: string; kind?: 'order' | 'restoration' };
  SellerDashboard: undefined;
  Sustainability: undefined;
  Chat: { conversationId?: string };
  AppStoreScreenshots: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  SellTab: undefined;
  VideosTab: undefined;
  ProfileTab: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
