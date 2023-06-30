import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from "@/styles/intro/IntroEmail.module.css";

export default function IntroEmail() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const [form] = Form.useForm();

  const onStart = async (values) => {
    setIsLoading(true);
    const email = values.email;

    if (email) {
      setIsLoading(false);
      router.push("/signup");
      sessionStorage.setItem("registerEmail", email);
      form.resetFields();
    }
  };

  return (
    <div className={styles.wrapForm}>
      <h3 className={styles.title}>
        Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách
        thành viên của bạn.
      </h3>
      <Form
        form={form}
        name="intro-email"
        onFinish={onStart}
        scrollToFirstError
        size="large"
        className={styles.formEmail}
      >
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
          style={{ width: "100%" }}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            className={styles.input}
            placeholder="Email của bạn"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isLoading}
            danger
            className={styles.button}
          >
            Bắt đầu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
