"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/elements/Select/Select";

import { FC } from "react";
import { Controller } from "react-hook-form";

interface Props {
  name: string;
  roles: {
    value: string;
    label: string;
  }[];
}

const ImportListRoleSelect: FC<Props> = ({ name, roles }) => {
  const renderValue = (value: any) => {
    if (Array.isArray(value)) {
      if (value.length === 0) return "Geen rol geselecteerd";
      return value.length > 1
        ? `${value.length} rollen geselecteerd`
        : roles.find((role) => role.value === value[0])?.label;
    }
  };

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Select
          multiple
          value={field.value}
          onValueChange={field.onChange}
          onOpenChange={(state) => {
            if (state === false) {
              field.onBlur();
            }
          }}
        >
          <SelectTrigger>
            <SelectValue>{renderValue}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default ImportListRoleSelect;
