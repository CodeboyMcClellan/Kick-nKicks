import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/theme';
import { mockStyles } from '../sharedMockStyles';

const ORDERS = [
  { title: 'Jordan 1 Retro', status: 'Shipped', price: 285 },
  { title: 'Dunk Low Panda', status: 'Paid', price: 120 },
];

export function SellerDashboardMockScreen() {
  return (
    <View style={mockStyles.screen}>
      <View style={mockStyles.header}>
        <Ionicons name="arrow-back" size={30} color={colors.text} />
        <Text style={mockStyles.headerTitle}>Seller Dashboard</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[mockStyles.card, styles.statCard]}>
          <Text style={styles.statLabel}>Active listings</Text>
          <Text style={styles.statValue}>4</Text>
        </View>
        <View style={[mockStyles.card, styles.statCard]}>
          <Text style={styles.statLabel}>Total sales</Text>
          <Text style={styles.statValue}>$1,240</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent orders</Text>

      {ORDERS.map((order) => (
        <View key={order.title} style={styles.orderRow}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderTitle}>{order.title}</Text>
            <Text style={styles.orderStatus}>{order.status}</Text>
          </View>
          <Text style={styles.orderPrice}>${order.price}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
  },
  statCard: {
    flex: 1,
  },
  statLabel: {
    fontSize: 22,
    color: colors.textMuted,
  },
  statValue: {
    marginTop: 8,
    fontSize: 36,
    fontWeight: '700',
    color: '#111827',
  },
  sectionTitle: {
    marginTop: 32,
    marginBottom: 8,
    paddingHorizontal: 28,
    fontSize: 30,
    fontWeight: '700',
    color: '#111827',
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  orderInfo: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#111827',
  },
  orderStatus: {
    marginTop: 4,
    fontSize: 22,
    color: colors.textMuted,
  },
  orderPrice: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },
});
