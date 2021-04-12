import React, { useState, useEffect } from "react";
import userImage from "../user1.png";
import { useParams } from "react-router-dom";
import callApi from "../services/callApi";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Details = (props) => {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [model, setModel] = useState({});
  const [user, setUser] = useState({});
  const [brand, setBrand] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    // callApi("/add/" + id)\\
    callApi("https://autodilerapi.herokuapp.com/add/" + id)
      .then((res) => {
        setCar(res.data);
        setModel(res.data.model);
        setUser(res.data.user);
        setImages(res.data.images);
        setModel(res.data.model);
        setBrand(res.data.model.brand);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide>
          {images.map((image, index) => (
            <img className="slider" key={index} src={image.path} />
          ))}
        </Slide>
      </div>
    );
  };

  return (
    <div className="container padding-top">
      <div className="row bg-light shadowDiv">
        <div className="col-8">{Slideshow()}</div>
        <div className="col-4">
          <div className="card mt-4">
            <img className="card-img" src={userImage} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Prodavac: {user.name}</h5>
              <p className="card-text"></p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Email:</b> {user.email}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-2">
          <hr></hr>
        </div>
        <div className="row mt-3">
          <h1 className="mb-5">{car.title}</h1>
          <div className="col-1"></div>
          <div className="col-6">
            <p>
              <b>Brand:</b> {brand.name != null ? brand.name : "/"}
            </p>
            <p>
              <b>Model:</b> {model != null ? model.name : "/"}
            </p>
            <p>
              <b>Kategorija:</b>{" "}
              {model.category != null && model.category.name != null
                ? model.category.name
                : "/"}
            </p>
            <p>
              <b>Godina proizvodnje:</b> {car.year}
            </p>
            <p>
              <b>Gorivo:</b> {car.fuel}
            </p>
            <p>
              <b>Mjenjac:</b> {car.transmission}
            </p>
            <p>
              <b>Kilovati:</b> {car.kw}
            </p>
            <p>
              <b>Kubikaza:</b> {car.cubic}
            </p>
            <p>
              <b>Kilometraza:</b> {car.mileage}
            </p>
          </div>
          <div className="col-2"></div>
          <div className="col-3">
            <span className="tag mt-2">Cijena: {car.price} &euro; </span>
          </div>
        </div>
        <div className="mt-2">
          <hr></hr>
        </div>
        <div className="row mt-3">
          <div className="col-1"></div>
          <div className="col-10">
            <p>
              <b>Opis: </b> {car.description}
            </p>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Details;
