import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Divider, Form, Input, message } from "antd";
import Link from "next/link";
import { login, signInWithGoogle } from "@/lib/auth";
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
    const encryptedRemember = localStorage.remember || "";

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
        localStorage.setItem("email", encryptedEmail);
        localStorage.setItem("password", encryptedPassword);
        localStorage.setItem("remember", encryptedRemember);
      } else {
        localStorage.setItem("email", encryptData(""));
        localStorage.setItem("password", encryptData(""));
        localStorage.setItem("remember", encryptedRemember);
      }

      router.push("/home");

      message.success(`Chào mừng trở lại, ${user.displayName}!`);
    }
  };

  const onSignInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await signInWithGoogle();
      if (error) message.error(authErrors[error.code]);
      else {
        localStorage.setItem("email", encryptData(""));
        localStorage.setItem("password", encryptData(""));
        message.success(`Đăng nhập thành công, xin chào ${user.displayName}!`);

        router.push("/home");
      }
    } catch (err) {}
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
            <Input prefix={<MailOutlined />} placeholder="Email" />
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
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" danger block>
              Đăng nhập
            </Button>
          </Form.Item>

          <Divider
            style={{ marginBlock: 20, color: "#bbb", borderBlockColor: "#ddd" }}
          >
            Hoặc
          </Divider>

          <Form.Item>
            <Button
              htmlType="button"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              ghost
              onClick={onSignInWithGoogle}
            >
              <span className="google__social">G</span>oogle
            </Button>
          </Form.Item>
          <Form.Item>
            <div className="wrap__help">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ tôi</Checkbox>
              </Form.Item>

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
