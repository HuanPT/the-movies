import { changePassword, forgotPassword } from "@/lib/auth";
import { authErrors } from "@/lib/firebase";
import { Button, Form, Input, Modal, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import React, { useState } from "react";
// import Link from "next/link";

const CollectionForgotForm = ({ open, onForgot, onCancel }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleForSubmit = () => {
    setIsLoading(true);
    form
      .validateFields()
      .then((value) => {
        handleForgotPassword(value.email);
        setIsLoading(false);
      })
      .catch((info) => {
        message.warning("Gửi email thất bại!");
        console.log("Validate Failed:", info);
        setIsLoading(false);
      });
  };

  const handleForgotPassword = async (value) => {
    const { error } = await forgotPassword(value);
    if (error) {
      message.error(authErrors[error.code]);
    } else {
      onForgot(value);
      form.resetFields();
      message.success("Gửi email thành công!");
    }
  };
  return (
    <Modal
      open={open}
      title={<h1 className="title__form">Bạn quên mật khẩu?</h1>}
      onCancel={handleCancel}
      footer={false}
      width={450}
      maskStyle={{
        background: "#000000d9",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="forgot__password"
        onFinish={handleForSubmit}
      >
        <h2 style={{ color: "#fff", marginBottom: 12 }}>
          Chúng tôi sẽ gửi hướng dẫn lấy lại mật khẩu về email của bạn!
        </h2>
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
            placeholder="Email của bạn"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            danger
            block
            loading={isLoading}
          >
            Gửi email cho tôi
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default function ForgotPassword() {
  const [open, setOpen] = useState(false);
  const onChange = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="link"
        onClick={() => {
          setOpen(true);
        }}
      >
        Quên mật khẩu?
      </Button>
      <CollectionForgotForm
        open={open}
        onForgot={onChange}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
}
