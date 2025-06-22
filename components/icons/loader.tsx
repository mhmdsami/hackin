import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { View, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";

const Loader = (props: SvgProps) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  return (
    <Animated.View style={animatedStyle}>
      <Svg width={20} height={20} fill="none" {...props}>
        <Path
          stroke="#A4563B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.25}
          d="M3.326 1.667v2.61c0 .245.306.356.462.167A8.333 8.333 0 1 1 1.667 10"
        />
      </Svg>
    </Animated.View>
  );
};

export default Loader;
