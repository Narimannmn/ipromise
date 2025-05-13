import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Switch,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import { FC } from "react";
import { AiOutlineDelete } from "react-icons/ai";

interface PromiseCreateFormProps {
  form: FormInstance<PromiseCreateFormFields>;
  onFinish: (values: PromiseCreateFormFields) => void;
}

type MicrotaskForm = {
  Title: string;
};

export type PromiseCreateFormFields = {
  Title: string;
  Description?: string;
  Deadline: dayjs.Dayjs;
  IsPrivate: boolean;
  postNumber?: number;
  Microtasks: MicrotaskForm[];
};

export const PromiseCreateForm: FC<PromiseCreateFormProps> = ({
  form,
  onFinish,
}) => {
  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onFinish}
      requiredMark={false}
      initialValues={{
        IsPrivate: false,
        Microtasks: [],
      }}
    >
      <Form.Item
        label={<strong>Title</strong>}
        name='Title'
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Input maxLength={255} />
      </Form.Item>

      <Form.Item
        label={<strong>Description</strong>}
        name='Description'
      >
        <Input maxLength={255} />
      </Form.Item>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label={<strong>Due date</strong>}
            name='Deadline'
            rules={[{ required: true, message: "Please select a deadline" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label={<strong>Private</strong>}
            name='IsPrivate'
            valuePropName='checked'
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label={<strong>Number of posts to complete Promise</strong>}
        name='postNumber'
        valuePropName='value' // ✅ This ensures correct binding
        rules={[
          { required: true, message: "Please enter number of posts" },
          {
            type: "number",
            min: 1,
            max: 30,
            message: "Must be between 1 and 30",
          },
        ]}
      >
        <InputNumber
          min={1}
          max={30}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label={
          <strong>
            StepPoints&nbsp;
            <Tooltip title='Small task description'>
              <QuestionCircleOutlined />
            </Tooltip>
          </strong>
        }
      >
        <Form.List name='Microtasks'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Form.Item
                  key={key}
                  style={{ marginBottom: 8 }}
                  required={false}
                >
                  <Form.Item
                    {...restField}
                    name={[name, "Title"]}
                    noStyle
                    rules={[{ required: true, message: "Step point required" }]}
                  >
                    <Input
                      placeholder='StepPoints'
                      suffix={
                        <Button
                          type='text'
                          danger
                          size='small'
                          onClick={() => {
                            const currentFields =
                              form.getFieldValue("Microtasks");
                            if (currentFields.length > 1) {
                              remove(name);
                            }
                          }}
                        >
                          <AiOutlineDelete style={{ color: "red" }} />
                        </Button>
                      }
                    />
                  </Form.Item>
                </Form.Item>
              ))}
              <Button
                type='link'
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add new one
              </Button>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item
        shouldUpdate={(prev, curr) => prev.Microtasks !== curr.Microtasks}
      >
        {({ getFieldValue }) => {
          const microtasks = getFieldValue("Microtasks") || [];
          return microtasks.length === 0 ? (
            <div style={{ color: "red", marginBottom: 8 }}>
              You must add at least one StepPoint
            </div>
          ) : null;
        }}
      </Form.Item>
    </Form>
  );
};
