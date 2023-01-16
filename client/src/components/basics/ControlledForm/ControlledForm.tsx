import classNames from "classnames";
import {FC, PropsWithChildren, FormHTMLAttributes, forwardRef} from "react";
import {FormProvider, useForm} from "react-hook-form";
import styles from './ControlledForm.module.scss';

interface Props extends PropsWithChildren, FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: any;
  defaultValues?: any;
}

type Ref = HTMLFormElement;

const ControlledForm = forwardRef<Ref, Props>(({children, onSubmit, className, defaultValues, ...otherProps}, ref) => {
  const methods = useForm({ 
    defaultValues,
  });

  return (
    <FormProvider {...methods} {...otherProps}>
      <form ref={ ref } className={classNames(styles.form, className)} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
});

export default ControlledForm;
