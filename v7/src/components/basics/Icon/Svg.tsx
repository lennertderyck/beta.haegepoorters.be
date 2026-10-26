import type { FC, SVGProps } from "react";

export type SvgProps = Omit<SVGProps<SVGSVGElement>, "fill"> & {
  size?: ".8rem" | "1rem" | "1.3rem" | "1.6rem" | string;
  color?: string;
};

const Svg: FC<SvgProps> = ({ color, size, ...props }) => (
  <svg {...props} fill={color} width={size} height={size} />
);

export default Svg;
