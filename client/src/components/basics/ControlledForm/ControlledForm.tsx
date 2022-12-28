import classNames from "classnames";
import {FC, PropsWithChildren, FormHTMLAttributes} from "react";
import {FormProvider, useForm} from "react-hook-form";
import styles from './ControlledForm.module.scss';

interface Props extends PropsWithChildren, FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: any;
}

const ControlledForm: FC<Props> = ({children, onSubmit, className, ...otherProps}) => {
  const methods = useForm();

  return (
    <FormProvider {...methods} {...otherProps}>
      <form className={classNames(styles.form, className)} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default ControlledForm;
