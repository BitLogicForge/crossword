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
