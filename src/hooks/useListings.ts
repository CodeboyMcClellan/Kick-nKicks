import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchListingById, fetchListings } from '../lib/listings';
import type { Listing, ListingFilters } from '../types';

export function useListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ListingFilters>({});
  const [query, setQuery] = useState('');

  const loadListings = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    const { data, error: fetchError } = await fetchListings({
      brand: filters.brand,
      search: query.trim() || undefined,
    });

    if (fetchError) {
      setError(fetchError.message);
      setListings([]);
    } else {
      setListings(data);
    }

    if (isRefresh) {
      setRefreshing(false);
    } else {
      setLoading(false);
    }
  }, [filters.brand, query]);

  useEffect(() => {
    loadListings(false);
  }, [loadListings]);

  const getListingById = useCallback(
    (id: string) => listings.find((listing) => listing.id === id) ?? null,
    [listings],
  );

  const fetchListing = useCallback(async (id: string) => {
    const cached = listings.find((listing) => listing.id === id);
    if (cached) return cached;

    const { data, error: fetchError } = await fetchListingById(id);
    if (fetchError || !data) return null;
    return data;
  }, [listings]);

  const trending = useMemo(() => listings.slice(0, 8), [listings]);

  return {
    listings,
    trending,
    filters,
    query,
    loading,
    refreshing,
    error,
    setQuery,
    setFilters,
    getListingById,
    fetchListing,
    refetch: () => loadListings(true),
  };
}
