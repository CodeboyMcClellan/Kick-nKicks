import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import type { RestorationService } from '../types';
import { colors } from '../constants/theme';

interface ServiceTileProps {
  service: RestorationService;
  selected: boolean;
  onPress: () => void;
}

export function ServiceTile({ service, selected, onPress }: ServiceTileProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-1 m-1.5 p-4 rounded-2xl border-2 ${
        selected ? 'bg-red-50' : 'bg-white border-gray-100'
      }`}
      style={selected ? { borderColor: colors.brand } : undefined}
    >
      <View
        className="w-10 h-10 rounded-full items-center justify-center mb-3"
        style={{ backgroundColor: selected ? colors.brand : colors.surface }}
      >
        <Ionicons
          name={service.icon as keyof typeof Ionicons.glyphMap}
          size={20}
          color={selected ? '#fff' : colors.brand}
        />
      </View>
      <Text className="font-semibold text-gray-900">{service.name}</Text>
      <Text className="text-xs text-gray-500 mt-1" numberOfLines={2}>
        {service.description}
      </Text>
      <Text className="font-bold mt-2" style={{ color: colors.brand }}>
        ${service.priceLow}+
      </Text>
    </Pressable>
  );
}
