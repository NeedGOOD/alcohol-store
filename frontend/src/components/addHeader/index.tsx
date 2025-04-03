import "./header.css";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "../../style.css";
import { Avatar, Input } from "antd";

const { Search } = Input;

function Header() {
  return (
    <div>
      <nav className="header">
        <ul id="navBar">
          <img src="/img/logo.png" alt="Logo" id="Logo" />
          <div>
            <Avatar size={64} icon={<UserOutlined />} />
          </div>
          <div style={{ fontSize: "50px" }}>
            <ShoppingCartOutlined />
          </div>
        </ul>
        <ul id="secondNavBar">
          {[
            { to: "/", label: "Головна" },
            { to: "/", label: "Каталог товарів" },
          ].map((item) => (
            <Link to={item.to} id="navLink" >
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
    </div>
  );
}

export default Header;
