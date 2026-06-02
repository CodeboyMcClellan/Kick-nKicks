import { isSupabaseConfigured, supabase } from './supabase';

export type RestorationServiceType = 'clean' | 'repaint' | 'sole_swap' | 'reglue' | 'custom';

export interface CreateRestorationRequestInput {
  userId: string;
  serviceType: RestorationServiceType;
  notes: string;
  estimatedPriceLow: number;
  estimatedPriceHigh: number;
  photoUris: string[];
}

const STORAGE_BUCKET = 'restoration-photos';

async function uploadPhoto(uri: string, userId: string, index: number): Promise<string | null> {
  const ext = uri.split('.').pop()?.split('?')[0]?.toLowerCase() ?? 'jpg';
  const contentType = ext === 'png' ? 'image/png' : 'image/jpeg';
  const path = `${userId}/${Date.now()}-${index}.${ext}`;

  const response = await fetch(uri);
  const arrayBuffer = await response.arrayBuffer();

  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, arrayBuffer, {
    contentType,
    upsert: false,
  });

  if (error) {
    console.warn('[Restoration] photo upload failed:', error.message);
    return null;
  }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadRestorationPhotos(
  photoUris: string[],
  userId: string,
): Promise<string[]> {
  if (!isSupabaseConfigured || photoUris.length === 0) return [];

  const uploads = await Promise.all(
    photoUris.map((uri, index) => uploadPhoto(uri, userId, index)),
  );

  return uploads.filter((url): url is string => url != null);
}

export async function createRestorationRequest(input: CreateRestorationRequestInput) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new Error('Supabase is not configured') };
  }

  const photoUrls = await uploadRestorationPhotos(input.photoUris, input.userId);

  const { data, error } = await supabase
    .from('restoration_requests')
    .insert({
      user_id: input.userId,
      service_type: input.serviceType,
      notes: input.notes.trim() || null,
      estimated_price_low: input.estimatedPriceLow,
      estimated_price_high: input.estimatedPriceHigh,
      photos: photoUrls,
      status: 'pending',
    })
    .select('id')
    .single();

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}

export async function fetchRestorationRequest(id: string) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new Error('Supabase is not configured') };
  }

  const { data, error } = await supabase
    .from('restoration_requests')
    .select('id, status, service_type, estimated_price_low, estimated_price_high, created_at')
    .eq('id', id)
    .maybeSingle();

  return { data, error };
}
