import { theme as defaultTheme } from "antd";

export const PromiseCrudFormTheme = {
  algorithm: defaultTheme.defaultAlgorithm,
  cssVar: {
    prefix: "app-",
  },
  components: {
    Form: {
      itemMarginBottom: 8,
      verticalLabelMargin: "0 0 4px",
    },
    Input: {
      paddingInline: 12,
      paddingBlock: 4,
    },
    DatePicker: {
      paddingInline: 12,
      paddingBlock: 4,
    },
    Card: {
      bodyPadding: 16,
      headerPadding: 16,
    },
  },
  token: {
    paddingLG: 16,
  },
};
