import { Button, Image, Modal, Typography } from "antd";

interface WelcomeModalProps {
  open: boolean;
  onOk: () => void;
}

export const WelcomeModal = ({ open, onOk }: WelcomeModalProps) => {
  return (
    <Modal
      title='Welcome to iPromise'
      open={open}
      onCancel={onOk} // Also close on cancel
      footer={[
        <Button
          key='ok'
          type='primary'
          onClick={onOk}
        >
          Let’s Get Started
        </Button>,
      ]}
    >
      <div style={{ textAlign: "center", padding: "12px" }}>
        <Typography.Title
          level={4}
          style={{ marginTop: 16 }}
        >
          Make your goals count.
        </Typography.Title>
        <Typography.Paragraph>
          iPromise is your space to set meaningful promises—public or private—
          track your progress, and stay motivated with support from friends.
          Celebrate milestones, earn badges, and grow together.
        </Typography.Paragraph>
        <Typography.Paragraph>
          Let’s turn intentions into achievements—one step at a time.
        </Typography.Paragraph>
        <Image
          width={350}
          src='/welcome.jpg'
          alt='Welcome to iPromise'
          preview={false}
        />
      </div>
    </Modal>
  );
};
