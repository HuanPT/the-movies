import { changePassword } from "@/lib/auth";
import { authErrors } from "@/lib/firebase";
import { Button, Form, Input, Modal, message } from "antd";
import React, { useState } from "react";

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleForSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        handleChangePassword(values);
      })
      .catch((info) => {
        message.warning("Cập nhật mật khẩu thất bại!");
        console.log("Validate Failed:", info);
      });
  };

  const handleChangePassword = async (values) => {
    const { oldPassword, newPassword } = values;
    const { error } = await changePassword(oldPassword, newPassword);
    if (error) {
      message.error(authErrors[error.code]);
    } else {
      onCreate(values);
      form.resetFields();
      message.success("Đổi mật khẩu thành công");
    }
  };
  return (
    <Modal
      open={open}
      title={<h1 className="title__form">Đổi mật khẩu</h1>}
      footer={false}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleForSubmit}
        name="form_change_password"
      >
        <Form.Item
          name="oldPassword"
          label="Mật khẩu cũ"
          rules={[
            {
              required: true,
              message: "Mật khẩu không được để trống!",
            },
            {
              min: 6,
              message: "Mật khẩu phải có tối thiểu 6 ký tự!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="Mật Khẩu mới!"
          rules={[
            {
              required: true,
              message: "Mật khẩu không được để trống!",
            },
            {
              min: 6,
              message: "Mật khẩu phải có tối thiểu 6 ký tự!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("oldPassword") !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu mới không được trùng với mật khẩu cũ!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Nhập lại mật khẩu!"
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận lại mật khẩu của bạn!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Hai mật khẩu bạn nhập không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ marginTop: 30 }}>
          <Button type="primary" size="large" htmlType="submit" danger block>
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default function ChangePassword() {
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
        style={{ paddingInline: 0 }}
      >
        Đổi mật khẩu
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onChange}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
}
