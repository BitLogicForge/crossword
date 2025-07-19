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
export const DIRECTION = {
  H: "horizontal",
  V: "vertical",
} as const;

export const SYMBOL = {
  EMPTY: ".",
  BLOCKED: "#",
} as const;

export type TSymbol = (typeof SYMBOL)[keyof typeof SYMBOL];

export type TDirection = (typeof DIRECTION)[keyof typeof DIRECTION];
