import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/theme';
import { mockStyles } from '../sharedMockStyles';

export function CheckoutMockScreen() {
  return (
    <View style={mockStyles.screen}>
      <View style={mockStyles.header}>
        <Ionicons name="arrow-back" size={30} color={colors.text} />
        <Text style={mockStyles.headerTitle}>Checkout</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>Jordan 1 Retro High OG</Text>
        <Text style={styles.subtitle}>Size 10 · DS</Text>

        <View style={[mockStyles.card, styles.summary]}>
          <View style={styles.line}>
            <Text style={styles.lineLabel}>Subtotal</Text>
            <Text style={styles.lineValue}>$285</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.lineLabel}>Shipping</Text>
            <Text style={styles.lineValue}>$12</Text>
          </View>
          <View style={[styles.line, styles.totalLine]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>$297</Text>
          </View>
        </View>

        <View style={styles.secureRow}>
          <Ionicons name="lock-closed" size={22} color={colors.success} />
          <Text style={styles.secureText}>Secured by Stripe</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={mockStyles.primaryButton}>
          <Text style={mockStyles.primaryButtonText}>Pay with Stripe</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 24,
    color: colors.textMuted,
  },
  summary: {
    marginTop: 40,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  lineLabel: {
    fontSize: 26,
    color: colors.textMuted,
  },
  lineValue: {
    fontSize: 26,
    fontWeight: '600',
    color: '#111827',
  },
  totalLine: {
    marginTop: 8,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  totalValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    gap: 10,
  },
  secureText: {
    fontSize: 22,
    color: colors.success,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 48,
  },
});
