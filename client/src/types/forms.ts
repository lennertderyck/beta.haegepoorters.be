import { InputHTMLAttributes, SelectHTMLAttributes } from "react";

export type BaseFormControl<T = InputHTMLAttributes<HTMLInputElement>> = T & {
    name: string;
};
export interface FormControlField extends BaseFormControl {
    step?: number;
    min?: number;
    max?: number;
}

export type CustomControllable<T extends string | number | symbol = ""> = Omit<FormControlField, "list" | "type" | "placeholder" | T>;

export interface FormControlSelect extends BaseFormControl<SelectHTMLAttributes<HTMLSelectElement>> {}

export interface FormControlRange extends CustomControllable<"onChange"> {
    onChange?: (value: number) => void;
}

export interface FormControlToggle extends CustomControllable {}