import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link";
import { login } from "@/lib/auth";
import { useRouter } from "next/router";
import { authErrors } from "@/lib/firebase";
import Cookies from "js-cookie";
import { decryptData, encryptData } from "@/lib/common";
import Head from "next/head";

export default function SignIn({ email, password, remember }) {
  const router = useRouter();
  console.log(email, password, remember);

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
        Cookies.set("email", encryptedEmail, { expires: 7 });
        Cookies.set("password", encryptedPassword, { expires: 7 });
        Cookies.set("remember", encryptedRemember, { expires: 7 });
      } else {
        Cookies.set("email", encryptData(""), { expires: 7 });
        Cookies.set("password", encryptData(""), { expires: 7 });
        Cookies.set("remember", false, { expires: 7 });
      }

      console.log(user);
      message.success(`Chào mừng chở lại,${user.user.displayName}`);
      router.push("/home");
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
          initialValues={{
            email: email,
            remember: remember,
            password: password,
          }}
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

              <Link href="/forgot">Quên mật khẩu?</Link>
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

export const getServerSideProps = async (context) => {
  console.log("getServerSideProps");

  const encryptedEmail = context.req.cookies.email;
  const encryptedPassword = context.req.cookies.password;
  const encryptedRemember = context.req.cookies.remember;

  const email = encryptedEmail === "" ? "" : decryptData(encryptedEmail);
  const password =
    encryptedPassword === "" ? "" : decryptData(encryptedPassword);
  const remember =
    encryptedRemember === ""
      ? false
      : decryptData(encryptedRemember) === "true";

  return { props: { email, password, remember } };
};
