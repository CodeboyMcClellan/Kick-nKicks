import { supabase, isSupabaseConfigured } from './supabase';
import type { Listing } from '../types';

export type DbListing = {
  id: string;
  seller_id: string | null;
  brand: string | null;
  model: string | null;
  size: number | null;
  condition: string | null;
  price: number | null;
  description: string | null;
  colorway: string | null;
  photos: string[] | null;
  is_active: boolean | null;
  views: number | null;
  created_at: string | null;
  profiles?: { username: string | null; full_name: string | null } | null;
};

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400';

export function mapDbListing(row: DbListing): Listing {
  const brand = row.brand ?? 'Unknown';
  const model = row.model ?? 'Sneaker';

  return {
    id: row.id,
    title: row.colorway ? `${model} — ${row.colorway}` : model,
    brand,
    size: row.size != null ? String(row.size) : '—',
    condition: (row.condition ?? 'GC') as Listing['condition'],
    price: Number(row.price ?? 0),
    imageUrl: row.photos?.[0] ?? PLACEHOLDER_IMAGE,
    sellerId: row.seller_id ?? '',
    sellerName: row.profiles?.username ?? row.profiles?.full_name ?? 'Seller',
    description: row.description ?? undefined,
  };
}

export async function fetchListings(options?: { brand?: string; search?: string }) {
  if (!isSupabaseConfigured) {
    return { data: [] as Listing[], error: new Error('Supabase is not configured') };
  }

  let query = supabase
    .from('listings')
    .select('*, profiles:seller_id(username, full_name)')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (options?.brand) {
    query = query.eq('brand', options.brand);
  }

  const { data, error } = await query;

  if (error) {
    return { data: [] as Listing[], error };
  }

  let listings = (data as DbListing[]).map(mapDbListing);

  if (options?.search) {
    const q = options.search.toLowerCase();
    listings = listings.filter(
      (listing) =>
        listing.title.toLowerCase().includes(q) ||
        listing.brand.toLowerCase().includes(q) ||
        listing.description?.toLowerCase().includes(q),
    );
  }

  return { data: listings, error: null };
}

export async function fetchListingById(id: string) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new Error('Supabase is not configured') };
  }

  const { data, error } = await supabase
    .from('listings')
    .select('*, profiles:seller_id(username, full_name)')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) {
    return { data: null, error: error ?? new Error('Listing not found') };
  }

  return { data: mapDbListing(data as DbListing), error: null };
}

const LISTING_STORAGE_BUCKET = 'listing-photos';

async function uploadListingPhoto(
  uri: string,
  userId: string,
  index: number,
): Promise<string | null> {
  const ext = uri.split('.').pop()?.split('?')[0]?.toLowerCase() ?? 'jpg';
  const contentType = ext === 'png' ? 'image/png' : 'image/jpeg';
  const path = `${userId}/${Date.now()}-${index}.${ext}`;

  const response = await fetch(uri);
  const arrayBuffer = await response.arrayBuffer();

  const { error } = await supabase.storage.from(LISTING_STORAGE_BUCKET).upload(path, arrayBuffer, {
    contentType,
    upsert: false,
  });

  if (error) {
    console.warn('[Listings] photo upload failed:', error.message);
    return null;
  }

  const { data } = supabase.storage.from(LISTING_STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadListingPhotos(photoUris: string[], userId: string) {
  if (!isSupabaseConfigured || photoUris.length === 0) {
    return { urls: [] as string[], error: null };
  }

  const uploads = await Promise.all(
    photoUris.map((uri, index) => uploadListingPhoto(uri, userId, index)),
  );
  const urls = uploads.filter((url): url is string => url != null);

  if (urls.length === 0 && photoUris.length > 0) {
    return { urls, error: new Error('Photo upload failed. Check storage bucket setup.') };
  }

  return { urls, error: null };
}

export interface CreateListingInput {
  sellerId: string;
  brand: string;
  model: string;
  colorway: string;
  size: number;
  condition: Listing['condition'];
  price: number;
  description: string;
  photoUris: string[];
  location?: string;
}

export async function createListing(input: CreateListingInput) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new Error('Supabase is not configured') };
  }

  const { urls, error: uploadError } = await uploadListingPhotos(
    input.photoUris,
    input.sellerId,
  );

  if (uploadError) {
    return { data: null, error: uploadError };
  }

  if (input.location) {
    await supabase
      .from('profiles')
      .update({ location: input.location })
      .eq('id', input.sellerId);
  }

  const { data, error } = await supabase
    .from('listings')
    .insert({
      seller_id: input.sellerId,
      brand: input.brand.trim(),
      model: input.model.trim(),
      colorway: input.colorway.trim() || null,
      size: input.size,
      condition: input.condition,
      price: input.price,
      description: input.description.trim() || null,
      photos: urls,
      is_active: true,
    })
    .select('id, brand, model, colorway, price')
    .single();

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}

