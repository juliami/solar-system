import { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedRef, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import SvgPlanet from './svg-planet';


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


    const planetStyle = useMemo(() => {
        return {
            height: planetSize,
            width: planetSize,
        };
    }, [planetSize]);



    const orbitStyle = useMemo(() => {
        return {
            height: 2 * distanceFromSun,
            width: 2 * distanceFromSun,
            borderColor: color,
        };
    }, [color, distanceFromSun]);


    const animatedStyle = useAnimatedStyle(() => {
        const angle = progress.value * 2 * Math.PI;
        const sinAngle = Math.sin(angle);

        const x = Math.cos(angle) * distanceFromSun;
        const y = sinAngle * distanceFromSun;

        const depthScale = 1 + sinAngle * 0.2;
        const zIndex = Math.round(10 + sinAngle * 9);

        return {
            zIndex,
            transform: [
                { perspective: 1000 },
                { rotateX: '70deg' },
                { translateX: x },
                { translateY: y },
                { rotateX: '-70deg' },
                { scale: depthScale },
            ]
        };
    });

    return <>
        <Animated.View style={[styles.orbit, orbitStyle]} ref={ref} />
        <Animated.View style={[styles.planet, planetStyle, animatedStyle]}>
            <SvgPlanet color={color} />
        </Animated.View>
    </>
};

export const StaticPlanet = ({ color, distance = 1, size = 1 }: PlanetProps) => {
    const planetSize = EARTH_SIZE * size;

    return (
        <View style={[styles.planet, { height: planetSize, width: planetSize, zIndex: 10 }]}>
            <SvgPlanet color={color} />
        </View>
    );
};

const styles = StyleSheet.create({
    planet: {
        position: 'absolute',
        borderRadius: 9999, 
        transformOrigin: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },

    orbit: {
        position: 'absolute',
        borderRadius: 9999,
        borderWidth: 1,
        opacity: 0.8,
        transform: [{ perspective: 1000 }, { rotateX: '70deg' }],
        transformOrigin: 'center',
    },
});
