import { theme as defaultTheme, ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  algorithm: defaultTheme.defaultAlgorithm,
  cssVar: {
    prefix: "app-",
  },
  components: {
    Form: {
      itemMarginBottom: 0,
      verticalLabelPadding: "0 0 4px",
    },
    Input: {
      paddingBlock: 8,
      paddingInline: 16,
    },
    Button: {
      controlHeight: 40, // sets vertical height of button
      // paddingInline: 24, // sets left/right padding
    },
  },
  token: {
    colorText: "#1a3353",
    colorPrimary: "#366ef6",
    colorInfo: "#366ef6",
    // borderRadius: 10,
  },
};
