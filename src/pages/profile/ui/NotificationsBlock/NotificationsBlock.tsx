import { Card, Empty, List, Typography } from "antd";
import dayjs from "dayjs";
import { useNotificationStore } from "@/entities/Notification/store/notificationStore";
import styles from "./NotificationsBlock.module.css";

export const NotificationsBlock = () => {
  const { notifications } = useNotificationStore();
  const latestNotifications = notifications?.slice(-3).reverse();

  return (
    <Card
      title='Notifications'
      className='rounded-xl shadow-sm'
    >
      {latestNotifications && latestNotifications.length > 0 ? (
        <div className='flex flex-col gap-3'>
          <List
            dataSource={latestNotifications}
            locale={{
              emptyText: <Empty description='No unread notifications' />,
            }}
            renderItem={(item) => (
              <List.Item className={styles.unreadNotification}>
                <div className={styles.notificationItem}>
                  <Typography.Text strong>{item.message}</Typography.Text>
                  <div className={styles.date}>
                    {dayjs(item.created_at).format("DD.MM.YY HH:mm")}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      ) : (
        <Empty description='No notifications' />
      )}
    </Card>
  );
};
