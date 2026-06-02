import { useRef } from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import Video, { type VideoRef } from 'react-native-video';
import { Ionicons } from '@expo/vector-icons';
import type { VideoPost } from '../types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface VideoPlayerProps {
  post: VideoPost;
  isActive: boolean;
}

export function VideoPlayer({ post, isActive }: VideoPlayerProps) {
  const ref = useRef<VideoRef>(null);

  return (
    <View style={{ height: SCREEN_HEIGHT }} className="bg-black">
      <Video
        ref={ref}
        source={{ uri: post.videoUrl }}
        style={{ flex: 1 }}
        resizeMode="cover"
        repeat
        paused={!isActive}
        muted={false}
      />

      <View className="absolute bottom-32 left-4 right-20">
        <Text className="text-white font-bold text-base">{post.username}</Text>
        <Text className="text-white/90 mt-1">{post.caption}</Text>
      </View>

      <View className="absolute bottom-36 right-4 items-center gap-5">
        <Pressable className="items-center">
          <Ionicons name="heart-outline" size={32} color="#fff" />
          <Text className="text-white text-xs mt-1">{post.likes}</Text>
        </Pressable>
        <Pressable className="items-center">
          <Ionicons name="chatbubble-outline" size={28} color="#fff" />
        </Pressable>
        <Pressable className="items-center">
          <Ionicons name="share-outline" size={28} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}
