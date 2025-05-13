import { clsx } from "clsx";
import { PropsWithChildren } from "react";
import styles from "./BaseLayout.module.css";

export interface BaseLayoutProps {
  className?: string;
}
export const BaseLayout = ({
  children,
  className,
}: PropsWithChildren<BaseLayoutProps>) => {
  return <main className={clsx(styles.layout, className)}>{children}</main>;
};
