import { useEffect } from 'react';
import { Easing, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Path);


 // Shared parameters
 const CENTER_X  = 150;
 const CENTER_Y = 150;
 const RADIUS = 90;
 const SEGMENTS = 45;
 const LINE_WIDTH = 200;

 const CIRCLE_START = SEGMENTS/4;

export default function SvgAnimatedPath() {
  // Progress: 0 = circle, 1 = line
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { 
        duration: 1500,
        easing: Easing.ease
      }),
      -1, 
      true 
    );
  }, []);

  const animatedProps = useAnimatedProps(() => {
    let path = '';

    for (let i = CIRCLE_START; i <= (SEGMENTS + CIRCLE_START ); i++) {
      const angle = (i / SEGMENTS) * 2 * Math.PI;
      const baseX = CENTER_X + RADIUS * Math.cos(angle);
      const baseY = CENTER_Y + RADIUS * Math.sin(angle);
      
      const lineX = (0.5 * CENTER_X - RADIUS) + LINE_WIDTH * (i / SEGMENTS);
      
      // Interpolate between circle and line
      const x = baseX + (lineX - baseX) * progress.value;
      const y = baseY + (CENTER_Y - baseY) * progress.value;
      
      if (i === CIRCLE_START) {
        path += `M ${x} ${y}`;
      } else {
        path += `\nL ${x} ${y}`; 
      }
    }

    return {     
       d: path
    };
  });

  return (
    <View style={styles.container}>
      <Svg viewBox="0 0 300 300">
        <AnimatedLine
          stroke="moccasin"
          strokeWidth={20}
          animatedProps={animatedProps}
          fill="none"
          strokeLinecap={'round'}
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
