import { StyleSheet, Text, View } from 'react-native';
import { PhoneMockup } from './PhoneMockup';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  HEADLINE_HORIZONTAL,
  HEADLINE_TOP,
  PHONE_TOP_MARGIN,
  SCREENSHOT_BACKGROUND,
} from './constants';

interface AppStoreScreenshotProps {
  headline: string;
  children: React.ReactNode;
}

export function AppStoreScreenshot({ headline, children }: AppStoreScreenshotProps) {
  return (
    <View style={styles.canvas}>
      <Text style={styles.headline}>{headline}</Text>
      <View style={styles.phoneWrap}>
        <PhoneMockup>{children}</PhoneMockup>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    backgroundColor: SCREENSHOT_BACKGROUND,
    alignItems: 'center',
  },
  headline: {
    marginTop: HEADLINE_TOP,
    paddingHorizontal: HEADLINE_HORIZONTAL,
    fontSize: 72,
    lineHeight: 84,
    fontWeight: '800',
    color: '#1D3557',
    textAlign: 'center',
    letterSpacing: -1,
  },
  phoneWrap: {
    marginTop: PHONE_TOP_MARGIN,
  },
});
