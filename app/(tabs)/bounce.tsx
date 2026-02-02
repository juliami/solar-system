import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import 'react-native-gesture-handler';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue
} from 'react-native-reanimated';

const CIRCLE_SIZE = 120;
const DECAY_FACTOR = 0.98; 
const BOUNCE_FACTOR = 0.7; 
const MIN_VELOCITY = 0.5; 

export default function App() {
  const { width, height } = useWindowDimensions();

  // Calculate boundaries (accounting for circle size)
  const maxX = width / 2 - CIRCLE_SIZE / 2;
  const maxY = height / 2 - CIRCLE_SIZE / 2 - 10;
  const minX = -maxX;
  const minY = -maxY;

  // Position and velocity
  const offsetX = useSharedValue<number>(0);
  const offsetY = useSharedValue<number>(maxY);
  const velocityX = useSharedValue<number>(0);
  const velocityY = useSharedValue<number>(0);
  const contextX = useSharedValue<number>(0);
  const contextY = useSharedValue<number>(maxY);
  const isActive = useSharedValue<boolean>(false);

  const pan = Gesture.Pan()
    .onBegin(() => {
      isActive.value = true;
      cancelAnimation(offsetX);
      cancelAnimation(offsetY);
      velocityX.value = 0;
      velocityY.value = 0;
      contextX.value = offsetX.value;
      contextY.value = offsetY.value;
    })
    .onChange((event) => {
      offsetX.value = Math.max(minX, Math.min(maxX, contextX.value + event.translationX));
      offsetY.value = Math.max(minY, Math.min(maxY, contextY.value + event.translationY));
    })
    .onFinalize((event) => {
      isActive.value = false;
      velocityX.value = event.velocityX / 10;
      velocityY.value = event.velocityY / 10;
      contextX.value = offsetX.value;
      contextY.value = offsetY.value;
    });

  useFrameCallback(() => {
    if (isActive.value) return; // Don't simulate while dragging

    offsetX.value += velocityX.value;
    offsetY.value += velocityY.value;

    if (offsetX.value >= maxX) {
      offsetX.value = maxX;
      velocityX.value = -Math.abs(velocityX.value) * BOUNCE_FACTOR; // Bounce left
    } else if (offsetX.value <= minX) {
      offsetX.value = minX;
      velocityX.value = Math.abs(velocityX.value) * BOUNCE_FACTOR; // Bounce right
    }

    if (offsetY.value >= maxY) {
      offsetY.value = maxY;
      velocityY.value = -Math.abs(velocityY.value) * BOUNCE_FACTOR; // Bounce up
    } else if (offsetY.value <= minY) {
      offsetY.value = minY;
      velocityY.value = Math.abs(velocityY.value) * BOUNCE_FACTOR; // Bounce down
    }

    velocityX.value *= DECAY_FACTOR;
    velocityY.value *= DECAY_FACTOR;

    if (Math.abs(velocityX.value) < MIN_VELOCITY && Math.abs(velocityY.value) < MIN_VELOCITY) {
      velocityX.value = 0;
      velocityY.value = 0;
    }
  });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value }
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={pan}>

        <View style={styles.container}>
          <Animated.View style={[styles.circle, animatedStyles]} />
        </View>
      </GestureDetector>

    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  circle: {
    height: 120,
    width: 120,
    backgroundColor: '#b58df1',
    borderRadius: 500,
  },
});