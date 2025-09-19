// ProfilePage.tsx
import React, { useState, useEffect, use } from "react";
import {
  Layout,
  Menu,
  Typography,
  Card,
  Collapse,
  Button,
  message,
  Empty,
} from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { AnyObject } from "antd/es/_util/type";
import { Link, useNavigate } from "react-router-dom";
import ChangePasswordModal from "../addPasswordModal";
import EditUserData from "../addChangeModal";

const { Sider, Content } = Layout;
const { Panel } = Collapse;
const { Title, Text } = Typography;
type Product = {
  addedAt: string;
  availability: boolean;
  brand: string;
  cost: string;
  countries: string;
  description: string;
  durability: string;
  file: string;
  id: number;
  item_code: string;
  quantity: number;
  type_alcohol: string;
  volume: string;
};

const Profile: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>("1");
  const cookie = document.cookie.split("; ");
  const navigate = useNavigate();
  const userCookie = cookie.find((row) => row.startsWith("token="));
  const [data, setData] = useState<AnyObject>({});
  const [visiblePasswordChange, setVisiblePasswordChange] = useState(false);
  const [visibleInfoChange, setVisibleInfoChange] = useState(false);
  const [product, setProduct] = useState(() => {
    const stored = localStorage.getItem("order");
    return stored ? JSON.parse(stored) : [];
  });

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKey(e.key);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMe = await axios.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${userCookie?.split("=")[1]}`,
          },
        });
        const response = await axios.get(`/users/${responseMe.data.userId}`, {
          headers: {
            Authorization: `Bearer ${userCookie?.split("=")[1]}`,
          },
        });
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const showModalPasswordChange = () => {
    setVisiblePasswordChange(true);
  };

  const closeModalPasswordChange = () => {
    setVisiblePasswordChange(false);
  };
  const showModalInfoChange = () => {
    setVisibleInfoChange(true);
  };

  const closeModalInfoChange = () => {
    setVisibleInfoChange(false);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return (
          <Card>
            <Collapse
              defaultActiveKey={["1"]}
              accordion
              bordered={false}
              style={{ background: "white" }}
            >
              <Panel header="Особисті дані" key="1">
                <Title level={5}>ПІБ</Title>
                <div>
                  {data?.last_name || (
                    <Text type="danger">Прізвище не вказано</Text>
                  )}{" "}
                  {data?.first_name || (
                    <Text type="danger">І'мя не вказано</Text>
                  )}
                </div>
                <br />
              </Panel>
              <Panel header="Контактні дані" key="2">
                <Title level={5}>Пошта</Title>
                <div>
                  {data?.email || <Text type="danger">Немає пошти</Text>}{" "}
                </div>
              </Panel>
              <Panel header="Адреса доставки" key="3">
                <div style={{ width: "100%", height: "600px" }}>
                  <iframe
                    title="Київ на карті"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.540543690655!2d30.522093915731447!3d50.450100079475065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce52b8c9a8ff%3A0xd9dbf8790b828c13!2z0JzQsNC70LDRgdGC0YwsINCa0LjQtdCy0YHRjNC60LAg0L7QsdC7Liwg0KPQutGA0LDQuNC90LAsIDAxMDAw!5e0!3m2!1suk!2sua!4v1712221123456!5m2!1suk!2sua"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Panel>
              <Panel header="Безпека" key="4">
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button danger onClick={showModalPasswordChange}>
                    Оновити пароль
                  </Button>
                  <Button danger onClick={showModalInfoChange}>
                    Змінити данні
                  </Button>
                </div>
              </Panel>
            </Collapse>
          </Card>
        );
      case "2":
        // product — объект, где ключи — даты, а значения — массивы товаров
        const groupedProducts = product as Record<string, Product[]>;

        // Получаем все даты
        const dates = Object.keys(groupedProducts);

        // Считаем общую сумму всех товаров
        const totalSum = Object.values(groupedProducts)
          .flat()
          .reduce((sum, item) => sum + Number(item.cost) * item.quantity, 0);

        return (
          <Card title="Мої замовлення">
            {dates.length > 0 ? (
              <>
                {dates.map((date) => {
                  // Сумма за эту дату
                  const dateSum = groupedProducts[date].reduce(
                    (sum, item) => sum + Number(item.cost) * item.quantity,
                    0
                  );

                  return (
                    <div key={date} style={{ marginBottom: 24 }}>
                      <h3
                        style={{
                          marginBottom: 4,
                          borderBottom: "1px solid #ccc",
                          paddingBottom: 4,
                        }}
                      >
                        Дата: {date} —{" "}
                        <span style={{ color: "#0070f3" }}>
                          Сума: {dateSum} грн
                        </span>
                      </h3>

                      {groupedProducts[date].map((item, index) => (
                        <div
                          key={index}
                          style={{
                            border: "1px solid #f0f0f0",
                            borderRadius: 8,
                            padding: 16,
                            marginBottom: 12,
                            background: "#fff",
                          }}
                        >
                          <div style={{ display: "flex", marginBottom: 12 }}>
                            <img
                              src={`/img/web-pack/${item.type_alcohol.toLowerCase()}-with-bg.jpg`}
                              alt={item.type_alcohol}
                              style={{
                                width: 100,
                                height: 100,
                                objectFit: "cover",
                                borderRadius: 8,
                                marginRight: 16,
                              }}
                            />
                            <div style={{ flex: 1 }}>
                              <h4 style={{ margin: 0 }}>
                                {item.type_alcohol} {item.brand}
                              </h4>
                              <p style={{ margin: 0 }}>
                                Кількість: {item.quantity} шт.
                              </p>
                              <p style={{ margin: 0 }}>
                                Ціна за одиницю: {item.cost} грн
                              </p>
                              <p style={{ margin: 0, fontWeight: "bold" }}>
                                Сума: {Number(item.cost) * item.quantity} грн
                              </p>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                            }}
                          >
                            <p>
                              <b>Країна:</b> {item.countries}
                            </p>
                            <p>
                              <b>Наявність:</b>{" "}
                              {item.availability
                                ? "✅ Є в наявності"
                                : "❌ Немає"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}

                <div
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    marginTop: 12,
                    fontSize: 16,
                  }}
                >
                  Загальна сума: {totalSum} грн
                </div>
              </>
            ) : (
              <Empty description="Кошик порожній" />
            )}
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={250} style={{ background: "#fff", padding: "20px 0" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              lineHeight: "64px",
              borderRadius: "50%",
              backgroundColor: "#f56a00",
              color: "#fff",
              margin: "0 auto",
              fontSize: 24,
            }}
          >
            {`${data?.first_name?.charAt(0)}${data?.last_name?.charAt(0)}`}
          </div>
          <Text style={{ display: "block", marginTop: 8 }}>
            {data?.first_name} {data?.last_name}
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {data?.email || "Пошта не вказана"}
          </Text>
        </div>
        <Menu
          mode="vertical"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            Профіль
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
            Мої замовлення
          </Menu.Item>
          <Menu.Item
            icon={<LogoutOutlined />}
            onClick={() => {
              document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              message.success("Ви вийшли з профілю");
              navigate("/");
            }}
          >
            Вихід
          </Menu.Item>
        </Menu>
      </Sider>

      <Content style={{ padding: "40px", background: "#f5f5f5" }}>
        {renderContent()}
      </Content>
      <ChangePasswordModal
        visible={visiblePasswordChange}
        onClose={closeModalPasswordChange}
        id={data?.id}
      />
      <EditUserData
        visible={visibleInfoChange}
        onClose={closeModalInfoChange}
        userData={data}
      />
    </Layout>
  );
};

export default Profile;
