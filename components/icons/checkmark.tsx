import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const Checkmark = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Path
      fill="#078842"
      d="M33.002 18c0-8.284-6.716-15-15-15-8.285 0-15 6.716-15 15 0 8.284 6.715 15 15 15 8.284 0 15-6.716 15-15Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m12.002 18.75 3.75 3.75 8.25-9"
    />
  </Svg>
);

export default Checkmark;
