import {FC, HTMLInputTypeAttribute, useMemo} from "react";
import classNames from "classnames";
import {ListSuggestion} from "./Input.types";
import BaseInput from "./BaseInput";
import styles from './Input.module.scss';
import { FormControlField } from "../../../types/forms";
import DatalistInput from "../DatalistInput/DatalistInput";
import TextArea from "../TextArea/TextArea";

interface Props extends Omit<FormControlField, 'list' | 'type'> {
  /**
   * Replaces the native list property.
   * Instead of using an id of a datalist, enter an array of values
   */
  list?: ListSuggestion[];
  type?: Exclude<HTMLInputTypeAttribute, 'range'> | 'select' | 'textarea';
}

const Input: FC<Props> = ({name, className, list, ...otherProps}) => {
  const bootstrapFormControlClass = useMemo(() => {
    switch (otherProps.type) {
      case "checkbox":
        return styles.checkbox;
      case "radio":
        return "form-check-input";
      case "range":
        return styles.range;
      case "submit":
        return styles.submit;
      default:
        return styles.field;
    }
  }, [otherProps.type]);
    
  const componentClassName = useMemo(() => classNames(
    className, bootstrapFormControlClass
  ), [className, bootstrapFormControlClass])
  
  if (otherProps.type === "range") throw new Error('Use the RangeInput component to render and control range inputs');
  else if (otherProps.type === 'textarea') return <TextArea name={ name } className={ componentClassName } />
  else if (list !== undefined) return <DatalistInput name={name} className={ componentClassName } list={list || []} {...otherProps} />
  else return <BaseInput name={name} className={ componentClassName } {...otherProps} />;
};

export default Input;