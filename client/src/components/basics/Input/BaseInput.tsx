import { FC, InputHTMLAttributes } from "react";
import { numberTypeValueIsNotNaN } from "../../../utils/funcs/forms/validators";
import useControlledInputs from "../../../utils/hooks/useControlledInputs/useControlledInputs";
import { dateInputLikeFormatter } from "./Input.utils";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>, "name"> {
  name: string;
}

const BaseInput: FC<Props> = ({ name, list, defaultValue, ...otherProps }) => {
  const [registrar, {formContext}] = useControlledInputs(name, {
    valueAsNumber: otherProps.type === "number",
    // valueAsDate: otherProps.type === "date" || otherProps.type === "datetime-local",
    validate: {
      numberTypeValueIsNotNaN: numberTypeValueIsNotNaN(otherProps.type || "text"),
    },
    setValueAs: (value: any) => {
      switch (otherProps.type) {
        case "date":
        case "datetime-local":
          return dateInputLikeFormatter(value, otherProps.type);
        default:
          return value;
      }
    }
  });
      
  if (otherProps.type === 'select') return <select {...registrar} defaultValue={formContext.formState.defaultValues?.[name]} {...otherProps} />
  else return <input {...registrar} defaultValue={formContext.formState.defaultValues?.[name]} {...otherProps} />;
};

export default BaseInput;
