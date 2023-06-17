import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link";
import { login } from "@/lib/auth";
import { useRouter } from "next/router";
import { authErrors } from "@/lib/firebase";
import { decryptData, encryptData } from "@/lib/common";
import Head from "next/head";
import ForgotPassword from "@/component/ForgotPassword";

export default function SignIn() {
  const router = useRouter();
  const [initialValues, setInitialValues] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    const encryptedEmail = localStorage.email || "";
    const encryptedPassword = localStorage.password || "";
    const encryptedRemember = localStorage.remember || "false";

    const email = encryptedEmail === "" ? "" : decryptData(encryptedEmail);

    const password =
      encryptedPassword === "" ? "" : decryptData(encryptedPassword);

    const remember =
      encryptedRemember === ""
        ? false
        : decryptData(encryptedRemember) === "true";

    setInitialValues({
      email,
      password,
      remember,
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  const onSignIn = async (values) => {
    const email = values.email;
    const password = values.password;
    const isRemember = values.remember;

    const encryptedEmail = encryptData(email);
    const encryptedPassword = encryptData(password);
    const encryptedRemember = encryptData(isRemember.toString());

    const { user, error } = await login(email, password);

    if (error) {
      message.error(authErrors[error.code]);
    } else {
      if (isRemember) {
        console.log(encryptedRemember);
        localStorage.setItem("email", encryptedEmail, { expires: 7 });
        localStorage.setItem("password", encryptedPassword, { expires: 7 });
        localStorage.setItem("remember", encryptedRemember, { expires: 7 });
      } else {
        localStorage.setItem("email", encryptData(""), { expires: 7 });
        localStorage.setItem("password", encryptData(""), { expires: 7 });
        localStorage.setItem("remember", false, { expires: 7 });
      }
      router.push("/home");

      message.success(`Chào mừng trở lại, ${user.user.displayName}`);
    }
  };

  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <div className="wrap__form">
        <h1 className="title__form">Đăng Nhập</h1>

        <Form
          name="normal_login"
          className="login-form"
          form={form}
          size="large"
          onFinish={onSignIn}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email của bạn!",
              },
              {
                type: "email",
                message: "Giá trị nhập vào phải là email",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu của bạn!",
              },
              {
                min: 6,
                message: `Mật khẩu phải có tối thiểu 6 ký tự`,
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              danger
              block
            >
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item>
            <div className="wrap__help">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ tôi</Checkbox>
              </Form.Item>

              {/* <Link href="/forgot">Quên mật khẩu?</Link>
               */}
              <ForgotPassword />
            </div>
          </Form.Item>

          <div className="description__signin">
            Bạn mới truy cập <span className="title">TheMovies</span>?
            <Link href="/signup"> Đăng ký ngay!</Link>
          </div>
        </Form>
      </div>
    </>
  );
}

// export const getServerSideProps = async (context) => {
//   console.log("getServerSideProps");

//   const encryptedEmail = context.req.cookies.email;
//   const encryptedPassword = context.req.cookies.password;
//   const encryptedRemember = context.req.cookies.remember;

//   const email = encryptedEmail === "" ? "" : decryptData(encryptedEmail);

//   const password =
//     encryptedPassword === "" ? "" : decryptData(encryptedPassword);
//   const remember =
//     encryptedRemember === ""
//       ? false
//       : decryptData(encryptedRemember) === "true";

//   return { props: { email, password, remember } };
// };
