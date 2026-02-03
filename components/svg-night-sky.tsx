import { useEffect, useMemo } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import Svg, { Circle, Defs, RadialGradient, Rect, Stop } from "react-native-svg";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ANIMATION_HEIGHT = 2000;

// Generate random stars for a layer with varied brightness and size
const generateStars = (count: number, baseSize: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * SCREEN_WIDTH,
        y: Math.random() * ANIMATION_HEIGHT,
        size: baseSize * (0.8 + Math.random() * 0.8), // 80% to 160% of base size
        opacity: 0.3 + Math.random() * 0.6, // 30% to 90% opacity
    }));
};

// Star layer component with animation
const StarLayer = ({ stars, duration }: { stars: Array<{ id: number; x: number; y: number; size: number; opacity: number }>; duration: number }) => {
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withRepeat(
            withTiming(1, {
                duration,
                easing: Easing.linear,
            }),
            -1,
            false
        );
    }, [duration]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: -progress.value * ANIMATION_HEIGHT }
            ]
        };
    });

    return (
        <Animated.View style={[styles.starLayer, animatedStyle]}>
            <Svg width={SCREEN_WIDTH} height={ANIMATION_HEIGHT * 2} style={styles.svg}>
                {/* First set of stars */}
                {stars.map(star => (
                    <Circle
                        key={`star-${star.id}`}
                        cx={star.x}
                        cy={star.y}
                        r={star.size}
                        fill="#FFFFFF"
                        opacity={star.opacity}
                    />
                ))}
                {/* Duplicate set for seamless loop */}
                {stars.map(star => (
                    <Circle
                        key={`star-dup-${star.id}`}
                        cx={star.x}
                        cy={star.y + ANIMATION_HEIGHT}
                        r={star.size}
                        fill="#FFFFFF"
                        opacity={star.opacity}
                    />
                ))}
            </Svg>
        </Animated.View>
    );
};

const SVGNightSky = () => {
    // Generate stars once - reduced counts for better performance
    const smallStars = useMemo(() => generateStars(200, 0.5), []);
    const mediumStars = useMemo(() => generateStars(75, 1), []);
    const largeStars = useMemo(() => generateStars(40, 1.5), []);

    return (
        <>
            {/* Background gradient */}
            <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={styles.gradient}>
                <Defs>
                    <RadialGradient
                        id={`grad-static-sky`}
                        cx="50%"
                        cy="50%"
                        r="70%"
                    >
                        <Stop offset="0%" stopColor={'#000000'} stopOpacity="1" />
                        <Stop offset="20%" stopColor={'#050510'} stopOpacity="1" />
                        <Stop offset="40%" stopColor={'#0a0a15'} stopOpacity="1" />
                        <Stop offset="60%" stopColor={'#0f0f1e'} stopOpacity="1" />
                        <Stop offset="80%" stopColor={'#141428'} stopOpacity="1" />
                        <Stop offset="100%" stopColor={'#1a1a30'} stopOpacity="1" />
                    </RadialGradient>
                </Defs>
                <Rect x="0" y="0" width="100" height="100" fill="url(#grad-static-sky)" />
            </Svg>

            {/* Parallax star layers - slowest to fastest */}
            <StarLayer stars={largeStars} duration={150000} />
            <StarLayer stars={mediumStars} duration={100000} />
            <StarLayer stars={smallStars} duration={50000} />
        </>
    );
};

const styles = StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    starLayer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    svg: {
        position: 'absolute',
    }
});

export default SVGNightSky;