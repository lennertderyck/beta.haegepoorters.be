/* istanbul ignore file */
import {FieldValues, RegisterOptions, UseFormRegisterReturn, UseFormReturn} from "react-hook-form";

interface UseControlledInputProperties {
  formContext: UseFormReturn<FieldValues, any>;
  isControlled: boolean;
}

type Registrar = UseFormRegisterReturn<string> | null;

type UseControlledInputs = (
  name: string,
  registerOptions?: RegisterOptions
) => [Registrar, UseControlledInputProperties];

export default UseControlledInputs;
