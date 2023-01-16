import classNames from "classnames";
import {FC, PropsWithChildren, FormHTMLAttributes} from "react";
import {FormProvider, useForm} from "react-hook-form";
import styles from './ControlledForm.module.scss';

interface Props extends PropsWithChildren, FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: any;
  defaultValues?: any;
}

const ControlledForm: FC<Props> = ({children, onSubmit, className, defaultValues, ...otherProps}) => {
  const methods = useForm({ 
    defaultValues,
  });

  return (
    <FormProvider {...methods} {...otherProps}>
      <form className={classNames(styles.form, className)} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default ControlledForm;
