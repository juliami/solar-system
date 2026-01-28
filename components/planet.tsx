import { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

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
    const rotation = useSharedValue(0);

    const planetSize = EARTH_SIZE * size;
    const duration = EARTH_ORBIT_SPEED * orbitSpeed;
    const translateX = EARTH_DISTANCE * distance;

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, {
                duration,
                easing: Easing.linear,
            }),
            -1,
            false
        );
    }, []);

    const customPlanetStyle = useMemo(() => {
        return {
            backgroundColor: color,
            height: planetSize,
            width: planetSize,
            lineHeight: planetSize,
        };
    }, [color, planetSize]);



    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${rotation.value}deg` },
                { translateX },
                { rotate: `${rotation.value}deg` },

            ],
        };
    });

    return <>
        <View style={[styles.orbit, { height: 2 * translateX, width: 2 * translateX, borderColor: color, opacity: 0.5 }]}></View>
        <AnimatedText style={[styles.planet, customPlanetStyle, animatedStyle]}>{symbol}</AnimatedText>
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

    },
});
