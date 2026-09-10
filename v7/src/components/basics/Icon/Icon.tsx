import { FC } from "react";
import glyph from "remixicon/fonts/remixicon.glyph.json";
import remix from "remixicon/fonts/remixicon.symbol.svg";
import Svg, { SvgProps } from "./Svg";

type IconName = keyof typeof glyph;

interface IconProps extends SvgProps {
  color?: string;
  line?: boolean;
  fill?: boolean;
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
  fill,
  noStyle,
  name = "admin",
  className
}) => {
  const nameAndStyleSeperator = noStyle ? "" : "-";
  const iconStyle = fill ? "fill" : "line";
  const iconName = `${name}${nameAndStyleSeperator}${iconStyle}`;

  return (
    <Svg {...{ color, size, className }}>
      <use href={remix + `#ri-${name}`}></use>
    </Svg>
  );
};

export type { IconName };
export default Icon;
