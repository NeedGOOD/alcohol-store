import "./header.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "../../style.css";
import { Avatar, Input, Modal, Button } from "antd";
import AuthModal from "../addAuthPage";

const { Search } = Input;
type Product = {
  item_code: string;
  img: string;
  type_alcohol: string;
  brand: string;
  countries: string;
  volume: string;
  durability: string;
  cost: string;
};

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [product, setProduct] = useState([
    {
      item_code: "1238123",
      img: "/img/web-pack/liquer-with-bg.jpg",
      type_alcohol: "Лікер",
      brand: "awdawd",
      countries: "UA",
      volume: "0.5",
      durability: "2%",
      cost: "2300",
    },
    {
      item_code: "1238124",
      img: "/img/web-pack/beer-with-bg.jpg",
      type_alcohol: "Пиво",
      brand: "awdawd",
      countries: "UA",
      volume: "0.5",
      durability: "2%",
      cost: "8900",
    },
  ]);


  const calculateTotalCost = (products: Product[]): number => {
    return products.reduce((total, product) => {
      return total + parseFloat(product.cost);
    }, 0);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleRemoveProduct = (index: number) => {
    const updatedProduct = product.filter((_, idx) => idx !== index);
    setProduct(updatedProduct);
  };
  return (
    <div>
      <nav className="header">
        <ul id="navBar">
          <img src="/img/logo.png" alt="Logo" id="Logo" />
          <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
            <div
              style={{ borderRight: "1px solid #ccc", paddingRight: "20px", cursor: "pointer" }}
            >
              <Avatar size={64} icon={<UserOutlined />} onClick={() => setVisible(true)}/>
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
              onClick={handleCancel}
              style={{ width: "50%" }}
            >
              Продолжить покупку
            </Button>
            <Button
              key="ok"
              type="primary"
              danger
              onClick={handleOk}
              style={{ width: "50%" }}
            >
              Оформить заказ
            </Button>
          </div>,
        ]}
      >
        <div>
          {product.map((item, index) => (
            <div className="cartProduct">
              <div id="cartProductImg">
                <img src={item.img} alt={item.type_alcohol} />
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    type="text"
                    icon={<CloseOutlined />}
                    shape="circle"
                    size="large"
                    onClick={() => handleRemoveProduct(index)}
                  />
                  <p>x {item.cost} грн</p>
                </div>
              </div>
            </div>
          ))}
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
