import { PlusOutlined } from "@ant-design/icons";
import { Form, Image, Input, message, Modal, notification, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { useUpdateProfile } from "@/entities/User/hooks/hooks";
import { User, UserUpdate } from "@/entities/User/schemas/schemas";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface EditUserModalProps {
  open: boolean;
  onCancel: () => void;
  user: User | null;
}

export const EditUserModal = ({ open, onCancel, user }: EditUserModalProps) => {
  if (!user) return null;
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "avatar.png",
      status: "done",
      url:
        user?.avatar_url ||
        `https://ui-avatars.com/api/?name=${user?.username?.charAt(0).toUpperCase()}&background=0D8ABC&color=fff&size=128`,
    },
  ]);

  const { mutate } = useUpdateProfile();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleSave = async () => {
    const values = await form.validateFields();

    const avatarFile = fileList[0]?.originFileObj;

    const payload: UserUpdate = {
      ...values,
      avatar_url: avatarFile,
    };

    mutate(payload, {
      onSuccess: () => {
        notification.success({ message: "Successfully updated profile" });
        onCancel();
      },
      onError: () => {
        message.error("Failed to update profile");
      },
    });
  };

  return (
    <Modal
      open={open}
      title='Edit Profile'
      okText='Save'
      onCancel={onCancel}
      onOk={handleSave}
    >
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          username: user?.username,
          bio: user?.bio,
        }}
      >
        <Form.Item
          name='username'
          label='Username'
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label='Avatar'>
          <Upload
            listType='picture-circle'
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                message.error("You can only upload image files!");
              }
              return isImage || Upload.LIST_IGNORE;
            }}
            action='' // Optional: define if you want to upload to server
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        </Form.Item>

        <Form.Item
          name='bio'
          label='Bio'
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
