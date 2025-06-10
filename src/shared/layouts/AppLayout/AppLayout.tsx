import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { PropsWithChildren } from "react";
import { Head } from "@/widgets/Head/Head";
import { WebSocketProvider } from "@/widgets/Head/WebSocketProvider/WebSocketProvider";

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      {/* Main Content */}
      <WebSocketProvider>
        <Head />
      </WebSocketProvider>
      <Content
        style={{
          background: "#F5F5F5",
          overflow: "hidden",
          height: "calc(100vh - 48px)",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};
