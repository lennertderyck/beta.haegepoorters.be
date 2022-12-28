/* istanbul ignore file */
import {useMemo} from "react";
import {useForm, useFormContext} from "react-hook-form";
import UseControlledInputs from "./useControlledInputs.types";

/**
 * Conditionally return the form context controls
 */
const useControlledInputs: UseControlledInputs = (name, registerOptions) => {
  const formContext = useFormContext();
  const inContext = useMemo(() => !!formContext, [formContext]);
  const hasNameAssigned = useMemo(() => name !== undefined, [name]);
  const isControlled = useMemo(() => inContext && hasNameAssigned, [inContext, hasNameAssigned]);
  const uncontrolledContext = useForm();

  const conditionalContextRegister = useMemo(() => {
    if (isControlled) {
      return formContext?.register(name as string, {
        shouldUnregister: true,
        ...registerOptions,
      });
    } else {
      return null;
    }
  }, [formContext, isControlled, name, registerOptions]);

  return [
    conditionalContextRegister,
    {
      formContext: isControlled ? formContext : uncontrolledContext,
      isControlled,
    },
  ];
};

export default useControlledInputs;
