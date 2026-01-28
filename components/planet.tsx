import { useEffect, useMemo } from 'react';
import { Easing, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(Text);


const EARTH_ORBIT_SPEED = 4000;
const EARTH_SIZE = 80;
const EARTH_DISTANCE = 300;


interface PlanetProps {
    symbol: string;
    color: string;
    distance?: number;
    size?: number;
    orbitSpeed?: number;
}

export const Planet = ({ symbol, color, distance = 1, size = 1, orbitSpeed = 1 }: PlanetProps) => {

    const progress = useSharedValue(0);


    // 0 deg: [1, 0, 0, 1, 0, 0]
    // 90 deg: [0, 1, -1, 0, 0, 0]
    // 180 deg: [-1, 0, 0, -1, 0, 0]
    // 270 deg: [0, -1, 1, 0, 0, 0]
    // 360 deg: [1, 0, 0, 1, 0, 0]


    const planetSize = EARTH_SIZE * size;
    const duration = EARTH_ORBIT_SPEED * orbitSpeed;
    const distanceFromSun = EARTH_DISTANCE * distance;


    useEffect(() => {
        progress.value = withRepeat(
            withTiming(1, {
                duration,
                easing: Easing.linear,
            }),
            -1,
            false
        );
    }, []);

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

    const animatedStyle = useAnimatedStyle(() => {
        const angle = progress.value * 2 * Math.PI;

        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const x = cos * distanceFromSun;
        const y = sin * distanceFromSun;

        return {
            transform: [
                { translateX: x },
                { translateY: y },
                { matrix: [cos, sin, -sin, cos, 0, 0] },
            ],
        };
    });





    return <>
        <View style={[styles.orbit, orbitStyle]}></View>
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
        backgroundColor: 'red',
    },
    orbit: {
        position: 'absolute',
        borderRadius: '50%',
        borderWidth: 1,
        opacity: 0.5,

    },

    planetContent: {
        transformOrigin: 'center',
        position: 'absolute',
        backgroundColor: 'indianred',
    }
});
