import { useCallback, useMemo, useState } from 'react';
import type { Cobbler, RestorationService, RestoreQuote } from '../types';

export const RESTORATION_SERVICES: RestorationService[] = [
  {
    id: 'clean',
    name: 'Deep Clean',
    description: 'Full sole, upper, and lace refresh',
    icon: 'water',
    priceLow: 25,
    priceHigh: 45,
  },
  {
    id: 'repaint',
    name: 'Repaint',
    description: 'Midsole and scuff touch-up',
    icon: 'color-palette',
    priceLow: 60,
    priceHigh: 100,
  },
  {
    id: 'sole_swap',
    name: 'Sole Swap',
    description: 'Replace worn soles with OEM or custom',
    icon: 'swap-horizontal',
    priceLow: 45,
    priceHigh: 90,
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Full custom restoration and detailing',
    icon: 'sparkles',
    priceLow: 80,
    priceHigh: 150,
  },
];

const MOCK_COBBLERS: Cobbler[] = [
  {
    id: 'c1',
    name: 'Sole Revival Studio',
    rating: 4.9,
    latitude: 33.4484,
    longitude: -112.074,
    address: '123 Main St, Phoenix, AZ',
    services: ['Deep Clean', 'Repaint', 'Custom'],
  },
  {
    id: 'c2',
    name: 'Kick Doctor',
    rating: 4.7,
    latitude: 33.4255,
    longitude: -111.94,
    address: '456 Sneaker Ave, Tempe, AZ',
    services: ['Sole Swap', 'Custom'],
  },
];

export function useRestoration() {
  const [selectedServiceId, setSelectedServiceId] = useState<RestorationService['id'] | null>(
    null,
  );

  const services = RESTORATION_SERVICES;
  const cobblers = MOCK_COBBLERS;

  const selectedService = useMemo(
    () => services.find((service) => service.id === selectedServiceId) ?? null,
    [selectedServiceId, services],
  );

  const priceRange = useMemo(() => {
    if (!selectedService) return null;
    return {
      low: selectedService.priceLow,
      high: selectedService.priceHigh,
    };
  }, [selectedService]);

  const selectService = useCallback((serviceId: RestorationService['id']) => {
    setSelectedServiceId((current) => (current === serviceId ? null : serviceId));
  }, []);

  const buildQuote = useCallback((): RestoreQuote | null => {
    if (!selectedService) return null;

    return {
      tierId: selectedService.id,
      tierName: selectedService.name,
      estimatedPriceLow: selectedService.priceLow,
      estimatedPriceHigh: selectedService.priceHigh,
      estimatedDays: selectedService.id === 'custom' ? 14 : 7,
    };
  }, [selectedService]);

  return {
    services,
    cobblers,
    selectedServiceId,
    selectedService,
    priceRange,
    selectService,
    buildQuote,
  };
}
