import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedProps, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Circle, Line, Svg } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);

const x1 = 250;
const y1 = 150;


export default function SvgAnimatedPath() {
  const circleRadius = 100;
  const circumference = 2 * Math.PI * circleRadius;
  
  
  const dashOffset = useSharedValue(0);
  const lineX2 = useSharedValue(x1);

  const animatedPropsCircle = useAnimatedProps(() => {
    return {
      strokeDashoffset: dashOffset.value
    };
  });

  const animatedPropsLine = useAnimatedProps(() => {
    return {
      x1,
      y1,
      x2: lineX2.value,
      y2: y1
    };
  });


  
  useEffect(() => {
    dashOffset.value = withRepeat(
      withSequence(
        withTiming(circumference, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(circumference, { duration: 1000 }), 
        withTiming(0, { duration: 800, easing: Easing.inOut(Easing.ease) }), 
      ),
      -1, 
      false
    );

    lineX2.value = withRepeat(
      withSequence(
        withTiming(x1, { duration: 800 }), 
        withTiming(50, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        withTiming(x1, { duration: 500, easing: Easing.inOut(Easing.ease) }), 
        withTiming(x1, { duration: 800 }),
      ),
      -1,
      false
    );
  }, [circumference]);


  return (
    <View style={styles.container}>
      <Svg viewBox="0 0 300 300">
        <AnimatedCircle
          animatedProps={animatedPropsCircle}
          stroke="lightgreen"
          strokeWidth={8}
          strokeDasharray={circumference}
          fill="none"
          cx="150" 
          cy="150" 
          r="100"   
        />
        <AnimatedLine
          stroke="lightgreen"
          strokeWidth={8}
          fill="none"
          strokeLinecap={'round'}
          animatedProps={animatedPropsLine}
        />
      </Svg>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: 'black',
  },

  text : {
    color: 'indianred',
    fontSize: 20,
    marginTop: 80,
  },
});
