import type { ComponentType } from 'react';
import { AuthMockScreen } from './mockScreens/AuthMockScreen';
import { VideoFeedMockScreen } from './mockScreens/VideoFeedMockScreen';
import { ProfileMockScreen } from './mockScreens/ProfileMockScreen';
import { CheckoutMockScreen } from './mockScreens/CheckoutMockScreen';
import { SellerDashboardMockScreen } from './mockScreens/SellerDashboardMockScreen';
import { SustainabilityMockScreen } from './mockScreens/SustainabilityMockScreen';

export interface AppStoreScreenshotConfig {
  id: string;
  filename: string;
  headline: string;
  MockScreen: ComponentType;
}

export const APP_STORE_SCREENSHOTS: AppStoreScreenshotConfig[] = [
  {
    id: 'auth',
    filename: '01-auth.png',
    headline: 'Join the sneaker\nmarketplace with soul',
    MockScreen: AuthMockScreen,
  },
  {
    id: 'video-feed',
    filename: '02-video-feed.png',
    headline: 'Scroll the hype.\nDiscover your next pair.',
    MockScreen: VideoFeedMockScreen,
  },
  {
    id: 'profile',
    filename: '03-profile.png',
    headline: 'Your sneaker identity,\nall in one place',
    MockScreen: ProfileMockScreen,
  },
  {
    id: 'checkout',
    filename: '04-checkout.png',
    headline: 'Secure checkout\nin seconds',
    MockScreen: CheckoutMockScreen,
  },
  {
    id: 'seller-dashboard',
    filename: '05-seller-dashboard.png',
    headline: 'Sell smarter.\nTrack every order.',
    MockScreen: SellerDashboardMockScreen,
  },
  {
    id: 'sustainability',
    filename: '06-sustainability.png',
    headline: 'Every pair saved\nmakes a difference',
    MockScreen: SustainabilityMockScreen,
  },
];

export { AppStoreScreenshot } from './AppStoreScreenshot';
export { CANVAS_WIDTH, CANVAS_HEIGHT, SCREENSHOT_BACKGROUND } from './constants';
