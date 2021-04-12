import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../logo.svg";
import { Link } from "react-router-dom";

function Home() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  const [carBrands, setCarBrands] = useState([]);
  const [carCategories, setCarCategories] = useState([]);
  const [carModels, setCarModels] = useState([]);

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [minCubic, setMinCubic] = useState(0);
  const [maxCubic, setMaxCubic] = useState(10000000);
  const [minMileage, setMinMileage] = useState(0);
  const [maxMileage, setMaxMileage] = useState(10000000);

  const [brandId, setBrandId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    axios
      .get("https://autodilerapi.herokuapp.com/adds")
      .then((res) => {
        setCars(res.data.adds);
        setFilteredCars(res.data.adds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://autodilerapi.herokuapp.com/brands")
      .then((res) => {
        setCarBrands(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://autodilerapi.herokuapp.com/categories")
      .then((res) => {
        setCarCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://autodilerapi.herokuapp.com/model/brandAndCategory?categoryId=${categoryId}&brandId=${brandId}`
      )
      .then((res) => {
        setCarModels(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    setFilteredCars(
      cars.filter((car) =>
        car.title.toLowerCase().includes(title.toLowerCase()) &&
        car.fuel.includes(fuel) &&
        car.transmission.includes(transmission) &&
        car.price <= maxPrice &&
        car.price >= minPrice &&
        car.cubic <= maxCubic &&
        car.cubic >= minCubic &&
        car.mileage <= maxMileage &&
        car.mileage >= minMileage &&
        car.model != null
          ? car.model.brand.name.includes(brand)
          : "" && car.model != null
          ? car.model.category.name.includes(category)
          : "" && car.model != null
          ? car.model.name.includes(model)
          : ""
      )
    );
  };

  const setNewBrandId = (e) => {
    setBrand(e);
    for (let i = 0; i < carBrands.length; i++) {
      if (carBrands[i].name == e) {
        getModals(carBrands[i].id);
      }
    }
  };

  const getModals = (newBrandID) => {
    axios
      .get(
        `https://autodilerapi.herokuapp.com/model/brandAndCategory?brandId=${newBrandID}`
      )
      .then((res) => {
        setCarModels(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container padding-top">
      <form className="search-form my-5" onSubmit={handleSearch}>
        <div className="row align-items-end">
          <div className="col-12 col-sm-6 col-lg-3 input-wrap">
            <label htmlFor="search-field">Pretraga po nazivu</label>
            <input
              id="search-field"
              className="search-input"
              type="text"
              placeholder="Auto.."
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-3 input-wrap">
            <label htmlFor="brand">Odaberi proizvođača</label>
            <select
              id="brand"
              value={brand}
              onChange={(e) => setNewBrandId(e.target.value)}
            >
              <option value="">Svi</option>
              {carBrands.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 input-wrap">
            <label htmlFor="brand">Odaberi kategoriju</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Svi</option>
              {carCategories.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 input-wrap">
            <label htmlFor="brand">Odaberi model</label>
            <select
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="">Svi</option>
              {carModels.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 input-wrap">
            <label htmlFor="fuel">Odaberi vrstu goriva</label>
            <select
              id="fuel"
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
            >
              <option value="">Svi</option>
              <option value="dizel">Dizel</option>
              <option value="benzin">Benzin</option>
            </select>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 input-wrap">
            <label htmlFor="transmission">Odaberi mjenjač</label>
            <select
              id="transmission"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
            >
              <option value="">Svi</option>
              <option value="automatik">Automatik</option>
              <option value="manuel">Manuelni</option>
            </select>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 input-wrap">
            <label>Unesi cijenu (&euro;)</label>
            <div className="d-flex">
              <input
                id="min-price"
                className="search-input mr-1"
                type="number"
                placeholder="Od"
                onChange={(e) =>
                  e.target.value != ""
                    ? setMinPrice(e.target.value)
                    : setMinPrice(0)
                }
              />
              <input
                id="max-price"
                className="search-input ml-1"
                type="number"
                placeholder="Do"
                onChange={(e) =>
                  e.target.value != ""
                    ? setMaxPrice(e.target.value)
                    : setMaxPrice(10000000)
                }
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 input-wrap">
            <label>Unesi kubikažu (cm3)</label>
            <div className="d-flex">
              <input
                id="min-cubic"
                className="search-input mr-1"
                type="number"
                placeholder="Od"
                onChange={(e) =>
                  e.target.value != ""
                    ? setMinCubic(e.target.value)
                    : setMinCubic(0)
                }
              />
              <input
                id="max-cubic"
                className="search-input ml-1"
                type="number"
                placeholder="Do"
                onChange={(e) =>
                  e.target.value != ""
                    ? setMaxCubic(e.target.value)
                    : setMaxCubic(10000000)
                }
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 input-wrap">
            <label>Unesi kilometražu (km)</label>
            <div className="d-flex">
              <input
                id="min-mileage"
                className="search-input mr-1"
                type="number"
                placeholder="Od"
                onChange={(e) =>
                  e.target.value != ""
                    ? setMinMileage(e.target.value)
                    : setMinMileage(0)
                }
              />
              <input
                id="max-mileage"
                className="search-input ml-1"
                type="number"
                placeholder="Do"
                onChange={(e) =>
                  e.target.value != ""
                    ? setMaxMileage(e.target.value)
                    : setMaxMileage(10000000)
                }
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 input-wrap"></div>
          <div className="col-12 col-sm-6 col-lg-3 input-wrap"></div>
          <div className="col-12 col-sm-6 col-lg-3 input-wrap">
            <input
              type="submit"
              value="Pretraži"
              className="btn btn-secondary"
            />
          </div>
        </div>
      </form>
      <div className="row">
        {filteredCars.map((car) => (
          <div className="col-12 col-sm-6 col-lg-4 car-card" key={car.id}>
            <Link to={{ pathname: `/details/${car.id}` }}>
              <div className="img-wrap">
                {car.images[0] != null ? (
                  <img src={car.images[0].path}></img>
                ) : (
                  <img src={logo}></img>
                )}
              </div>
              <div className="details-wrap">
                <h2 className="mb-3">{car.title}</h2>
                <p className="mb-0">{car.description}</p>
                <span>Cijena: {car.price} &euro;</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
