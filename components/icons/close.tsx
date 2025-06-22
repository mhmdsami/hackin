import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const Close = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill="#444"
      fillRule="evenodd"
      d="M13.687 2.313a.5.5 0 0 1 0 .707L3.02 13.687a.5.5 0 1 1-.707-.707L12.98 2.313a.5.5 0 0 1 .707 0Z"
      clipRule="evenodd"
    />
    <Path
      fill="#444"
      fillRule="evenodd"
      d="M2.313 2.313a.5.5 0 0 1 .707 0L13.687 12.98a.5.5 0 0 1-.707.707L2.313 3.02a.5.5 0 0 1 0-.707Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default Close;
