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
  PostCount: number;
};

export type PromiseCreateFormFields = {
  Title: string;
  Description?: string;
  Deadline: dayjs.Dayjs;
  IsPrivate: boolean;
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
        label={
          <strong>
            StepPoints&nbsp;
            <Tooltip title='Each small step with required post count'>
              <QuestionCircleOutlined />
            </Tooltip>
          </strong>
        }
      >
        <Form.List name='Microtasks'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row
                  key={key}
                  gutter={8}
                  align='middle'
                  style={{ marginBottom: 8 }}
                >
                  <Col flex='auto'>
                    <Form.Item
                      {...restField}
                      name={[name, "Title"]}
                      rules={[
                        { required: true, message: "StepPoint required" },
                      ]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input placeholder='StepPoint title' />
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item
                      {...restField}
                      name={[name, "PostCount"]}
                      rules={[{ required: true, message: "Required" }]}
                      style={{ marginBottom: 0 }}
                    >
                      <InputNumber
                        min={1}
                        max={30}
                        style={{ width: "100%" }}
                        placeholder='Posts number'
                      />
                    </Form.Item>
                  </Col>

                  <Col>
                    <Button
                      type='text'
                      danger
                      icon={<AiOutlineDelete />}
                      onClick={() => {
                        const current = form.getFieldValue("Microtasks");
                        if (current.length > 1) remove(name);
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <Button
                type='link'
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add StepPoint
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
