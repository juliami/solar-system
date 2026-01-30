import { useEffect, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { Easing, useAnimatedRef, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(Text);

const EARTH_ORBIT_SPEED = 4000;
const EARTH_SPIN_SPEED = 4000;
const EARTH_SIZE = 90;
const EARTH_DISTANCE = 300;


interface PlanetProps {
    symbol: string;
    color: string;
    distance?: number;
    size?: number;
    orbitSpeed?: number;
    spinSpeed?: number;
}

export const Planet = ({ symbol, color, distance = 1, size = 1, orbitSpeed = 1, spinSpeed = 1 }: PlanetProps) => {
    const ref = useAnimatedRef()

    const progress = useSharedValue(0);
    const spinProgress = useSharedValue(0);

    const planetSize = EARTH_SIZE * size;
    const planetOrbitSpeed = EARTH_ORBIT_SPEED * orbitSpeed;
    const planetSpinSpeed = EARTH_SPIN_SPEED * spinSpeed;
    const distanceFromSun = EARTH_DISTANCE * distance;


    useEffect(() => {
        progress.value = withRepeat(
            withTiming(1, {
                duration: planetOrbitSpeed,
                easing: Easing.linear,
            }),
            -1,
            false
        );
    }, [planetOrbitSpeed]);

    useEffect(() => {
        spinProgress.value = withRepeat(
            withTiming(1, {
                duration: planetSpinSpeed,
                easing: Easing.linear,
            }),
            -1,
            false
        );
    }, [planetSpinSpeed]);


    const planetStyle = useMemo(() => {
        return {
            backgroundColor: color,
            height: planetSize,
            width: planetSize,
            lineHeight: planetSize,
        };
    }, [color, planetSize]);

    const orbitStyle = useMemo(() => {
        return {
            height: 2 * distanceFromSun,
            width: 2 * distanceFromSun,
            borderColor: color,
        };
    }, [color, distanceFromSun]);

    // 0 deg: [1, 0, 0, 1, 0, 0]
    // 90 deg: [0, 1, -1, 0, 0, 0]
    // 180 deg: [-1, 0, 0, -1, 0, 0]
    // 270 deg: [0, -1, 1, 0, 0, 0]
    // 360 deg: [1, 0, 0, 1, 0, 0]

    const animatedStyle = useAnimatedStyle(() => {
        const angle = progress.value * 2 * Math.PI;
        const spinAngle = spinProgress.value * 2 * Math.PI;

        const x = Math.cos(angle) * distanceFromSun;
        const y = Math.sin(angle) * distanceFromSun;
        
        // Rotation matrix components
        const cos = Math.cos(spinAngle);
        const sin = Math.sin(spinAngle);
        
        // Combined rotation + translation matrix (4x4)
        // [cos,  sin, 0, 0]
        // [-sin, cos, 0, 0]
        // [0,    0,   1, 0]
        // [x,    y,   0, 1]
        return {
            transform: [
                { translateX: x },
                { translateY: y },
                { rotate: `${spinAngle}rad` }
            ]
        };
    });

    return <>
        <Animated.View style={[styles.orbit, orbitStyle]} ref={ref} />
        <AnimatedText style={[styles.planet, planetStyle, animatedStyle]}>
            {symbol}
        </AnimatedText>
    </>
};



const styles = StyleSheet.create({
    planet: {
        fontSize: 20,
        position: 'absolute',
        borderRadius: 9999, // Large number for circular shape
        display: 'flex',
        transformOrigin: 'center',  
        alignItems: 'center',
        justifyContent: 'center',
    },
    orbit: {
        position: 'absolute',
        borderRadius: 9999, // Large number for circular shape
        borderWidth: 1,
        opacity: 0.8,
    },
});
