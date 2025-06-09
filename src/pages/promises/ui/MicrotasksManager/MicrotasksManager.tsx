import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Switch,
} from "antd";
import { FormInstance } from "antd/lib";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import {
  useCreateMicroTask,
  useDeleteMicroTask,
  useUpdateMicroTask,
} from "@/entities/Promises/hooks/hooks";
import { MicroTask } from "@/entities/Promises/shemas/shemas";

interface MicrotasksManagerProps {
  microtasks: MicroTask[];
  promiseId: string;
  form: FormInstance;
}

export const MicrotasksManager = ({
  microtasks,
  promiseId,
  form,
}: MicrotasksManagerProps) => {
  const createMicroTaskMutation = useCreateMicroTask(promiseId);
  const updateMicroTaskMutation = useUpdateMicroTask();
  const deleteMicroTaskMutation = useDeleteMicroTask();

  const handleDelete = (index: number) => {
    const currentFields = form.getFieldValue("microtasks") || [];
    const microtaskToDelete = currentFields[index];
    if (microtaskToDelete?.id) {
      deleteMicroTaskMutation.mutate(microtaskToDelete.id, {
        onSuccess() {
          message.success("Microtask deleted");
          form.setFieldsValue({
            microtasks: currentFields.filter(
              (_: unknown, i: number) => i !== index,
            ),
          });
        },
        onError() {
          message.error("Failed to delete microtask");
        },
      });
    } else {
      form.setFieldsValue({
        microtasks: currentFields.filter(
          (_: unknown, i: number) => i !== index,
        ),
      });
    }
  };

  const handleAdd = () => {
    const currentFields = form.getFieldValue("microtasks") || [];
    form.setFieldsValue({
      microtasks: [
        ...currentFields,
        { title: "", steps_planned: 1, status: "in_progress" },
      ],
    });
  };

  const handleSaveChanges = async (values: {
    microtasks: Array<{
      id?: string;
      title: string;
      steps_planned?: number;
      status?: "in_progress" | "finished";
    }>;
  }) => {
    const existingMicrotasks = microtasks || [];
    const formMicrotasks = values.microtasks || [];

    try {
      for (let i = 0; i < formMicrotasks.length; i++) {
        const formTask = formMicrotasks[i];
        const existingTask = existingMicrotasks[i];

        const status =
          formTask.status === "finished" ? "finished" : "in_progress";

        if (existingTask?.id) {
          if (
            formTask.title !== existingTask.title ||
            formTask.steps_planned !== existingTask.steps_planned ||
            status !== existingTask.status
          ) {
            await updateMicroTaskMutation.mutateAsync({
              microtaskId: existingTask.id,
              microtask: {
                title: formTask.title,
                steps_planned: formTask.steps_planned || 1,
                status,
              },
            });
          }
        } else {
          await createMicroTaskMutation.mutateAsync({
            title: formTask.title,
            order: i,
            steps_planned: formTask.steps_planned || 1,
          });
        }
      }
      message.success("Microtasks saved");
    } catch {
      message.error("Error saving microtasks");
    }
  };

  return (
    <Form
      form={form}
      initialValues={{ microtasks }}
      onFinish={handleSaveChanges}
      layout='vertical'
    >
      <Form.List name='microtasks'>
        {(fields) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Card
                key={key}
                title={
                  <Form.Item
                    {...restField}
                    name={[name, "title"]}
                    rules={[{ required: true, message: "Step point required" }]}
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      placeholder='Step Point Title'
                      bordered={false}
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    />
                  </Form.Item>
                }
                extra={
                  <Button
                    type='text'
                    icon={<AiOutlineDelete />}
                    danger
                    onClick={() => handleDelete(name)}
                  />
                }
                style={{
                  marginBottom: 16,
                  borderRadius: 12,
                  border: "1px solid #f0f0f0",
                }}
                bodyStyle={{
                  padding: "12px 16px",
                  backgroundColor: "#ffffff",
                }}
              >
                <Row
                  gutter={16}
                  align='middle'
                  wrap={false}
                >
                  <Col>
                    <span style={{ fontWeight: 500 }}>Planned posts:</span>
                  </Col>

                  <Col style={{ width: 80 }}>
                    <Form.Item
                      {...restField}
                      name={[name, "steps_planned"]}
                      rules={[
                        { required: true, message: "Step count required" },
                      ]}
                      style={{ marginBottom: 0 }}
                    >
                      <InputNumber
                        min={1}
                        max={30}
                        style={{
                          width: "100%",
                          borderRadius: 6,
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prev, next) =>
                        prev.microtasks?.[name]?.status !==
                        next.microtasks?.[name]?.status
                      }
                    >
                      {() => {
                        const isFinished =
                          form.getFieldValue(["microtasks", name, "status"]) ===
                          "completed";
                        return (
                          <Switch
                            checked={isFinished}
                            checkedChildren='Done'
                            unCheckedChildren='Active'
                            onChange={(checked) =>
                              form.setFieldValue(
                                ["microtasks", name, "status"],
                                checked ? "completed" : "in_progress",
                              )
                            }
                            style={{
                              backgroundColor: isFinished
                                ? "#1677ff"
                                : undefined,
                            }}
                          />
                        );
                      }}
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ))}

            <Button
              type='link'
              onClick={handleAdd}
              icon={<AiOutlinePlusCircle />}
            >
              Add StepPoint
            </Button>
          </>
        )}
      </Form.List>
    </Form>
  );
};
