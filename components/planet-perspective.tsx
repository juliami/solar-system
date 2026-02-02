import { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedRef, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import SvgPlanet from './svg-planet';

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(View);

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
        const spinAngle = spinProgress.value * 2 * Math.PI;

        const x = Math.cos(angle) * distanceFromSun;
        const y = Math.sin(angle) * distanceFromSun;
        
        const depthScale = 1 + Math.sin(angle) * 0.4;
        const zIndex = Math.round(10 + Math.sin(angle) * 9);

        return {
            zIndex,
            transform: [
                { perspective: 1000 },
                { rotateX: '70deg' },
                { translateX: x },
                { translateY: y },
                { rotateX: '-70deg' },
                { rotate: `${spinAngle}rad` },
                { scale: depthScale },
            ]
        };
    });

    return <>
        <Animated.View style={[styles.orbit, orbitStyle]} ref={ref} />
        <AnimatedView style={[styles.planet, planetStyle, animatedStyle]}>
            <SvgPlanet color={color} />
        </AnimatedView>
    </>
};

export const StaticPlanet = ({  color, distance = 1, size = 1 }: PlanetProps) => {
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
        borderRadius: 9999, // Large number for circular shape
        transformOrigin: 'center',  
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
 
    orbit: {
        position: 'absolute',
        borderRadius: 9999, // Large number for circular shape
        borderWidth: 1,
        opacity: 0.8,
        transform: [{ perspective: 1000 }, { rotateX: '70deg' }],
        transformOrigin: 'center',
    },
});
