import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const Upload = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <Path
      stroke="#444"
      strokeLinecap="round"
      strokeWidth={1.37}
      d="M16.5 3.667h-11"
    />
    <Path
      stroke="#444"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.37}
      d="M11 7.333v11M14.666 11S11.966 7.333 11 7.333C10.034 7.333 7.333 11 7.333 11"
    />
  </Svg>
);

export default Upload;
