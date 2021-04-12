import React, { useState, useEffect } from "react";
import {
  FaCarAlt,
  FaSortNumericDown,
  FaTachometerAlt,
  FaGasPump,
  FaCarBattery,
  FaCalendarAlt,
  FaAdversal,
  FaOilCan,
  FaSlidersH,
  FaEuroSign,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import callApi from "../services/callApi";
import axios from "axios";

const EditCar = (props) => {
  const [car, setCar] = useState({});
  const [valid, setValid] = useState(false);
  const [subbmitted, setSubbmited] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    callApi("/add/" + id)
      .then((res) => {
        setCar(res.data);
        console.log(car);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChange = (event) => {
    setCar({
      ...car,
      [event.target.name]: event.target.value,
    });
    setValid(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      car.id &&
      car.title &&
      car.description &&
      car.price &&
      car.kw &&
      car.transmission &&
      car.fuel &&
      car.mileage &&
      car.cubic &&
      car.year
    ) {
      setValid(true);
      console.log(car);
      axios
        .put("https://autodilerapi.herokuapp.com/advertisment/" + id, car)
        .then(console.log)
        .catch(console.log);
    }
    setSubbmited(true);
    setTimeout(() => {
      window.location = "/admin";
    }, 1000);
  };

  return (
    <div className="container padding-top">
      <h1>Edit</h1>
      <div className="shadowDiv bg-light">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <form onSubmit={handleSubmit}>
              <div className="input-group mt-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaSortNumericDown></FaSortNumericDown>
                  </span>
                </div>
                <input
                  value={id}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder={id}
                  name="id"
                  disabled
                />
              </div>
              <div className="mt-4">
                <small className="text-danger"></small>
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaAdversal></FaAdversal>
                  </span>
                </div>
                <input
                  value={car.title}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder={car.title}
                  name="title"
                />
              </div>
              {subbmitted && !car.title ? (
                <div className="smallTextDiv">
                  <small className="text-danger">Unesite naslov</small>
                </div>
              ) : (
                <div className="mt-4">
                  <small className="text-danger"></small>
                </div>
              )}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaEuroSign></FaEuroSign>
                  </span>
                </div>
                <input
                  value={car.price}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder={car.price}
                  name="price"
                />
              </div>
              {subbmitted && !car.price ? (
                <div className="smallTextDiv">
                  <small className="text-danger">Unesite cijenu</small>
                </div>
              ) : (
                <div className="mt-4">
                  <small className="text-danger"></small>
                </div>
              )}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaTachometerAlt></FaTachometerAlt>
                  </span>
                </div>
                <input
                  value={car.kw}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder={car.kw}
                  name="kw"
                />
              </div>
              {subbmitted && !car.kw ? (
                <div className="smallTextDiv">
                  <small className="text-danger">Unesite kilovate</small>
                </div>
              ) : (
                <div className="mt-4">
                  <small className="text-danger"></small>
                </div>
              )}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaSlidersH></FaSlidersH>
                  </span>
                </div>
                <input
                  value={car.transmission}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder={car.transmission}
                  name="transmission"
                />
              </div>
              {subbmitted && !car.transmission ? (
                <div className="smallTextDiv">
                  <small className="text-danger">Unesite tip mjenjaca</small>
                </div>
              ) : (
                <div className="mt-4">
                  <small className="text-danger"></small>
                </div>
              )}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaGasPump></FaGasPump>
                  </span>
                </div>
                <input
                  value={car.fuel}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder={car.fuel}
                  name="fuel"
                />
              </div>
              {subbmitted && !car.fuel ? (
                <div className="smallTextDiv">
                  <small className="text-danger">Unesite gorivo</small>
                </div>
              ) : (
                <div className="mt-4">
                  <small className="text-danger"></small>
                </div>
              )}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaCarBattery></FaCarBattery>
                  </span>
                </div>
                <input
                  value={car.cubic}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder={car.cubic}
                  name="cubic"
                />
              </div>
              {subbmitted && !car.cubic ? (
                <div className="smallTextDiv">
                  <small className="text-danger">Unesite kubikazu</small>
                </div>
              ) : (
                <div className="mt-4">
                  <small className="text-danger"></small>
                </div>
              )}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaOilCan></FaOilCan>
                  </span>
                </div>
                <input
                  value={car.mileage}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder={car.mileage}
                  name="mileage"
                />
              </div>
              {subbmitted && !car.mileage ? (
                <div className="smallTextDiv">
                  <small className="text-danger">Unesite kilometrazu</small>
                </div>
              ) : (
                <div className="mt-4">
                  <small className="text-danger"></small>
                </div>
              )}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaCalendarAlt></FaCalendarAlt>
                  </span>
                </div>
                <input
                  value={car.year}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder={car.year}
                  name="year"
                />
              </div>
              {subbmitted && !car.year ? (
                <div className="smallTextDiv">
                  <small className="text-danger">
                    Unesite godinu proizvodnje
                  </small>
                </div>
              ) : (
                <div className="mt-4">
                  <small className="text-danger"></small>
                </div>
              )}
              <div className="input-group" id="textAreaResize">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaCarAlt></FaCarAlt>
                  </span>
                </div>
                <textarea
                  value={car.description}
                  onChange={handleInputChange}
                  className="form-control"
                  name="description"
                  placeholder={car.description}
                  rows="3"
                />
              </div>
              {subbmitted && !car.description ? (
                <div className="smallTextDiv">
                  <small className="text-danger">Unesite opis</small>
                </div>
              ) : (
                <div className="mt-4">
                  <small className="text-danger"></small>
                </div>
              )}
              <div className="text-center">
                <button type="submit" className="btn btn-info mt-3">
                  Edit
                </button>
              </div>
            </form>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
};

export default EditCar;
