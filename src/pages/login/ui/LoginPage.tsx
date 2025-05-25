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
import { useLogin } from "@/entities/Auth/hooks/hooks";
import { DecodedToken, LoginFormFields } from "@/entities/Auth/schemas/schemas";
import { Tokens, useAuthStore } from "@/entities/Auth/store/store";
import { privateRoutesMap, publicRoutesMap } from "@/shared/navigation";
import { appSessionStorage } from "@/shared/utils/appSessionStorage/appSessionStorage";
import { isTokenValid } from "@/shared/utils/token/token";
import { theme } from "../data/data";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  const tokens = useAuthStore((state) => state.tokens);
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();
  const setTokens = useAuthStore((state) => state.setTokens);
  let decodedToken = null;
  if (tokens?.refresh_token) {
    decodedToken = jwtDecode<DecodedToken>(tokens.refresh_token);
  }

  if (decodedToken && isTokenValid(decodedToken)) {
    return (
      <Navigate
        to={privateRoutesMap.feed}
        replace
      />
    );
  }

  const handleFinish: FormProps<LoginFormFields>["onFinish"] = (
    credentials,
  ) => {
    login(credentials, {
      onSuccess(response) {
        const tokens: Tokens = {
          access_token: response.access_token,
          refresh_token: response.refresh_token,
        };
        appSessionStorage.setTokenValid();
        setTokens(tokens);
        navigate(privateRoutesMap.feed);
      },
      onError() {
        notification.error({
          message: "Wrong password or username",
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
            className={styles.form}
          >
            <Form.Item
              name='email'
              label={<strong>Email</strong>}
              rules={[
                {
                  type: "email",
                  message: "Wrong email",
                },
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
            >
              <Input.Password placeholder={"Enter password"} />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                block
                loading={isPending}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className='flex flex-col justify-center items-center'>
            <Typography.Text
              type='secondary'
              className='mb-2 '
            >
              Don’t have account?
            </Typography.Text>
            <Button
              color='green'
              variant='solid'
              block
              onClick={() => navigate(publicRoutesMap.registration)}
            >
              Register
            </Button>
          </div>
        </div>
      </section>
    </ConfigProvider>
  );
};
