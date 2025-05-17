import { Button, Form, Input, message } from "antd";
import { FormInstance } from "antd/lib";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import {
  useCreateMicroTask,
  useDeleteMicroTask,
  useUpdateMicroTask,
} from "@/entities/Promises/hooks/hooks";

interface MicrotasksManagerProps {
  microtasks: Array<{ id?: string; title: string; status?: string }>;
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
      microtasks: [...currentFields, { title: "" }],
    });
  };

  const handleSaveChanges = async (values: {
    microtasks: Array<{ id?: string; title: string }>;
  }) => {
    const existingMicrotasks = microtasks || [];
    const formMicrotasks = values.microtasks || [];

    try {
      for (let i = 0; i < formMicrotasks.length; i++) {
        const formTask = formMicrotasks[i];
        const existingTask = existingMicrotasks[i];

        if (existingTask?.id) {
          if (formTask.title !== existingTask.title) {
            await updateMicroTaskMutation.mutateAsync({
              microtaskId: existingTask.id,
              microtask: {
                title: formTask.title,
                status: "in_progress",
              },
            });
          }
        } else {
          // Create new microtask
          await createMicroTaskMutation.mutateAsync({
            Title: formTask.title,
            Order: i,
          });
        }
      }
      message.success("Microtasks saved");
    } catch (error) {
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
              <Form.Item
                key={key}
                style={{ marginBottom: 8 }}
                required={false}
              >
                <Form.Item
                  {...restField}
                  name={[name, "title"]}
                  noStyle
                  rules={[{ required: true, message: "Step point required" }]}
                >
                  <Input
                    placeholder='Step Point'
                    suffix={
                      <Button
                        type='text'
                        danger
                        size='small'
                        onClick={() => {
                          handleDelete(name);
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
              onClick={handleAdd}
              icon={<AiOutlinePlusCircle />}
            >
              Add new one
            </Button>
          </>
        )}
      </Form.List>
    </Form>
  );
};
