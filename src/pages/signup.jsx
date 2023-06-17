import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { register } from "@/lib/auth";
import { authErrors } from "@/lib/firebase";
import { useRouter } from "next/router";
import Head from "next/head";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});

  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    const email = sessionStorage.registerEmail || null;
    if (email) {
      setInitialValue({ email });
    }
  }, []);

  useEffect(() => {
    form.setFieldsValue(initialValue);
  }, [initialValue]);

  const onSignUp = async (values) => {
    setIsLoading(true);
    const email = values.email;
    const password = values.password;
    const username = values.username;
    const { user, error } = await register(email, password, username);

    if (error) {
      console.log(error);
      message.error(authErrors[error.code]);
      setIsLoading(false);
    } else {
      router.push("/home");
      form.resetFields();
      setIsLoading(false);
      setTimeout(() => {
        message.success("Đăng ký thành công");
      }, 1000);
    }
  };

  return (
    <>
      <Head>
        <title>Đăng ký</title>
      </Head>
      <div className="wrap__form">
        <Form
          form={form}
          name="register"
          onFinish={onSignUp}
          scrollToFirstError
          size="large"
        >
          <h1 className="title__form">Đăng ký</h1>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên của bạn!",
                whitespace: true,
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tên của bạn"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "Giá trị bạn nhập không phải email!",
              },
              {
                required: true,
                message: "Vui lòng nhập email của bạn!",
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email của bạn"
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
                message: `Mật khẩu phải có độ dài từ 6 ký tự!`,
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận lại mật khẩu của bạn!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Hai mật khẩu bạn nhập không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập lại mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isLoading}
              danger
              block
            >
              Đăng ký
            </Button>
          </Form.Item>
          <div className="description__signin">
            Bạn đã có tài khoản <span className="title">TheMovies</span>?
            <Link href="/signin"> Đăng nhập ngay!</Link>
          </div>
        </Form>
      </div>
    </>
  );
}
