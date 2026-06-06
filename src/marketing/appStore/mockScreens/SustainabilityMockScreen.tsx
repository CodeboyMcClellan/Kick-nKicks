import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/theme';
import { mockStyles } from '../sharedMockStyles';

export function SustainabilityMockScreen() {
  return (
    <View style={mockStyles.screen}>
      <View style={mockStyles.header}>
        <Ionicons name="arrow-back" size={30} color={colors.text} />
        <Text style={mockStyles.headerTitle}>Your Impact</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.intro}>
          Every resale and restore on Kick'n Kicks keeps sneakers out of landfills.
        </Text>

        <View style={styles.heroCard}>
          <Ionicons name="leaf" size={56} color={colors.success} />
          <Text style={styles.heroValue}>12</Text>
          <Text style={styles.heroLabel}>Pairs saved from landfill</Text>
        </View>

        <View style={styles.metricsRow}>
          <View style={[mockStyles.card, styles.metricCard]}>
            <Text style={styles.metricValue}>48 kg</Text>
            <Text style={styles.metricLabel}>CO₂ avoided</Text>
          </View>
          <View style={[mockStyles.card, styles.metricCard]}>
            <Text style={styles.metricValue}>3</Text>
            <Text style={styles.metricLabel}>Restores done</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 28,
  },
  intro: {
    fontSize: 26,
    lineHeight: 38,
    color: colors.textMuted,
  },
  heroCard: {
    marginTop: 40,
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
  },
  heroValue: {
    marginTop: 16,
    fontSize: 64,
    fontWeight: '800',
    color: '#111827',
  },
  heroLabel: {
    marginTop: 8,
    fontSize: 24,
    color: colors.textMuted,
    textAlign: 'center',
  },
  metricsRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 16,
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
  },
  metricLabel: {
    marginTop: 8,
    fontSize: 20,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
