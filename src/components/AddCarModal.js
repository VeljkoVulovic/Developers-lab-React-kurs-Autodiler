import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import Modal from "react-modal";
import axios from "axios";

import {
  FaCarAlt,
  FaEuroSign,
  FaGasPump,
  FaCalendarAlt,
  FaTachometerAlt,
  FaAdversal,
  FaSlidersH,
} from "react-icons/fa";

const AdCarModal = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    showAdCarModal() {
      openAdCarModal();
    },
  }));

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [carBrands, setCarBrands] = useState([]);
  const [carCategories, setCarCategories] = useState([]);
  const [carModels, setCarModels] = useState([]);

  const [carTitle, setCarTitle] = useState("");
  const [carDesccription, setCarDescription] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [carCategory, setCarCategory] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carModelID, setCarModelID] = useState("");
  const [carFuel, setCarFuel] = useState("");
  const [carTransmission, setCarTransmission] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carKW, setCarKW] = useState("");
  const [carCubic, setCarCubic] = useState("");
  const [carMileage, setCarMileage] = useState("");
  const [carYear, setCarYear] = useState("");

  const [carImage, setCarImage] = useState(null);

  const [adCarSuccess, setAdCarSuccess] = useState(false);

  const [adCarModalIsOpen, setAdCarModalIsOpen] = React.useState(false);
  function openAdCarModal() {
    setAdCarModalIsOpen(true);
  }

  function closeAdCarModal() {
    setAdCarModalIsOpen(false);
    setAdCarSuccess(false);
  }

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

  const postDataHandler = (e) => {
    e.preventDefault();

    const Data = new FormData();

    console.log(carModel);

    Data.append("title", carTitle);
    Data.append("description", carDesccription);
    Data.append("model", carModelID);
    Data.append("fuel", carFuel);
    Data.append("transmission", carTransmission);
    Data.append("price", carPrice);
    Data.append("kw", carKW);
    Data.append("cubic", carCubic);
    Data.append("mileage", carMileage);
    Data.append("year", carYear);
    Data.append("image", carImage);

    axios
      .post("https://autodilerapi.herokuapp.com/advertisment", Data)
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          setAdCarSuccess(true);
        }, 500);
      });
  };

  const onFileChange = (e) => {
    setCarImage(e.target.files[0]);
  };

  const setNewBrandId = (e) => {
    setCarBrand(e);
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

  const setCarModelId = (e) => {
    setCarModel(e);
    console.log(carModel);
    for (let i = 0; i < carModels.length; i++) {
      if ((e = carModels[i].name)) {
        setCarModelID(carModels[i].id);
        break;
      }
    }
  };

  if (!adCarSuccess) {
    return (
      <div>
        <div>
          <Modal
            isOpen={adCarModalIsOpen}
            onRequestClose={closeAdCarModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <button className="close-modal" onClick={closeAdCarModal}>
              &#10005;
            </button>
            <div className="form-box add-car-modal">
              <div className="body-form">
                <form onSubmit={postDataHandler}>
                  <div className="row">
                    <div className="col-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <FaAdversal></FaAdversal>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Naziv oglasa"
                          onChange={(e) => setCarTitle(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <FaCarAlt></FaCarAlt>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Opis auta"
                          onChange={(e) => setCarDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <FaCarAlt></FaCarAlt>
                          </span>
                        </div>
                        <select
                          className="form-control"
                          value={carBrand}
                          onChange={(e) => setNewBrandId(e.target.value)}
                        >
                          <option value="">Odaberi proizvođača</option>
                          {carBrands.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <FaCarAlt></FaCarAlt>
                          </span>
                        </div>
                        <select
                          className="form-control"
                          value={carCategory}
                          onChange={(e) => setCarCategory(e.target.value)}
                        >
                          <option value="">Odaberi kategoriju</option>
                          {carCategories.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <FaCarAlt></FaCarAlt>
                          </span>
                        </div>
                        <select
                          className="form-control"
                          value={carModel}
                          onChange={(e) => setCarModelId(e.target.value)}
                        >
                          <option value="">Odaberi model</option>
                          {carModels.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <FaGasPump></FaGasPump>
                          </span>
                        </div>
                        <select
                          className="form-control"
                          value={carFuel}
                          onChange={(e) => setCarFuel(e.target.value)}
                        >
                          <option value="">Vrsta goriva</option>
                          <option value="dizel">Dizel</option>
                          <option value="benzin">Benzin</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <FaSlidersH></FaSlidersH>
                          </span>
                        </div>
                        <select
                          className="form-control"
                          value={carTransmission}
                          onChange={(e) => setCarTransmission(e.target.value)}
                        >
                          <option value="">Odaberi mjenjač</option>
                          <option value="automatik">Automatik</option>
                          <option value="manuel">Manuelni</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <FaEuroSign></FaEuroSign>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Cijena auta"
                          onChange={(e) => setCarPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <FaCarAlt></FaCarAlt>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Snaga motora"
                          onChange={(e) => setCarKW(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <FaCarAlt></FaCarAlt>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Kubikaža"
                          onChange={(e) => setCarCubic(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <FaTachometerAlt></FaTachometerAlt>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Kilometraža"
                          onChange={(e) => setCarMileage(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <FaCalendarAlt></FaCalendarAlt>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Godište"
                          onChange={(e) => setCarYear(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group mb-3">
                        <input
                          type="file"
                          className="file"
                          onChange={onFileChange}
                        />
                      </div>
                    </div>
                  </div>
                  <input
                    type="submit"
                    className="btn btn-secondary btn-block mt-5"
                    value="Dodaj oglas"
                  ></input>
                </form>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <Modal
            isOpen={adCarModalIsOpen}
            onRequestClose={closeAdCarModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <button className="close-modal" onClick={closeAdCarModal}>
              &#10005;
            </button>
            <div className="form-box add-car-modal">
              <div className="body-form">
                <h1 className="white">Oglas uspješno postavljen</h1>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
});

export default AdCarModal;
