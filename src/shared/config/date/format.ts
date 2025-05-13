export const dateFormatTypes = {
  slash: "DD/MM/YYYY",
  dotted: "DD.MM.YYYY",
  hyphen: "DD-MM-YYYY",
} as const;
export type DateFormatType = keyof typeof dateFormatTypes;
