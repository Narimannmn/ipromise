import { Layout } from "antd";
import { PropsWithChildren } from "react";
import styles from "./AuthLayout.module.css";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout className={styles.authLayout}>
      <Layout.Content className={styles.authContent}>{children}</Layout.Content>
    </Layout>
  );
};
