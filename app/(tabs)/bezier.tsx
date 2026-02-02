import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedProps, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function SvgAnimatedPath() {
  const r = useSharedValue(90);

  const animatedProps = useAnimatedProps(() => {
    const flatness = r.value; // 90 = circle, 900 = straight line
    const t = (flatness - 90) / (900 - 90); // 0 = circle, 1 = flat line
    
    const interpY = (circleY: number) => {
      return circleY + (100 - circleY) * t;
    };
    
  // circle:
    // d: ` M 100 10
    // C 149.7 10 190 50.3 190 100
    // C 190 149.7 149.7 190 100 190
    // C 50.3 190 10 149.7 10 100
    // C 10 50.3 50.3 10 100 10
    // Z`
    return {
      d: ` M 100 ${interpY(10)}
           C 149.7 ${interpY(10)} 190 ${interpY(50.3)} 190 ${interpY(100)}
           C 190 ${interpY(149.7)} 149.7 ${interpY(190)} 100 ${interpY(190)}
           C 50.3 ${interpY(190)} 10 ${interpY(149.7)} 10 ${interpY(100)}
           C 10 ${interpY(50.3)} 50.3 ${interpY(10)} 100 ${interpY(10)}
           Z`
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
      {/* <Pressable onPress={handleRadiusChange} style={styles.button}>
        <Text style={styles.buttonText}>Change Radius</Text>
      </Pressable> */}
      <Svg viewBox="0 0 200 200">
        <AnimatedPath
          animatedProps={animatedProps}
          stroke="skyblue"
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

  buttonText: {
    color: 'white',
  },
});
