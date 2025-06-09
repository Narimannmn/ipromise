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

          if (Notification.permission === "granted") {
            if (document.hidden) {
              new Notification("New Notification", {
                body: data.message,
                icon: "/logo.svg",
              });
            } else {
              notification.open({
                message: "New Notification",
                description: data.message,
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

    ws.onclose = () => {
      console.error({ message: "❌ WebSocket closed" });
    };

    ws.onerror = (err) => {
      console.error({ message: `🚨 WebSocket error: ${err}` });
    };

    return () => {
      ws.close();
    };
  }, [tokens?.access_token]);

  return <>{children}</>;
};
