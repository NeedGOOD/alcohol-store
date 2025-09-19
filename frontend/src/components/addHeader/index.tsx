import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "../../style.css";
import { Avatar, Input, Modal, Button, Empty } from "antd";
import AuthModal from "../addAuthPage";

const { Search } = Input;
type Product = {
  item_code: string;
  img: string;
  id: number;
  type_alcohol: string;
  brand: string;
  countries: string;
  volume: string;
  durability: string;
  cost: string;
  quantity: number;
};

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const cookie = document.cookie.split("; ");
  const userCookie = cookie.find((row) => row.startsWith("token="));
  const [product, setProduct] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const calculateTotalCost = (products: Product[]): number => {
    return products.reduce((total, product) => {
      console.log(product, total);
      return total + parseFloat(product.cost) * (product.quantity || 1);
    }, 0);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const formatDateTime = (): string => {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    return `${hours}:${minutes} ${day}.${month}.${year}`;
  };

  const handleSubmit = () => {
    if (!userCookie) {
      setVisible(true);
      return;
    }
    const stored = localStorage.getItem("order");

    const ordered: Record<string, typeof product> = stored
      ? JSON.parse(stored)
      : {};

    ordered[formatDateTime()] = product;

    console.log(ordered);

    localStorage.setItem("order", JSON.stringify(ordered));
    localStorage.setItem("cart", JSON.stringify([]));
    setProduct([]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleRemoveProduct = (id: number) => {
    let updatedProduct = product.filter((item: Product) => item.id !== id);

    if (!Array.isArray(updatedProduct)) {
      updatedProduct = [updatedProduct];
    }

    localStorage.setItem("cart", JSON.stringify(updatedProduct));
    setProduct(updatedProduct);
  };

  return (
    <div>
      <nav className="header">
        <ul id="navBar">
          <img
            src="/img/logo.png"
            alt="Logo"
            id="Logo"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
            <div
              style={{
                borderRight: "1px solid #ccc",
                paddingRight: "20px",
                cursor: "pointer",
              }}
            >
              <Avatar
                size={86}
                icon={<UserOutlined style={{ color: "black" }} />}
                style={{ backgroundColor: "transparent" }}
                onClick={() => {
                  if (!userCookie) {
                    setVisible(true);
                  } else {
                    navigate("/profile");
                  }
                }}
              />
            </div>
            <div style={{ fontSize: "50px" }}>
              <ShoppingCartOutlined onClick={showModal} />
            </div>
          </div>
        </ul>
        <ul id="secondNavBar">
          {[
            { to: "/", label: "Головна" },
            { to: "/catalog", label: "Каталог товарів" },
          ].map((item) => (
            <Link to={item.to} id="navLink">
              <li id="navElement" key={item.label}>
                {item.label}
              </li>
            </Link>
          ))}
          <Search
            placeholder="Пошук"
            prefix={<SearchOutlined />}
            style={{ width: 700 }}
          />
        </ul>
      </nav>
      <Modal
        open={isModalOpen}
        title="Корзина покупателя"
        width={"50%"}
        onCancel={handleCancel}
        footer={[
          <div
            style={{
              display: "flex",
              gap: "5px",
              justifyContent: "space-between",
            }}
          >
            <Button
              key="cancel"
              type="primary"
              danger
              onClick={() => {
                handleSubmit();
                handleCancel();
              }}
              style={{ width: "50%" }}
            >
              Продолжить покупку
            </Button>
            <Button
              key="ok"
              type="primary"
              danger
              onClick={() => {
                handleSubmit();
                handleOk();
              }}
              style={{ width: "50%" }}
            >
              Оформить заказ
            </Button>
          </div>,
        ]}
      >
        <div>
          {product.length > 0 ? (
            product.map((item: any, index: number) => (
              <div className="cartProduct" key={index}>
                <div id="cartProductImg">
                  <img
                    src={`/img/web-pack/${item?.type_alcohol.toLowerCase()}-with-bg.jpg`}
                    alt={item.type_alcohol}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <p className="contentProduct">
                    {item.type_alcohol} {item.brand} продукт {item.volume} л{" "}
                    {item.durability}
                  </p>
                  <div>
                    <p>
                      {item.quantity ?? ""} x {item.cost} грн
                    </p>
                  </div>
                  <CloseOutlined
                    style={{ fontSize: 24 }}
                    onClick={() => handleRemoveProduct(item.id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <Empty description="Замовлення порожнє" />
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "50px",
            }}
          >
            <p>Усього до сплати:</p>
            <p>{calculateTotalCost(product)} грн.</p>
          </div>
        </div>
      </Modal>
      <AuthModal visible={visible} onClose={() => setVisible(false)} />
    </div>
  );
}

export default Header;
