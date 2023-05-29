export type WithVariants<Names, Required = false> = Required extends true
  ? {
      variant: Names;
    }
  : {
      variant?: Names;
    };