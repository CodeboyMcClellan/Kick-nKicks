import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/theme';
import { mockStyles } from '../sharedMockStyles';

export function AuthMockScreen() {
  return (
    <View style={mockStyles.screen}>
      <View style={styles.content}>
        <Text style={styles.logo}>
          Kick<Text style={styles.logoAccent}>'</Text>n Kicks
        </Text>
        <Text style={styles.tagline}>The sneaker marketplace with soul</Text>

        <Text style={mockStyles.label}>Email</Text>
        <View style={[mockStyles.input, styles.inputSpacing]}>
          <Text style={styles.inputText}>you@email.com</Text>
        </View>

        <Text style={mockStyles.label}>Password</Text>
        <View style={[mockStyles.input, styles.inputSpacingLg]}>
          <Text style={styles.inputPlaceholder}>••••••••</Text>
        </View>

        <View style={mockStyles.primaryButton}>
          <Text style={mockStyles.primaryButtonText}>Sign In</Text>
        </View>

        <Text style={styles.link}>New here? Create account</Text>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialButton}>
          <Ionicons name="logo-google" size={28} color="#4285F4" />
          <Text style={styles.socialText}>Google</Text>
        </View>

        <View style={styles.appleButton}>
          <Ionicons name="logo-apple" size={28} color="#FFFFFF" />
          <Text style={styles.appleText}>Sign in with Apple</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 36,
    paddingTop: 72,
  },
  logo: {
    fontSize: 52,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  logoAccent: {
    color: colors.brand,
  },
  tagline: {
    marginTop: 12,
    marginBottom: 48,
    fontSize: 26,
    color: colors.textMuted,
    textAlign: 'center',
  },
  inputSpacing: {
    marginBottom: 24,
  },
  inputSpacingLg: {
    marginBottom: 36,
  },
  inputText: {
    fontSize: 26,
    color: '#111827',
  },
  inputPlaceholder: {
    fontSize: 26,
    color: '#ADB5BD',
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: colors.brand,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 36,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: 20,
    fontSize: 22,
    color: colors.textMuted,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  socialText: {
    marginLeft: 14,
    fontSize: 26,
    fontWeight: '600',
    color: '#111827',
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    borderRadius: 18,
    paddingVertical: 22,
  },
  appleText: {
    marginLeft: 14,
    fontSize: 26,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
