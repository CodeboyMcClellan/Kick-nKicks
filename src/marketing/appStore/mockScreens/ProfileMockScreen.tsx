import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/theme';
import { mockStyles } from '../sharedMockStyles';

const MENU_ITEMS = [
  { icon: 'storefront' as const, label: 'Seller Dashboard' },
  { icon: 'cube' as const, label: 'Order Tracking' },
  { icon: 'leaf' as const, label: 'Sustainability' },
  { icon: 'chatbubbles' as const, label: 'Messages' },
];

export function ProfileMockScreen() {
  return (
    <View style={mockStyles.screen}>
      <View style={styles.content}>
        <View style={styles.avatarWrap}>
          <Ionicons name="person" size={56} color={colors.brand} />
        </View>
        <Text style={styles.name}>Jalen M.</Text>
        <Text style={styles.email}>jalen@kicknkicks.com</Text>
        <Text style={styles.stats}>★ 4.9 · 28 sales</Text>

        {MENU_ITEMS.map((item) => (
          <View key={item.label} style={mockStyles.row}>
            <Ionicons name={item.icon} size={28} color={colors.text} />
            <Text style={mockStyles.rowLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={24} color="#ADB5BD" />
          </View>
        ))}

        <Text style={styles.signOut}>Sign Out</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 56,
  },
  avatarWrap: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    marginTop: 20,
    fontSize: 36,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  email: {
    marginTop: 6,
    fontSize: 24,
    color: colors.textMuted,
    textAlign: 'center',
  },
  stats: {
    marginTop: 8,
    marginBottom: 32,
    fontSize: 22,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  signOut: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '600',
    color: colors.brand,
  },
});
