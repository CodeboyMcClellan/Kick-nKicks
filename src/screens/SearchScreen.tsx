import { FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { TabScreenProps } from '../types';
import { useListings } from '../hooks/useListings';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { ShoeCard } from '../components/ShoeCard';

export function SearchScreen({ navigation }: TabScreenProps<'SearchTab'>) {
  const insets = useSafeAreaInsets();
  const { listings, query, setQuery, filters, setFilters } = useListings();

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="px-4 pb-2">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Search</Text>
        <SearchBar value={query} onChangeText={setQuery} />
      </View>

      <FilterBar filters={filters} onChange={setFilters} />

      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerClassName="px-2 pb-8"
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-12">No listings match your search.</Text>
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
