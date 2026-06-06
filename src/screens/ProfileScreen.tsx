import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { TabScreenProps } from '../types';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../constants/theme';

export function ProfileScreen({ navigation }: TabScreenProps<'ProfileTab'>) {
  const insets = useSafeAreaInsets();
  const { profile, signOut } = useAuth();

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="px-5 pb-10"
      style={{ paddingTop: insets.top + 16 }}
    >
      <View className="items-center mb-8">
        <View className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center">
          <Ionicons name="person" size={48} color={colors.brand} />
        </View>
        <Text className="text-2xl font-bold text-gray-900 mt-4">
          {profile?.displayName ?? 'Guest'}
        </Text>
        <Text className="text-gray-500">{profile?.email}</Text>
        {profile && (
          <Text className="text-sm text-gray-400 mt-1">
            ★ {profile.rating} · {profile.totalSales} sales
          </Text>
        )}
      </View>

      <Pressable
        onPress={() => navigation.navigate('SellerDashboard')}
        className="flex-row items-center py-4 border-b border-gray-100"
      >
        <Ionicons name="storefront" size={22} color={colors.text} />
        <Text className="flex-1 ml-3 text-base text-gray-900">Seller Dashboard</Text>
        <Ionicons name="chevron-forward" size={20} color="#ADB5BD" />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('OrderTracking', { orderId: 'ord-1' })}
        className="flex-row items-center py-4 border-b border-gray-100"
      >
        <Ionicons name="cube" size={22} color={colors.text} />
        <Text className="flex-1 ml-3 text-base text-gray-900">Order Tracking</Text>
        <Ionicons name="chevron-forward" size={20} color="#ADB5BD" />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('AppStoreScreenshots')}
        className="flex-row items-center py-4 border-b border-gray-100"
      >
        <Ionicons name="images" size={22} color={colors.text} />
        <Text className="flex-1 ml-3 text-base text-gray-900">App Store Screenshots</Text>
        <Ionicons name="chevron-forward" size={20} color="#ADB5BD" />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('Sustainability')}
        className="flex-row items-center py-4 border-b border-gray-100"
      >
        <Ionicons name="leaf" size={22} color={colors.text} />
        <Text className="flex-1 ml-3 text-base text-gray-900">Sustainability</Text>
        <Ionicons name="chevron-forward" size={20} color="#ADB5BD" />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('Chat', { conversationId: 'conv-1' })}
        className="flex-row items-center py-4 border-b border-gray-100"
      >
        <Ionicons name="chatbubbles" size={22} color={colors.text} />
        <Text className="flex-1 ml-3 text-base text-gray-900">Messages</Text>
        <Ionicons name="chevron-forward" size={20} color="#ADB5BD" />
      </Pressable>

      <Pressable onPress={signOut} className="mt-8 py-4 items-center">
        <Text className="text-brand font-semibold">Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
}
