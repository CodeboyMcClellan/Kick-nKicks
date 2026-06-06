import { StyleSheet } from 'react-native';
import { colors } from '../../constants/theme';
import { INNER_WIDTH } from './constants';

export const mockStyles = StyleSheet.create({
  screen: {
    width: INNER_WIDTH,
    height: '100%',
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    marginLeft: 16,
    fontSize: 34,
    fontWeight: '700',
    color: '#111827',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 28,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: {
    flex: 1,
    marginLeft: 20,
    fontSize: 28,
    color: '#111827',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
  },
  label: {
    fontSize: 22,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 22,
    fontSize: 26,
    borderWidth: 1,
    borderColor: colors.border,
    color: '#111827',
  },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 18,
    paddingVertical: 24,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },
});
