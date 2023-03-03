import classNames from "classnames";
import {FC, PropsWithChildren, FormHTMLAttributes, forwardRef, useCallback} from "react";
import {FormProvider, useForm} from "react-hook-form";
import styles from './ControlledForm.module.scss';

interface Props extends PropsWithChildren, FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: any;
  defaultValues?: any;
  onChange?: (values: any) => void;
}

type Ref = HTMLFormElement;

const ControlledForm = forwardRef<Ref, Props>(({children, onSubmit, className, defaultValues, onChange, ...otherProps}, ref) => {
  const methods = useForm({ 
    defaultValues,
  });
  
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
