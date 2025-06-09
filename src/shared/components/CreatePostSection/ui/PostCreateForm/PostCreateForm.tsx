import { PlusOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Select, Space, Upload } from "antd";
import { FormInstance } from "antd";
import { UploadFile } from "antd/lib";
import { useMemo } from "react";
import { CreatePostRequest } from "@/entities/Posts/schemas/schemas";
import { useGetPromisesByUsername } from "@/entities/Promises/hooks/hooks";

export interface PostCreateFormProps {
  form: FormInstance<CreatePostRequest>;
  onFinish: (values: CreatePostRequest) => void;
  username: string;
}

export const PostCreateForm = ({
  form,
  onFinish,
  username,
}: PostCreateFormProps) => {
  const { data: promises } = useGetPromisesByUsername(username);

  const selectedPromiseId = Form.useWatch("promise_id", form);
  const selectedPromise = useMemo(() => {
    return promises?.find((p) => p.id === selectedPromiseId);
  }, [selectedPromiseId, promises]);

  return (
    <Form
      form={form}
      requiredMark={false}
      layout='vertical'
      onFinish={onFinish}
      initialValues={{
        promiseId: undefined,
        stepPointId: undefined,
        content: "",
        attachments: [],
      }}
    >
      <Space
        direction='vertical'
        style={{ width: "100%" }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='promise_id'
              label='Choose Promise'
            >
              <Select
                placeholder='Select a promise'
                allowClear
                options={promises?.map((promise) => ({
                  value: promise.id,
                  label: promise.title,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='microtask_id'
              label='Choose StepPoint'
            >
              <Select
                placeholder='Select a step point'
                allowClear
                disabled={!selectedPromise}
                options={selectedPromise?.microtasks?.map((microtask) => ({
                  value: microtask.id,
                  label: microtask.title,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name='content'
          label='Content'
          rules={[{ required: true, message: "Please enter post content" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder='What do you want to talk about?'
          />
        </Form.Item>

        <Form.Item
          name='attachments'
          valuePropName='fileList'
          getValueFromEvent={(e: { fileList: UploadFile<File>[] }) => {
            return e.fileList.map((file) => ({
              ...file,
              url: file.url || URL.createObjectURL(file.originFileObj as File),
            }));
          }}
        >
          <Upload
            multiple
            beforeUpload={() => false}
            listType='picture-card'
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
      </Space>
    </Form>
  );
};
