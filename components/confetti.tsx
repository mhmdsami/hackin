import * as React from "react";
import Svg, {
  Defs,
  LinearGradient,
  Path,
  Stop,
  SvgProps,
} from "react-native-svg";

const Confetti = (props: SvgProps) => (
  <Svg width={71} height={70} fill="none" {...props}>
    <Path
      fill="url(#a)"
      d="M20.381 9.602 1.317 61.649c-1.833 5.005 3.082 9.838 8.055 7.921l51.563-19.876L20.381 9.602Z"
    />
    <Path
      fill="#A0034E"
      d="M60.985 49.645c2.785-2.786-3.983-14.07-15.118-25.205C34.73 13.305 23.447 6.536 20.66 9.32c-2.785 2.786 3.983 14.07 15.118 25.206C46.914 45.662 58.2 52.43 60.985 49.645Z"
    />
    <Path
      fill="url(#b)"
      fillRule="evenodd"
      d="M32.25 27.508a3.166 3.166 0 0 0 4.076-1.851c.886-2.365 2.193-4.226 6.874-7.84 6.984-5.39 6.3-14.539 6.268-14.925A3.148 3.148 0 0 0 46.067.01a3.173 3.173 0 0 0-2.908 3.394c.004.061.395 6.142-3.827 9.401-5.207 4.02-7.461 6.7-8.934 10.627a3.165 3.165 0 0 0 1.851 4.075Zm14.443 6.434a3.165 3.165 0 0 0 3.36-2.959c.064-1.021.495-1.82 1.28-2.373 1.403-.988 3.704-1.122 6.315-.368 4.606 1.329 7.547.122 9.203-1.124 3.87-2.911 3.982-8.234 3.982-8.83a3.155 3.155 0 0 0-3.142-3.154h-.024c-1.728 0-3.14 1.4-3.165 3.131-.01.712-.302 2.939-1.468 3.803-.915.678-2.48.424-3.63.092-4.53-1.308-8.69-.855-11.714 1.274-2.364 1.664-3.769 4.203-3.956 7.15a3.165 3.165 0 0 0 2.959 3.358Z"
      clipRule="evenodd"
    />
    <Path
      fill="url(#c)"
      fillRule="evenodd"
      d="M15.323 8.914a6.22 6.22 0 1 1-12.44 0 6.22 6.22 0 0 1 12.44 0Zm41.957 5.804a5.116 5.116 0 1 0 0-10.232 5.116 5.116 0 0 0 0 10.232Zm3.655 29.296a4.214 4.214 0 1 0 0-8.427 4.214 4.214 0 0 0 0 8.427ZM8.36 24.924a3.454 3.454 0 1 1-6.907 0 3.454 3.454 0 0 1 6.907 0ZM54.8 67.74a4.14 4.14 0 1 0 0-8.281 4.14 4.14 0 0 0 0 8.281Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={-7.472}
        x2={40.674}
        y1={20.693}
        y2={78.25}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFEBF4" />
        <Stop offset={1} stopColor="#F75FA7" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={24.509}
        x2={50.27}
        y1={6.234}
        y2={43.337}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFEBF4" />
        <Stop offset={1} stopColor="#F75FA7" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={-7.46}
        x2={44.519}
        y1={14.639}
        y2={75.882}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFEBF4" />
        <Stop offset={1} stopColor="#F75FA7" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default Confetti;
