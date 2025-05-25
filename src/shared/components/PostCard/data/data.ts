import { theme as defaultTheme, ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  algorithm: defaultTheme.defaultAlgorithm,
  cssVar: {
    prefix: "app-",
  },

  components: {
    Card: {
      bodyPadding: 16,
      headerPadding: 16,
      headerHeight: 78,
    },
    Statistic: {
      contentFontSize: 18,
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
