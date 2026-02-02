import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedProps, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function SvgAnimatedPath() {
  const r = useSharedValue(90);

  // 90 => 900 (flat) => 90 (curve)

  const animatedProps = useAnimatedProps(() => {
    const radius = r.value
    return {     
       d: `M 10 100 
           A ${radius} 90 0 0 1 190 100
           A ${radius} 90 0 0 1 10 100`
    };
  });

  
  useEffect(() => {
    r.value = withRepeat(
      withSequence(
        withTiming(900, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1
    );
  }, []);



  return (
    <View style={styles.container}>

      <Svg viewBox="0 0 200 200">
        <AnimatedPath
          animatedProps={animatedProps}
          stroke="indianred"
          strokeWidth={2}
          fill="none"
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

  button: {
    backgroundColor: 'indianred',
    padding: 10,
    borderRadius: 5,
    marginTop: 80,
  },

  buttonText: {
    color: 'white',
  },
});
