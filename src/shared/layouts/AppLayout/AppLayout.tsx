import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { PropsWithChildren } from "react";
import { Head } from "@/widgets/Head/Head";
import { WebSocketProvider } from "@/widgets/Head/WebSocketProvider/WebSocketProvider";

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Main Content */}
      <WebSocketProvider>
        <Head />
      </WebSocketProvider>
      <Content
        style={{
          background: "#F5F5F5",
          padding: "24px 100px",
          overflow: "hidden",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};
