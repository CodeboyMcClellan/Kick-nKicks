import { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import type { RootStackScreenProps } from '../types';
import { colors } from '../constants/theme';
import {
  APP_STORE_SCREENSHOTS,
  AppStoreScreenshotItem,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from '../marketing/appStore';

const PREVIEW_SCALE = (Dimensions.get('window').width - 32) / CANVAS_WIDTH;

export function AppStoreScreenshotsScreen({
  navigation,
}: RootStackScreenProps<'AppStoreScreenshots'>) {
  const insets = useSafeAreaInsets();
  const captureRefs = useRef<Record<string, View | null>>({});
  const [exporting, setExporting] = useState(false);

  const saveScreenshot = useCallback(async (id: string) => {
    const view = captureRefs.current[id];
    if (!view) {
      throw new Error('Capture view not ready');
    }

    const uri = await captureRef(view, {
      format: 'png',
      quality: 1,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    });

    await MediaLibrary.saveToLibraryAsync(uri);
  }, []);

  const handleExportOne = useCallback(
    async (id: string, filename: string) => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Allow photo library access to save screenshots.');
        return;
      }

      setExporting(true);
      try {
        await saveScreenshot(id);
        Alert.alert('Saved', `${filename} saved to your photo library (1290×2796).`);
      } catch {
        Alert.alert('Export failed', 'Could not save the screenshot.');
      } finally {
        setExporting(false);
      }
    },
    [saveScreenshot],
  );

  const handleExportAll = useCallback(async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Allow photo library access to save screenshots.');
      return;
    }

    setExporting(true);
    try {
      for (const shot of APP_STORE_SCREENSHOTS) {
        await saveScreenshot(shot.id);
      }
      Alert.alert('Saved', `All ${APP_STORE_SCREENSHOTS.length} App Store screenshots saved.`);
    } catch {
      Alert.alert('Export failed', 'Could not save all screenshots.');
    } finally {
      setExporting(false);
    }
  }, [saveScreenshot]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>App Store Screenshots</Text>
        <View style={styles.headerSpacer} />
      </View>

      <Text style={styles.subtitle}>
        1290×2796 · #eaf3de background · export to Photos
      </Text>

      <Pressable
        style={[styles.exportAllButton, exporting && styles.exportDisabled]}
        onPress={handleExportAll}
        disabled={exporting}
      >
        <Ionicons name="download-outline" size={20} color="#FFFFFF" />
        <Text style={styles.exportAllText}>
          {exporting ? 'Exporting…' : 'Export All 6 Screenshots'}
        </Text>
      </Pressable>

      <FlatList
        data={APP_STORE_SCREENSHOTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.id.replace(/-/g, ' ')}</Text>
                <Pressable
                  onPress={() => handleExportOne(item.id, item.filename)}
                  disabled={exporting}
                  style={styles.exportOneButton}
                >
                  <Text style={styles.exportOneText}>Save PNG</Text>
                </Pressable>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.previewScroll}
              >
                <View
                  style={[
                    styles.previewFrame,
                    {
                      width: CANVAS_WIDTH * PREVIEW_SCALE,
                      height: CANVAS_HEIGHT * PREVIEW_SCALE,
                    },
                  ]}
                >
                  <View
                    style={{
                      transform: [{ scale: PREVIEW_SCALE }],
                      width: CANVAS_WIDTH,
                      height: CANVAS_HEIGHT,
                    }}
                  >
                    <AppStoreScreenshotItem id={item.id} />
                  </View>
                </View>
              </ScrollView>
            </View>
          )}
      />

      <View style={styles.offscreen} pointerEvents="none">
        {APP_STORE_SCREENSHOTS.map((item) => (
          <View
            key={`capture-${item.id}`}
            ref={(node) => {
              captureRefs.current[item.id] = node;
            }}
            collapsable={false}
            style={styles.fullCanvas}
          >
            <AppStoreScreenshotItem id={item.id} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  headerSpacer: {
    width: 24,
  },
  subtitle: {
    paddingHorizontal: 20,
    paddingTop: 12,
    fontSize: 14,
    color: colors.textMuted,
  },
  exportAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.brand,
  },
  exportDisabled: {
    opacity: 0.6,
  },
  exportAllText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  card: {
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textTransform: 'capitalize',
  },
  exportOneButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  exportOneText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.brand,
  },
  previewScroll: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  previewFrame: {
    overflow: 'hidden',
    borderRadius: 12,
  },
  offscreen: {
    position: 'absolute',
    left: -CANVAS_WIDTH * 2,
    top: 0,
  },
  fullCanvas: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    marginBottom: CANVAS_HEIGHT,
  },
});
