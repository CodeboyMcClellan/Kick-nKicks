import type { ReactNode } from 'react';
import { Modal, Pressable, Text, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface BottomSheetProps {
  visible: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  /** Optional style for the sheet container */
  style?: ViewStyle;
}

export function BottomSheet({ visible, title, onClose, children, style }: BottomSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40" onPress={onClose}>
        <View className="flex-1" />
        <Pressable
          className="bg-white rounded-t-3xl"
          style={[{ paddingBottom: insets.bottom + 16 }, style]}
          onPress={(e) => e.stopPropagation()}
        >
          <View className="items-center pt-3 pb-2">
            <View className="w-10 h-1 rounded-full bg-gray-300" />
          </View>
          {title && (
            <View className="flex-row items-center justify-between px-5 pb-3">
              <Text className="text-lg font-bold text-gray-900">{title}</Text>
              <Pressable onPress={onClose} hitSlop={12}>
                <Ionicons name="close" size={24} color="#6C757D" />
              </Pressable>
            </View>
          )}
          <View className="px-5">{children}</View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
