import {
  Button,
  ConfigProvider,
  Form,
  Input,
  notification,
  Typography,
} from "antd";
import { FormProps } from "antd/lib";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import { useRegistration } from "@/entities/Auth/hooks/hooks";
import {
  DecodedToken,
  RegistrationFormFields,
} from "@/entities/Auth/schemas/schemas";
import { useAuthStore } from "@/entities/Auth/store/store";
import { privateRoutesMap, publicRoutesMap } from "@/shared/navigation";
import { isTokenValid } from "@/shared/utils/token/token";
import { theme } from "../data/data";

export const RegistrationPage = () => {
  const tokens = useAuthStore((state) => state.tokens);
  const { mutate: register, isPending } = useRegistration();
  const navigate = useNavigate();

  let decodedToken = null;
  if (tokens?.accessToken) {
    decodedToken = jwtDecode<DecodedToken>(tokens.accessToken);
  }

  if (decodedToken && isTokenValid(decodedToken)) {
    return (
      <Navigate
        to={privateRoutesMap.profile}
        replace
      />
    );
  }

  const handleFinish: FormProps<RegistrationFormFields>["onFinish"] = (
    credentials,
  ) => {
    register(credentials, {
      onSuccess(response) {
        notification.success({
          message: response.message,
        });
        navigate(publicRoutesMap.login);
      },
      onError(error) {
        notification.error({
          message: error.message,
        });
      },
    });
  };
  return (
    <ConfigProvider theme={theme}>
      <section className='flex flex-col justify-center items-center max-w-[565px] space-y-6'>
        <div className='flex flex-col gap-y-4 '>
          <Typography.Title
            level={1}
            className='text-center'
          >
            Welcome to <span className='text-[#1890FF]'>IPromise</span>
          </Typography.Title>
          <Typography.Title
            level={3}
            className='whitespace-nowrap overflow-hidden text-ellipsis'
          >
            Share your goals. Get support. Succeed on iPromise.
          </Typography.Title>
        </div>
        <div className='flex flex-col w-[447px] rounded-2xl p-6 bg-[#ffffff] gap-4'>
          <Form
            layout='vertical'
            name='login-form'
            onFinish={handleFinish}
            className='flex flex-col gap-2'
          >
            <Form.Item
              name='username'
              label={<strong>Username</strong>}
              rules={[
                { required: true, message: "Username is required" },
                { min: 3, message: "Username must be at least 3 characters" },
              ]}
            >
              <Input
                type='text'
                placeholder={"Enter username"}
              />
            </Form.Item>

            <Form.Item
              name='email'
              label={<strong>Email</strong>}
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                type='email'
                placeholder={"Enter email"}
              />
            </Form.Item>

            <Form.Item
              name='password'
              label={<strong>Password</strong>}
              rules={[
                { required: true, message: "Password is required" },
                { min: 8, message: "Password must be at least 8 characters" },
              ]}
            >
              <Input.Password placeholder={"Enter password"} />
            </Form.Item>

            <Form.Item
              name='confirm_password'
              label={<strong>Repeat password</strong>}
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder={"Repeat password"} />
            </Form.Item>

            <Form.Item>
              <Button
                color='green'
                variant='solid'
                htmlType='submit'
                block
                loading={isPending}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <div className='flex flex-col justify-center items-center'>
            <Typography.Text
              type='secondary'
              className='mb-2 '
            >
              Already have an account?
            </Typography.Text>
            <Button
              type='primary'
              htmlType='submit'
              block
              onClick={() => navigate("/login")}
              // onClick={() =>
              //   notification.success({
              //     message: "sdad",
              //   })
              // }
            >
              Log in
            </Button>
          </div>
        </div>
      </section>
    </ConfigProvider>
  );
};
