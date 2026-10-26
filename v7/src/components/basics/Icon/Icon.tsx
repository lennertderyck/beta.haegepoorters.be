import { FC } from "react";
import glyph from "remixicon/fonts/remixicon.glyph.json";
import remix from "remixicon/fonts/remixicon.symbol.svg";
import Svg, { SvgProps } from "./Svg";

export type IconName = keyof typeof glyph;

interface IconProps extends SvgProps {
  color?: string;
  line?: boolean;
  name: IconName;
  className?: string;
  noStyle?: boolean;
}

/**
 *
 * @description Icons come from [Remixicons](https://remixicon.com/)
 */
const Icon: FC<IconProps> = ({
  color = "currentColor",
  size = "1.3rem",
  name = "admin",
  className
}) => {
  return (
    <Svg {...{ color, size, className }}>
      <use href={remix + `#ri-${name}`} />
    </Svg>
  );
};

export default Icon;
