import { theme as defaultTheme } from "antd";

export const ProfileAvatarCardTheme = {
  algorithm: defaultTheme.defaultAlgorithm,
  cssVar: {
    prefix: "app-",
  },
  components: {
    Card: {
      bodyPadding: 16,
      headerPadding: 16,
      headerHeight: 86,
    },
  },
};
