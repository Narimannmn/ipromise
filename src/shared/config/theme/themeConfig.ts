import { theme as defaultTheme, ThemeConfig } from "antd";

export const HEADER_HEIGHT = 48;
export const SIDEBAR_WIDTH = 250;

export const theme: ThemeConfig = {
  algorithm: defaultTheme.defaultAlgorithm,
  cssVar: {
    prefix: "app-",
  },

  components: {
    Layout: {
      headerHeight: HEADER_HEIGHT,
      headerBg: "#ffffff",
    },
    Table: {
      headerBg: "#ffffff",
      padding: 18,
    },
    Timeline: {
      itemPaddingBottom: 48,
    },
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
    Form: {
      itemMarginBottom: 0,
      verticalLabelPadding: "0 0 4px",
    },
    Input: {
      paddingBlock: 8,
      paddingInline: 16,
    },
    Button: {
      paddingBlock: 80,
      paddingBlockLG: 80,
    },
    Menu: {
      iconSize: 14,
      itemHeight: 2,
      iconMarginInlineEnd: 10,
      itemPaddingInline: 20,
    },
    Avatar: {
      containerSize: 44,
      containerSizeLG: 54,
      containerSizeSM: 24,
    },
    Card: {
      bodyPadding: 16,
      headerPadding: 16,
    },
  },
  token: {
    colorText: "#1a3353",
    colorPrimary: "#366ef6",
    colorInfo: "#366ef6",
    borderRadiusLG: 16,
    borderRadius: 8,
  },
};
