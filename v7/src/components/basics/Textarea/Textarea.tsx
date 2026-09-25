import { ComponentProps, FC } from "react";
import Input from "../Input/Input";

const Textarea: FC<ComponentProps<"textarea">> = ({
  className,
  ...otherProps
}) => {
  return (
    <Input asChild>
      <textarea className={className} {...otherProps} />
    </Input>
  );
};

export default Textarea;
