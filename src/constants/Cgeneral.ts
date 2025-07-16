export const SEVERITY = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
} as const;
export type TSeverity = (typeof SEVERITY)[keyof typeof SEVERITY];

export const SIZES = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
} as const;

export type TSize = (typeof SIZES)[keyof typeof SIZES];
