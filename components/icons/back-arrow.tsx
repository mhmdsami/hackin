import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const BackArrow = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.5 10h-15M10 17.5 2.5 10 10 2.5"
    />
  </Svg>
);

export default BackArrow;
