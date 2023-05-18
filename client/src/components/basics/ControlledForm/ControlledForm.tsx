import classNames from "classnames";
import {PropsWithChildren, FormHTMLAttributes, forwardRef, useCallback, ForwardRefRenderFunction} from "react";
import {FormProvider, UseFormReturn, useForm} from "react-hook-form";
import styles from './ControlledForm.module.scss';

interface BaseProps extends PropsWithChildren, FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: any;
  onChange?: (values: any) => void;
}

export interface ControlledFormProps extends BaseProps {
  defaultValues?: any;
  remote?: UseFormReturn;
}

type Ref = HTMLFormElement;

const ControlledForm = forwardRef<Ref, ControlledFormProps>(({ children, onSubmit, className, defaultValues, onChange, remote, ...otherProps}, ref) => {
  const controlsInstance = useForm({ 
    defaultValues,
  });
  
  const methods = remote || controlsInstance;
  
  const handleOnChange = useCallback(() => {
    if (onChange) {
      const values = methods.getValues();
      onChange?.(values);
    }
  }, [onChange, methods.getValues])

  return (
    <FormProvider {...methods} {...otherProps}>
      <form 
        className={classNames(styles.form, className)} 
        onSubmit={methods.handleSubmit(onSubmit)}
        onChange={handleOnChange}
      >
        {children}
      </form>
    </FormProvider>
  );
});

export default ControlledForm;
