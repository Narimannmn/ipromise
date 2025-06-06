import { Button, Drawer, Empty, List, Tabs, Typography } from "antd";
import dayjs from "dayjs";
import { useMarkAsRead } from "@/entities/Notification/hooks/hooks";
import { getNotifications } from "@/entities/Notification/services/services";
import { useNotificationStore } from "@/entities/Notification/store/notificationStore";
import styles from "./NotificationDrawer.module.css";

const { TabPane } = Tabs;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onClose: () => void;
};

export const NotificationDrawer = ({ visible, onClose }: Props) => {
  const { notifications, setNotifications } = useNotificationStore();

  const { mutate } = useMarkAsRead();

  const unreadNotifications = notifications.filter((n) => !n.is_read);

  const readNotifications = notifications.filter((n) => n.is_read);

  const handleMarkAsRead = async (id: string) => {
    mutate(id, {
      onSuccess: async () => {
        const data = await getNotifications();
        setNotifications(data);
      },
    });
  };

  return (
    <Drawer
      title='Notifications'
      placement='right'
      onClose={onClose}
      open={visible}
      width={360}
    >
      <Tabs defaultActiveKey='1'>
        <TabPane
          tab={`Unread (${unreadNotifications.length})`}
          key='1'
        >
          <List
            dataSource={unreadNotifications}
            locale={{
              emptyText: <Empty description='No unread notifications' />,
            }}
            renderItem={(item) => (
              <List.Item className={styles.unreadNotification}>
                <div className={styles.notificationItem}>
                  <Text strong>{item.message}</Text>
                  <div className={styles.date}>
                    {dayjs(item.created_at).format("DD.MM.YY HH:mm")}
                  </div>
                </div>
                <Button
                  size='small'
                  variant='text'
                  type='primary'
                  onClick={() => handleMarkAsRead(item.id)}
                  key='mark'
                >
                  Mark as read
                </Button>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane
          tab={`Read (${readNotifications.length})`}
          key='2'
        >
          <List
            dataSource={readNotifications}
            locale={{
              emptyText: <Empty description='No read notifications' />,
            }}
            renderItem={(item) => (
              <List.Item className={styles.notificationItem}>
                <Text strong>{item.message}</Text>
                <div className={styles.date}>
                  {dayjs(item.created_at).format("DD.MM.YY HH:mm")}
                </div>
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </Drawer>
  );
};
