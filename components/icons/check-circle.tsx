import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";

const CheckCircle = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <G
      stroke="#088229"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#a)"
    >
      <Path d="M14.667 7.387V8a6.666 6.666 0 1 1-3.954-6.093" />
      <Path d="M14.667 2.667 8 9.34l-2-2" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default CheckCircle;
