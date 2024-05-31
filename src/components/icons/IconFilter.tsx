import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function IconFilter(props: SvgProps) {
  return (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 512 512"
      height="200px"
      width="200px"
      {...props}
    >
      <Path
        d="M472 168H40a24 24 0 010-48h432a24 24 0 010 48zm-80 112H120a24 24 0 010-48h272a24 24 0 010 48zm-96 112h-80a24 24 0 010-48h80a24 24 0 010 48z"
        stroke="none"
      />
    </Svg>
  );
}

export default IconFilter;
