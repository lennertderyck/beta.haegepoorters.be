import { ComponentProps, FC } from "react";

const Input: FC<ComponentProps<"input">> = ({ ...otherProps }) => {
  return <input {...otherProps} />;
};

export default Input;
