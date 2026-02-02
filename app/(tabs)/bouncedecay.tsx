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
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDecay
} from 'react-native-reanimated';

const CIRCLE_SIZE = 120;
const BOUNCE_FACTOR = 0.7;
const MIN_VELOCITY = 100;
const DECELERATION = 0.998;

export default function App() {
  const { width, height } = useWindowDimensions();

  // Calculate boundaries (accounting for circle size)
  const maxX = width / 2 - CIRCLE_SIZE / 2;
  const maxY = height / 2 - CIRCLE_SIZE / 2 - 10;
  const minX = -maxX;
  const minY = -maxY;

  // Position tracking
  const offsetX = useSharedValue<number>(0);
  const offsetY = useSharedValue<number>(maxY);
  const contextX = useSharedValue<number>(0);
  const contextY = useSharedValue<number>(maxY);
  const isActive = useSharedValue<boolean>(false);

  // Velocity tracking for bounces
  const currentVelocityX = useSharedValue<number>(0);
  const currentVelocityY = useSharedValue<number>(0);

  useAnimatedReaction(
    () => offsetX.value,
    (current, previous) => {
      if (isActive.value || previous === null) return;

      const delta = current - previous;
      if (delta !== 0) {
        currentVelocityX.value = delta * 60;
      }

      // Hit right wall
      if (current >= maxX && currentVelocityX.value > 0) {
        cancelAnimation(offsetX);
        offsetX.value = maxX;
        const newVelocity = -Math.abs(currentVelocityX.value) * BOUNCE_FACTOR;
        currentVelocityX.value = newVelocity;
        if (Math.abs(newVelocity) > MIN_VELOCITY) {
          offsetX.value = withDecay({
            velocity: newVelocity,
            deceleration: DECELERATION,
          });
        }
      }
      // Hit left wall
      else if (current <= minX && currentVelocityX.value < 0) {
        cancelAnimation(offsetX);
        offsetX.value = minX;
        const newVelocity = Math.abs(currentVelocityX.value) * BOUNCE_FACTOR;
        currentVelocityX.value = newVelocity;
        if (Math.abs(newVelocity) > MIN_VELOCITY) {
          offsetX.value = withDecay({
            velocity: newVelocity,
            deceleration: DECELERATION,
          });
        }
      }
    }
  );

  useAnimatedReaction(
    () => offsetY.value,
    (current, previous) => {
      if (isActive.value || previous === null) return;

      // Estimate velocity from position delta
      const delta = current - previous;
      if (delta !== 0) {
        currentVelocityY.value = delta * 60;
      }

      // Hit bottom wall
      if (current >= maxY && currentVelocityY.value > 0) {
        cancelAnimation(offsetY);
        offsetY.value = maxY;
        const newVelocity = -Math.abs(currentVelocityY.value) * BOUNCE_FACTOR;
        currentVelocityY.value = newVelocity;
        if (Math.abs(newVelocity) > MIN_VELOCITY) {
          offsetY.value = withDecay({
            velocity: newVelocity,
            deceleration: DECELERATION,
          });
        }
      }
      // Hit top wall
      else if (current <= minY && currentVelocityY.value < 0) {
        cancelAnimation(offsetY);
        offsetY.value = minY;
        const newVelocity = Math.abs(currentVelocityY.value) * BOUNCE_FACTOR;
        currentVelocityY.value = newVelocity;
        if (Math.abs(newVelocity) > MIN_VELOCITY) {
          offsetY.value = withDecay({
            velocity: newVelocity,
            deceleration: DECELERATION,
          });
        }
      }
    }
  );

  const pan = Gesture.Pan()
    .onBegin(() => {
      isActive.value = true;
      cancelAnimation(offsetX);
      cancelAnimation(offsetY);
      currentVelocityX.value = 0;
      currentVelocityY.value = 0;
      contextX.value = offsetX.value;
      contextY.value = offsetY.value;
    })
    .onChange((event) => {
      offsetX.value = Math.max(minX, Math.min(maxX, contextX.value + event.translationX));
      offsetY.value = Math.max(minY, Math.min(maxY, contextY.value + event.translationY));
    })
    .onFinalize((event) => {
      isActive.value = false;

      // Store initial velocities
      currentVelocityX.value = event.velocityX;
      currentVelocityY.value = event.velocityY;

      // Start decay animations
      offsetX.value = withDecay({
        velocity: event.velocityX,
        deceleration: DECELERATION,
      });
      offsetY.value = withDecay({
        velocity: event.velocityY,
        deceleration: DECELERATION,
      });
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
    backgroundColor: '#8DF1AE',
    borderRadius: 500,
  },
});
