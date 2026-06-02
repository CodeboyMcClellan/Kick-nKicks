import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { TabScreenProps } from '../types';
import { useListings } from '../hooks/useListings';
import { SearchBar } from '../components/SearchBar';
import { ShoeCard } from '../components/ShoeCard';
import { colors } from '../constants/theme';

const HOME_BRANDS = ['All', 'Nike', 'Jordan', 'Adidas', 'New Balance'] as const;
const BRAND_RED = '#E63946';

export function HomeScreen({ navigation }: TabScreenProps<'HomeTab'>) {
  const insets = useSafeAreaInsets();
  const { listings, filters, setFilters, loading, refreshing, error, refetch } = useListings();

  const selectedBrand = filters.brand ?? 'All';

  const handleBrandPress = (brand: (typeof HOME_BRANDS)[number]) => {
    setFilters({ ...filters, brand: brand === 'All' ? undefined : brand });
  };

  const listHeader = (
    <>
      <View className="bg-gray-950 px-4 pb-5" style={{ paddingTop: insets.top + 12 }}>
        <Text className="text-3xl font-bold text-white text-center tracking-tight">
          Kick<Text style={{ color: BRAND_RED }}>'</Text>n Kicks
        </Text>
        <Text className="text-white/60 text-center text-sm mt-1 mb-5">
          Buy · Sell · Restore
        </Text>

        <SearchBar
          editable={false}
          variant="dark"
          placeholder="Search sneakers, brands, sizes…"
          onPress={() => navigation.navigate('SearchTab')}
        />
      </View>

      <FlatList
        horizontal
        data={[...HOME_BRANDS]}
        keyExtractor={(brand) => brand}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4 py-3 gap-2"
        className="bg-white border-b border-gray-100"
        renderItem={({ item: brand }) => {
          const isActive = selectedBrand === brand;
          return (
            <Pressable
              onPress={() => handleBrandPress(brand)}
              className={`px-4 py-2 rounded-full border mr-2 ${
                isActive ? 'border-brand bg-brand' : 'bg-white border-gray-200'
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  isActive ? 'text-white' : 'text-gray-700'
                }`}
              >
                {brand}
              </Text>
            </Pressable>
          );
        }}
      />

      <View
        className="mx-4 my-4 p-4 rounded-2xl flex-row items-center justify-between"
        style={{ backgroundColor: BRAND_RED }}
      >
        <View className="flex-1 pr-3">
          <Text className="text-white font-bold text-lg">Restore My Shoes</Text>
          <Text className="text-white/80 text-sm mt-1">
            Deep clean, repaint, sole swap — find a cobbler near you
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('Restore')}
          className="bg-white px-4 py-2.5 rounded-xl"
        >
          <Text className="font-bold text-sm" style={{ color: BRAND_RED }}>
            Try Now
          </Text>
        </Pressable>
      </View>

      <View className="px-4 pb-2 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-gray-900">Latest Listings</Text>
        {!loading && listings.length > 0 && (
          <Text className="text-gray-400 text-sm">{listings.length} results</Text>
        )}
      </View>
    </>
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={listHeader}
        contentContainerClassName="pb-8"
        columnWrapperClassName="px-2"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refetch}
            tintColor={colors.brand}
            colors={[colors.brand]}
          />
        }
        ListEmptyComponent={
          loading && !refreshing ? (
            <View className="py-16 items-center">
              <ActivityIndicator size="large" color={colors.brand} />
              <Text className="text-gray-500 mt-3">Loading listings…</Text>
            </View>
          ) : (
            <View className="py-16 px-6 items-center">
              <Text className="text-gray-900 font-semibold text-center">
                {error ? 'Could not load listings' : 'No listings yet'}
              </Text>
              <Text className="text-gray-500 text-center mt-2">
                {error ?? 'Pull down to refresh or list a shoe on the Sell+ tab.'}
              </Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <ShoeCard
            listing={item}
            onPress={() => navigation.navigate('ListingDetail', { listingId: item.id })}
          />
        )}
      />
    </View>
  );
}
