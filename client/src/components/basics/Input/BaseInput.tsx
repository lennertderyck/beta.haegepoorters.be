import {FC, InputHTMLAttributes} from "react";
import {numberTypeValueIsNotNaN} from "../../../utils/funcs/forms/validators";
import useControlledInputs from "../../../utils/hooks/useControlledInputs/useControlledInputs";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>, "name"> {
  name: string;
}

const BaseInput: FC<Props> = ({ name, list, ...otherProps }) => {
  const [registrar] = useControlledInputs(name, {
    valueAsNumber: otherProps.type === "number",
    valueAsDate: otherProps.type === "date" || otherProps.type === "datetime-local",
    validate: {
      numberTypeValueIsNotNaN: numberTypeValueIsNotNaN(otherProps.type || "text"),
    },
  });
  
  if (otherProps.type === 'select') return <select {...registrar} {...otherProps} />
  else return <input {...registrar} {...otherProps} />;
};

export default BaseInput;
