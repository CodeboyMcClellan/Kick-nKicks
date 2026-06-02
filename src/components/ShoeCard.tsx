import { Image, Pressable, Text, View } from 'react-native';
import type { Listing } from '../types';

interface ShoeCardProps {
  listing: Listing;
  onPress: () => void;
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatCondition(condition: string): string {
  const labels: Record<string, string> = {
    DS: 'Deadstock',
    VNDS: 'VNDS',
    GC: 'Good Condition',
    Fair: 'Fair',
    Poor: 'Poor',
  };
  return labels[condition] ?? condition.replace(/_/g, ' ');
}

export function ShoeCard({ listing, onPress }: ShoeCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 m-1.5 bg-white rounded-2xl overflow-hidden border border-gray-100"
    >
      <Image
        source={{ uri: listing.imageUrl }}
        className="w-full aspect-square"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="text-xs text-brand font-semibold uppercase">{listing.brand}</Text>
        <Text className="text-sm font-semibold text-gray-900 mt-0.5" numberOfLines={2}>
          {listing.title}
        </Text>
        <Text className="text-xs text-gray-500 mt-1">
          Size {listing.size} · {formatCondition(listing.condition)}
        </Text>
        <Text className="text-lg font-bold text-gray-900 mt-2">{formatPrice(listing.price)}</Text>
      </View>
    </Pressable>
  );
}
