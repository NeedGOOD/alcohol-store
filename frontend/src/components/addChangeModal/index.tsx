import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import axios from "axios";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  orders: any[];
}

interface EditUserDataProps {
  visible: boolean;
  onClose: () => void;
  userData: UserData;
}

const EditUserData: React.FC<EditUserDataProps> = ({
  visible,
  onClose,
  userData,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && userData) {
      form.setFieldsValue({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
      });
    }
  }, [visible, userData, form]);

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.patch(`/users/${userData.id}`, values);
      if (response.status === 200) {
        message.success("Дані успішно оновлено");
        onClose();
      }
    } catch (error) {
      message.error("Сталася помилка при оновленні даних");
    }
  };

  return (
    <Modal
      title="Редагувати дані користувача"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Скасувати
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Зберегти
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="editUserForm"
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
        }}
      >
        <Form.Item
          label="Ім'я"
          name="first_name"
          rules={[{ required: true, message: "Будь ласка, введіть ім'я!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Прізвище"
          name="last_name"
          rules={[{ required: true, message: "Будь ласка, введіть прізвище!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Будь ласка, введіть коректний email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserData;
