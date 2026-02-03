import { StyleSheet } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

const SVGNightSky = () => (
 
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
    )


const styles = StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    },

});

export default SVGNightSky;