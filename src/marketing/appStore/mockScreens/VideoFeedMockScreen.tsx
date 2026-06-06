import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { mockStyles } from '../sharedMockStyles';

export function VideoFeedMockScreen() {
  return (
    <View style={mockStyles.screen}>
      <LinearGradient
        colors={['#2D3436', '#636E72', '#B2BEC3']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.sneakerPlaceholder}>
        <Ionicons name="footsteps" size={120} color="rgba(255,255,255,0.25)" />
      </View>

      <View style={styles.overlay}>
        <Text style={styles.username}>@sneakerflip</Text>
        <Text style={styles.caption}>Just copped these 🔥 Jordan 4s</Text>
      </View>

      <View style={styles.actions}>
        <View style={styles.actionItem}>
          <Ionicons name="heart" size={44} color="#FFFFFF" />
          <Text style={styles.actionCount}>1,240</Text>
        </View>
        <View style={styles.actionItem}>
          <Ionicons name="chatbubble-outline" size={40} color="#FFFFFF" />
        </View>
        <View style={styles.actionItem}>
          <Ionicons name="share-outline" size={40} color="#FFFFFF" />
        </View>
      </View>

      <View style={styles.tabBar}>
        <Ionicons name="home" size={28} color="rgba(255,255,255,0.5)" />
        <Ionicons name="play-circle" size={28} color="#FFFFFF" />
        <Ionicons name="search" size={28} color="rgba(255,255,255,0.5)" />
        <Ionicons name="person" size={28} color="rgba(255,255,255,0.5)" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...mockStyles.screen,
    backgroundColor: '#000000',
  },
  sneakerPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 180,
    left: 28,
    right: 120,
  },
  username: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  caption: {
    marginTop: 8,
    fontSize: 26,
    color: 'rgba(255,255,255,0.9)',
  },
  actions: {
    position: 'absolute',
    bottom: 200,
    right: 24,
    alignItems: 'center',
    gap: 28,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionCount: {
    marginTop: 6,
    fontSize: 20,
    color: '#FFFFFF',
  },
  tabBar: {
    position: 'absolute',
    bottom: 36,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
  },
});
