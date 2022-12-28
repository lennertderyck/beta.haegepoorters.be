import { InputHTMLAttributes } from "react";

export const defaultValueToNumber = (defaultValue: InputHTMLAttributes<HTMLInputElement>['defaultValue']) => {
    if (defaultValue === undefined) return defaultValue;
    else if (typeof defaultValue === 'string') return parseInt(defaultValue)
    else if (typeof defaultValue === 'number') return defaultValue;
    else return parseInt(defaultValue[0]);
}