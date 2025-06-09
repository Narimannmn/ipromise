import { Card, Empty, Typography } from "antd";
import { useNotificationStore } from "@/entities/Notification/store/notificationStore";

export const NotificationsBlock = () => {
  const { notifications } = useNotificationStore();

  const latestNotifications = notifications?.slice(-3).reverse();

  return (
    <Card title='Notifications'>
      {latestNotifications && latestNotifications.length > 0 ? (
        <div className='flex flex-col gap-2'>
          {latestNotifications.map((notification) => (
            <div key={notification.id}>
              <Typography.Text>{notification.message}</Typography.Text>
            </div>
          ))}
        </div>
      ) : (
        <Empty description='No notifications' />
      )}
    </Card>
  );
};
