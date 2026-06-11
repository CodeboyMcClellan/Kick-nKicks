# Kick'n Kicks

Sneaker marketplace built with React Native (Expo), Supabase, Stripe, React Navigation, and NativeWind.

## Features

- Buy & sell sneakers with search filters
- Shoe restoration quotes and service tiers
- Cobbler locator map
- TikTok-style vertical video feed
- In-app messaging
- Stripe checkout
- Seller dashboard & sustainability impact tracker

## Brand

Primary color: `#E63946`

## Setup

```bash
cd kickn-kicks
npm install
cp .env.example .env
# Add your Supabase and Stripe keys to .env
npm start
```

### Environment variables

| Variable | Description |
|----------|-------------|
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |

Without Supabase configured, use **Continue as Demo** on the auth screen.

## Project structure

```
src/
├── components/     # Reusable UI (Button, ListingCard, SearchBar, …)
├── constants/      # Colors, mock data
├── context/        # AuthContext
├── hooks/          # useAuth
├── lib/            # supabase.ts, stripe.ts
├── navigation/     # RootNavigator, TabNavigator
├── screens/        # All 14 screens
├── types/          # TypeScript types & navigation params
└── utils/          # format helpers
```

## Screens

| Screen | Route |
|--------|-------|
| Home | `HomeTab` |
| Search | `SearchTab` |
| Listing Detail | `ListingDetail` |
| Sell | `SellTab` |
| Restore | `Restore` |
| Cobbler Map | `CobblerMap` |
| Video Feed | `VideosTab` |
| Chat | `Chat` |
| Profile | `ProfileTab` |
| Checkout | `Checkout` |
| Order Tracking | `OrderTracking` |
| Seller Dashboard | `SellerDashboard` |
| Sustainability | `Sustainability` |
| Auth | `Auth` |

## Next steps

1. Create Supabase tables: `listings`, `orders`, `messages`, `profiles`, `restore_requests`
2. Wire Stripe Payment Sheet in `CheckoutScreen`
3. Enable Google/Apple OAuth in Supabase dashboard
4. Replace mock data with Supabase queries
5. Add `react-native-maps` API keys for production builds
# Kick-nKicks
