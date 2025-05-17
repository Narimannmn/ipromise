import { DatePicker, Form, FormInstance, Input, Switch } from "antd";
import dayjs from "dayjs";
import { PromiseUpdate } from "@/entities/Promises/shemas/shemas";
import { usePromisePageStore } from "../../stores/store";

interface PromiseEditFormProps {
  form: FormInstance;
  onFinish: (values: PromiseUpdate) => void;
}

export const PromiseEditForm = ({ form, onFinish }: PromiseEditFormProps) => {
  const { selectPromise } = usePromisePageStore();

  if (!selectPromise) return null;

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onFinish}
      requiredMark={false}
      initialValues={{
        title: selectPromise.title,
        description: selectPromise.description,
        deadline: dayjs(selectPromise.deadline),
        is_private: selectPromise.is_private,
      }}
    >
      <Form.Item
        label={<strong>Title</strong>}
        name='title'
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Input maxLength={255} />
      </Form.Item>

      <Form.Item
        label={<strong>Description</strong>}
        name='description'
      >
        <Input maxLength={255} />
      </Form.Item>

      <Form.Item
        label={<strong>Due date</strong>}
        name='deadline'
        rules={[{ required: true, message: "Please select a deadline" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label={<strong>Private</strong>}
        name='is_private'
        valuePropName='checked'
      >
        <Switch />
      </Form.Item>
    </Form>
  );
};
