import { Pressable, ScrollView, Text } from 'react-native';
import type { ListingFilters, ShoeCondition } from '../types';

const BRANDS = ['Jordan', 'Nike', 'Adidas', 'New Balance'] as const;
const CONDITIONS: ShoeCondition[] = ['deadstock', 'lightly_worn', 'used', 'beaters'];

interface FilterBarProps {
  filters: ListingFilters;
  onChange: (filters: ListingFilters) => void;
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const toggleBrand = (brand: string) => {
    onChange({ ...filters, brand: filters.brand === brand ? undefined : brand });
  };

  const toggleCondition = (condition: ShoeCondition) => {
    onChange({
      ...filters,
      condition: filters.condition === condition ? undefined : condition,
    });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="px-4 py-2 gap-2"
    >
      {BRANDS.map((brand) => (
        <Pressable
          key={brand}
          onPress={() => toggleBrand(brand)}
          className={`px-4 py-2 rounded-full border ${
            filters.brand === brand ? 'bg-brand border-brand' : 'bg-white border-gray-200'
          }`}
        >
          <Text
            className={`text-sm font-medium ${
              filters.brand === brand ? 'text-white' : 'text-gray-700'
            }`}
          >
            {brand}
          </Text>
        </Pressable>
      ))}
      {CONDITIONS.map((condition) => (
        <Pressable
          key={condition}
          onPress={() => toggleCondition(condition)}
          className={`px-4 py-2 rounded-full border ${
            filters.condition === condition ? 'bg-brand border-brand' : 'bg-white border-gray-200'
          }`}
        >
          <Text
            className={`text-sm font-medium capitalize ${
              filters.condition === condition ? 'text-white' : 'text-gray-700'
            }`}
          >
            {condition.replace(/_/g, ' ')}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
