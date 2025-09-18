import "./catalog.css";
import React, { useState, useEffect, use } from "react";
import "../../style.css";
import {
  Slider,
  Collapse,
  Checkbox,
  Button,
  Breadcrumb,
  message,
  Empty,
} from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const { Panel } = Collapse;
interface Alcohol {
  label: string;
  value: string;
}

interface User {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  orders: any[];
  password: string;
  role: string;
}
function Catalog() {
  const [selectedType, setSelectedType] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");
  const cookie = document.cookie.split("; ");
  const userCookie = cookie.find((row) => row.startsWith("token="));
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [selectedVolume, setSelectedVolume] = useState<Record<string, boolean>>(
    {}
  );
  const [selectedCountry, setSelectedCountry] = useState<
    Record<string, boolean>
  >({});
  const [selectedStrength, setSelectedStrength] = useState<
    Record<string, boolean>
  >({});

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
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (type) {
      setSelectedType({ [type]: true });
    }
  }, [type]);
  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams();

      if (type) {
        params.append("type_alcohol", type);
      }
      if (selectedCountry) {
        Object.entries(selectedCountry).forEach(([key, value]) => {
          if (value) params.append("countries", key);
        });
      }

      if (selectedType) {
        Object.entries(selectedType).forEach(([key, value]) => {
          if (value) params.append("type_alcohol", key);
        });
      }

      if (selectedVolume) {
        Object.entries(selectedVolume).forEach(([key, value]) => {
          if (value) params.append("volume", key);
        });
      }

      if (selectedStrength) {
        Object.entries(selectedStrength).forEach(([key, value]) => {
          if (value) params.append("durability", key);
        });
      }

      try {
        const response = await axios.get(
          `/alcohol/filter?${params.toString()}`
        );
        console.log("QAWDKQWDOKQWPDOQWDOKQWDOP");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCountry, selectedType, selectedVolume, selectedStrength]);

  const deleteProduct = async (id: number) => {
    try {
      console.log(id);
      await axios.delete(`/alcohol/${id}`);
      window.location.reload();
    } catch (error) {
      alert("Помилка видалення!");
    }
  };

  const alcohols: Alcohol[] = [
    { label: "Віскі", value: "Whiskey" },
    { label: "Бренді", value: "Brandy" },
    { label: "Горілка", value: "Vodka" },
    { label: "Ром", value: "Rum" },
    { label: "Текіла", value: "Tequila" },
    { label: "Вино", value: "Wines" },
    { label: "Джин", value: "Gin" },
    { label: "Лікер", value: "Liquor" },
    { label: "Пиво", value: "Beer" },
  ];
  const options = [
    { label: "0,5", value: "0.5" },
    { label: "0,7", value: "0.7" },
    { label: "0,75", value: "0.75" },
    { label: "0,9", value: "0.9" },
    { label: "1", value: "1" },
    { label: "1,5", value: "1.5" },
    { label: "1,75", value: "1.75" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4,5", value: "4.5" },
  ];
  const country = [
    { label: "Україна", value: "Ukraine" },
    { label: "США", value: "United States" },
    { label: "Канада", value: "Canada" },
    { label: "Німеччина", value: "Germany" },
    { label: "Франція", value: "France" },
    { label: "Іспанія", value: "Spain" },
    { label: "Італія", value: "Italy" },
    { label: "Польща", value: "Poland" },
    { label: "Японія", value: "Japan" },
    { label: "Австралія", value: "Australia" },
  ];
  const strength = [
    { label: "Безалкогольний (0%)", value: "0" },
    { label: "Легкий (5%)", value: "5" },
    { label: "Середній (10%)", value: "10" },
    { label: "Міцний (20%)", value: "20" },
    { label: "Дуже міцний (40%)", value: "40" },
    { label: "Екстремальний (50%)", value: "50" },
  ];

  const handleTypeChange = (label: string) => {
    setSelectedType((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  const handleVolumeChange = (label: string) => {
    setSelectedVolume((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  const handleVolumeCountry = (label: string) => {
    setSelectedCountry((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  const handleVolumeStrength = (label: string) => {
    setSelectedStrength((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  const addCartProduct = (item: any) => {
    const stored = localStorage.getItem("cart");
    const currentCart: any[] = stored ? JSON.parse(stored) : [];

    const alreadyInCart = currentCart.some((product) => product.id === item.id);

    if (alreadyInCart) {
      message.error("Товар вже в корзині!");
      return;
    }

    const updatedCart = [...currentCart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          background: "whitesmoke",
        }}
      >
        <h1>{type}</h1>
        {/* {type && ( */}
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
          items={[
            {
              title: <Link to="/">Головна</Link>,
            },
            {
              title: <Link to="/catalog">Каталог</Link>,
            },
            {
              title: type,
            },
          ]}
        />
        {/* )} */}
      </div>
      <div className="catalogPage">
        <div className="filterBlock">
          <div className="collapseText">
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              style={{ marginBottom: "20px", background: "white" }}
            >
              <Panel header="Тип алкоголю" key="1">
                <div className="scrollElement">
                  {alcohols.map((item) => (
                    <Checkbox
                      checked={!!selectedType[item.value]}
                      onChange={() => handleTypeChange(item.value)}
                    >
                      {item.label}
                    </Checkbox>
                  ))}
                </div>
              </Panel>
              <Panel header="Объем, л" key="2">
                <div className="scrollElement">
                  {options.map((item) => (
                    <Checkbox
                      checked={!!selectedVolume[item.value]}
                      onChange={() => handleVolumeChange(item.value)}
                    >
                      {item.label}
                    </Checkbox>
                  ))}
                </div>
              </Panel>
              <Panel header="Країни" key="3">
                <div className="scrollElement">
                  {country.map((item) => (
                    <Checkbox
                      checked={!!selectedCountry[item.value]}
                      onChange={() => handleVolumeCountry(item.value)}
                    >
                      {item.label}
                    </Checkbox>
                  ))}
                </div>
              </Panel>
              <Panel header="Міцність" key="4">
                <div className="scrollElement">
                  {strength.map((item) => (
                    <Checkbox
                      checked={!!selectedStrength[item.value]}
                      onChange={() => handleVolumeStrength(item.value)}
                    >
                      {item.label}
                    </Checkbox>
                  ))}
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>

        {data.length > 0 ? (
          <div className="productTable">
            {data.map((item, index) => (
              <div className="productCard" key={index}>
                <Link
                  to="product"
                  style={{ textDecoration: "none" }}
                  state={{ item }}
                >
                  <img
                    src={`/img/web-pack/${item?.type_alcohol.toLowerCase()}-with-bg.jpg`}
                    alt={item.type_alcohol}
                    className="productImage"
                  />
                  <div className="productInfo">
                    <p className="productLabel">
                      {item.type_alcohol} {item.brand} продукт {item.volume} л{" "}
                      {item.durability}
                    </p>
                    <p className="productCost">{item.cost} грн</p>
                    <p className="productCountry">
                      Країна розробника:{" "}
                      <span className="dots">{item.countries}</span>
                    </p>
                    <p className="productVolume">
                      Об'єм: <span className="dots">{item.volume} л</span>
                    </p>
                    <p className="productDurability">
                      Міцність: <span className="dots">{item.durability}</span>
                    </p>
                  </div>
                </Link>
                <div style={{ display: "flex", gap: "5px" }}>
                  <Button
                    color="danger"
                    variant="solid"
                    onClick={(event) => {
                      event.stopPropagation();
                      addCartProduct(item);
                    }}
                    style={{ width: "100%" }}
                  >
                    Додати в корзину
                  </Button>
                  {user?.role === "Admin" && (
                    <Button
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteProduct(item.id);
                      }}
                    >
                      Видалити продукт
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty style={{width: "40%"}} description="Немає подібних товарів" />
        )}
      </div>
    </>
  );
}

export default Catalog;
