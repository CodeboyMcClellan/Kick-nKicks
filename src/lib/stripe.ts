/**
 * Stripe publishable key for @stripe/stripe-react-native.
 * Initialize StripeProvider in App.tsx with this key.
 */
export const STRIPE_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';

export const isStripeConfigured =
  Boolean(STRIPE_PUBLISHABLE_KEY && !STRIPE_PUBLISHABLE_KEY.includes('pk_test_your'));

/**
 * Placeholder — wire to your Supabase Edge Function or backend
 * that creates a PaymentIntent and returns the client secret.
 */
export async function createPaymentIntent(
  amountCents: number,
  _listingId?: string,
): Promise<{ clientSecret: string } | null> {
  if (!isStripeConfigured) return null;
  // TODO: POST to your API, e.g. /api/create-payment-intent
  console.warn('[Stripe] createPaymentIntent stub — amount:', amountCents);
  return { clientSecret: 'pi_stub_secret' };
}
