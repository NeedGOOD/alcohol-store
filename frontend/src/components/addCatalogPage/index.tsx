import "./catalog.css";
import React, { useState, useEffect } from "react";
import "../../style.css";
import { Slider, Collapse, Checkbox, Button, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const { Panel } = Collapse;
interface Alcohol {
  label: string;
}

function Catalog() {
  const [selectedType, setSelectedType] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");
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
  const [range, setRange] = useState<number[]>([500, 2300]);

  const handleSliderChange = (value: number | number[]) => {
    setRange(value as number[]);
    console.log("Slider range:", value);
  };

  useEffect(() => {
    if (type) {
      setSelectedType({ [type]: true });
    }
  }, [type]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/alcohol");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  const alcohols: Alcohol[] = [
    { label: "Віскі" },
    { label: "Бренді" },
    { label: "Горілка" },
    { label: "Ром" },
    { label: "Текіла" },
    { label: "Вино" },
    { label: "Джин" },
    { label: "Лікер" },
    { label: "Пиво" },
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
    { label: "Україна", value: "UA" },
    { label: "США", value: "US" },
    { label: "Канада", value: "CA" },
    { label: "Німеччина", value: "DE" },
    { label: "Франція", value: "FR" },
    { label: "Іспанія", value: "ES" },
    { label: "Італія", value: "IT" },
    { label: "Польща", value: "PL" },
    { label: "Японія", value: "JP" },
    { label: "Австралія", value: "AU" },
  ];
  const strength = [
    { label: "Безалкогольний (0%)", value: "0" },
    { label: "Легкий (до 5%)", value: "5" },
    { label: "Середній (до 10%)", value: "10" },
    { label: "Міцний (до 20%)", value: "20" },
    { label: "Дуже міцний (до 40%)", value: "40" },
    { label: "Екстремальний (50% і більше)", value: "50" },
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
          <Slider
            range
            defaultValue={[500, 2300]}
            min={0}
            max={10000}
            onChange={handleSliderChange}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <p>Ціна:&nbsp;</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{range[0]}</span>
              <span>&nbsp;-&nbsp;</span>
              <span>{range[1]}</span>
            </div>
          </div>

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
                      checked={!!selectedType[item.label]}
                      onChange={() => handleTypeChange(item.label)}
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
        <div className="productTable">
          {data.map((item, index) => (
            <Link
              to="product"
              style={{ textDecoration: "none" }}
              state={{ item }}
            >
              <div className="productCard" key={index}>
                <img
                  src={item.img}
                  alt={item.type_alcohol}
                  className="productImage"
                />
                <div className="productInfo">
                  <p className="productLabel">
                    {item.type_alcohol} {item.brand} продукт {item.volume} л{" "}
                    {item.durability}
                  </p>
                  <p className="productCost">{item.cost} грн</p>
                  <Button color="danger" variant="solid">
                    Додати в корзину
                  </Button>
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Catalog;
