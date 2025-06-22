import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const Info = (props: SvgProps) => (
  <Svg
    width={14}
    height={15}
    fill="none"
    {...props}
  >
    <Path
      stroke="#B7017D"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 1.667a5.833 5.833 0 1 0 0 11.666A5.833 5.833 0 0 0 7 1.667ZM7 9.833V7.5M7 5.167h-.006"
    />
  </Svg>
)

export default Info;
