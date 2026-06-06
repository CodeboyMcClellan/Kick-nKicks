import { StyleSheet, View } from 'react-native';
import {
  INNER_WIDTH,
  PHONE_BEZEL,
  PHONE_HEIGHT,
  PHONE_RADIUS,
  PHONE_WIDTH,
} from './constants';

interface PhoneMockupProps {
  children: React.ReactNode;
}

export function PhoneMockup({ children }: PhoneMockupProps) {
  return (
    <View style={styles.shadow}>
      <View style={styles.frame}>
        <View style={styles.screen}>
          <View style={styles.dynamicIsland} />
          <View style={styles.screenContent}>{children}</View>
          <View style={styles.homeIndicator} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    width: PHONE_WIDTH,
    height: PHONE_HEIGHT,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.22,
    shadowRadius: 40,
    elevation: 16,
  },
  frame: {
    width: PHONE_WIDTH,
    height: PHONE_HEIGHT,
    borderRadius: PHONE_RADIUS,
    backgroundColor: '#1C1C1E',
    padding: PHONE_BEZEL,
  },
  screen: {
    flex: 1,
    width: INNER_WIDTH,
    borderRadius: PHONE_RADIUS - PHONE_BEZEL,
    backgroundColor: '#000000',
    overflow: 'hidden',
  },
  screenContent: {
    flex: 1,
    paddingTop: 52,
    paddingBottom: 24,
  },
  dynamicIsland: {
    position: 'absolute',
    top: 14,
    alignSelf: 'center',
    width: 126,
    height: 36,
    borderRadius: 20,
    backgroundColor: '#000000',
    zIndex: 10,
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.35)',
    zIndex: 10,
  },
});
