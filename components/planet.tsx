import { useEffect, useMemo } from 'react';
import { Easing, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

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

        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        const cosSpinAngle = Math.cos(spinAngle);
        const sinSpinAngle = Math.sin(spinAngle);


        const x = cosAngle * distanceFromSun;
        const y = sinAngle * distanceFromSun;
        return {
            transform: [
                { translateX: x },
                { translateY: y },
                { matrix: [cosSpinAngle, sinSpinAngle, -sinSpinAngle, cosSpinAngle, 0, 0] },
            ],
        };
    });

    return <>
        <View style={[styles.orbit, orbitStyle]} />
        <AnimatedText style={[styles.planet, planetStyle, animatedStyle]}>
            {symbol}
        </AnimatedText>
    </>
};



const styles = StyleSheet.create({
    planet: {
        fontSize: 20,
        position: 'absolute',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transformOrigin: 'center',
    },
    orbit: {
        position: 'absolute',
        borderRadius: '50%',
        borderWidth: 1,
        opacity: 0.8,
    },
});
