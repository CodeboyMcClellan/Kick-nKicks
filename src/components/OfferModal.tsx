import { Modal, Pressable, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { colors } from '../constants/theme';

interface OfferModalProps {
  visible: boolean;
  listingPrice: number;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

export function OfferModal({ visible, listingPrice, onClose, onSubmit }: OfferModalProps) {
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    const parsed = Number(amount);
    if (parsed > 0) {
      onSubmit(parsed);
      setAmount('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/50 justify-end" onPress={onClose}>
        <Pressable className="bg-white rounded-t-3xl p-6" onPress={(e) => e.stopPropagation()}>
          <Text className="text-xl font-bold text-gray-900">Make an Offer</Text>
          <Text className="text-gray-500 mt-1">Listed at ${listingPrice}</Text>

          <Text className="text-sm font-semibold text-gray-700 mt-6 mb-2">Your offer</Text>
          <TextInput
            className="bg-gray-50 rounded-xl px-4 py-3.5 text-lg border border-gray-100"
            value={amount}
            onChangeText={setAmount}
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor="#ADB5BD"
          />

          <View className="flex-row gap-3 mt-6">
            <Pressable
              onPress={onClose}
              className="flex-1 py-3.5 rounded-xl border border-gray-200 items-center"
            >
              <Text className="font-semibold text-gray-700">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleSubmit}
              className="flex-1 py-3.5 rounded-xl items-center"
              style={{ backgroundColor: colors.brand }}
            >
              <Text className="font-semibold text-white">Send Offer</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
