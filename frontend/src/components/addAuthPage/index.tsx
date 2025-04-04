import React from "react";
import { Modal, Input, Button, Tabs, Form } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ visible, onClose }) => {
  return (
    <Modal open={visible} onCancel={onClose} footer={null} width={400}>
      <Tabs defaultActiveKey="login" centered>
        {/* Вкладка входа */}
        <TabPane tab="Вхід" key="login">
          <Form layout="vertical">
            <Form.Item label="Електронна пошта або телефон">
              <Input placeholder="Введіть пошту або телефон" />
            </Form.Item>
            <Form.Item label="Пароль">
              <Input.Password placeholder="Введіть пароль" />
            </Form.Item>
            <Button type="primary" block>
              Вхід
            </Button>
          </Form>
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <a href="#">Забули пароль?</a>
          </div>
        </TabPane>

        {/* Вкладка регистрации */}
        <TabPane tab="Реєстрація" key="register">
          <Form layout="vertical">
            <Form.Item label="Ім'я">
              <Input placeholder="Введіть ім'я" />
            </Form.Item>
            <Form.Item label="Електронна пошта">
              <Input placeholder="Введіть пошту" />
            </Form.Item>
            <Form.Item label="Пароль">
              <Input.Password placeholder="Введіть пароль" />
            </Form.Item>
            <Button type="primary" block>
              Реєстрація
            </Button>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default AuthModal;
