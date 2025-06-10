import {
  ClockCircleOutlined,
  CommentOutlined,
  LikeOutlined,
  MessageOutlined,
  SafetyCertificateOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { notification } from "antd";
import { ReactNode, useEffect, useRef } from "react";
import { useAuthStore } from "@/entities/Auth/store/store";
import { getNotifications } from "@/entities/Notification/services/services";
import { useNotificationStore } from "@/entities/Notification/store/notificationStore";

type Props = {
  children: ReactNode;
};

export const WebSocketProvider = ({ children }: Props) => {
  const socketRef = useRef<WebSocket | null>(null);
  const { tokens } = useAuthStore();
  const { setNotifications, addNotification } = useNotificationStore();

  useEffect(() => {
    if (!tokens?.access_token) return;

    // Set auth cookie
    document.cookie = `access_token=${tokens.access_token}; path=/; SameSite=Lax`;

    // Load existing notifications
    getNotifications()
      .then((data) => {
        setNotifications(data);
      })
      .catch((err) => {
        console.error("❌ Failed to load notifications from REST:", err);
      });

    // Connect to WebSocket
    const ws = new WebSocket("ws://localhost:8080/ws/notifications");
    socketRef.current = ws;

    ws.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);

        if ("id" in data) {
          addNotification(data);

          const typeToEmoji: Record<string, string> = {
            like: "❤️",
            follow_request: "👥",
            badge_assigned: "🏅",
            deadline_reminder: "⏰",
            post_reply: "📝",
            comment_reply: "💬",
          };

          const typeToIcon: Record<string, JSX.Element> = {
            like: <LikeOutlined />,
            follow_request: <UserAddOutlined />,
            badge_assigned: <SafetyCertificateOutlined />,
            deadline_reminder: <ClockCircleOutlined />,
            post_reply: <MessageOutlined />,
            comment_reply: <CommentOutlined />,
          };

          const emoji = typeToEmoji[data.type] || "🔔";
          const icon = typeToIcon[data.type] || "";

          if (Notification.permission === "granted") {
            if (document.hidden) {
              // Native notification (icon must be string path)
              new Notification(`${emoji} New Notification`, {
                body: data.message,
                icon: "/logo.png",
              });
            } else {
              // Ant Design UI toast with React icon
              notification.open({
                message: `${emoji} New Notification`,
                description: data.message,
                icon: icon,
              });
            }
          } else if (Notification.permission === "default") {
            await Notification.requestPermission();
          }
        }
      } catch (e) {
        console.error("❌ Failed to parse WebSocket data:", e);
      }
    };

    ws.onerror = (err) => {
      console.error("🚨 WebSocket error:", err);
    };

    ws.onclose = (event) => {
      console.warn("❌ WebSocket closed", event);
    };

    return () => {
      ws.close();
    };
  }, [tokens?.access_token]);

  return <>{children}</>;
};
