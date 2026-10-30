import { cn } from "@/lib/utils/composers";
import { ComponentProps, FC } from "react";

const ImportList: FC<ComponentProps<"table">> = ({
  className,
  ...otherProps
}) => {
  return <table className={cn("w-full", className)} {...otherProps} />;
};

export const ImportListRow: FC<ComponentProps<"tr">> = ({
  className,
  ...otherProps
}) => {
  return <tr className={cn("text-left *:p-3", className)} {...otherProps} />;
};

export const ImportListHeader: FC<ComponentProps<typeof ImportListRow>> = ({
  className,
  ...otherProps
}) => {
  return (
    <thead>
      <ImportListRow className={cn(className)} {...otherProps} />
    </thead>
  );
};

export const ImportListHeaderColumn: FC<ComponentProps<"th">> = ({
  className,
  ...otherProps
}) => {
  return <th className={cn("align-bottom", className)} {...otherProps} />;
};

export const ImportListContent: FC<ComponentProps<"tbody">> = ({
  className,
  ...otherProps
}) => {
  return <tbody className={cn(className)} {...otherProps} />;
};

export const ImportListColumn: FC<ComponentProps<"td">> = ({
  className,
  ...otherProps
}) => {
  return <td className={cn("", className)} {...otherProps} />;
};

export default ImportList;
