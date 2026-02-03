import { adjustColor } from "@/utils/adjust-color";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";

const SVGPlanet = ({ color }: { color: string }) => {
    const gradientColors = useMemo(() => {
        return [
            adjustColor(color, 60),  
            color,          
            adjustColor(color, -40),
        ] as const;
    }, [color]);

    return (
        <Svg width="100%" height="100%" viewBox="0 0 100 100" style={styles.gradient}>
            <Defs>
                <RadialGradient
                    id={`grad-static-${color}`}
                    cx={"35%"}
                    cy={"35%"}
                    r={"65%"}
                >
                    <Stop offset="0%" stopColor={gradientColors[0]} stopOpacity="1" />
                    <Stop offset={"50%"} stopColor={gradientColors[1]} stopOpacity="1" />
                    <Stop offset="100%" stopColor={gradientColors[2]} stopOpacity="1" />
                </RadialGradient>
            </Defs>
            <Circle cx="50" cy="50" r="50" fill={`url(#grad-static-${color})`} />

        </Svg>
    )
}

const styles = StyleSheet.create({
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 9999,
    },

});

export default SVGPlanet;