import React, { useState } from "react";
import "../App.css";
import {
  FaUserCircle,
  FaPhone,
  FaRegEnvelope,
  FaQuestion,
} from "react-icons/fa";
import axios from "axios";

function Contact() {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [subbmitted, setSubbmited] = useState(false);

  const [valid, setValid] = useState(false);

  const handleInputChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setValid(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.name && values.phone && values.email && values.message) {
      setValid(true);
      axios
        .post("https://autodilerapi.herokuapp.com/contact", values)
        .then(console.log)
        .catch(console.log);
    }
    setSubbmited(true);
  };

  return (
    <div className="container padding-top">
      <h1>Kontakt</h1>
      <div className="row bg-light shadowDiv" id="contactDiv">
        <div className="col-1"></div>
        <div className="col-4"></div>
        <div className="col-2"></div>
        <div className="col-5 mt-3 mb-3" id="formDiv">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaUserCircle></FaUserCircle>
                  </span>
                </div>
                <input
                  value={values.name}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder="Ime i prezime"
                  name="name"
                />
              </div>
              {subbmitted && !values.name ? (
                <div className="smallTextDiv">
                  <small className="text-danger ml-5">
                    Unesite Ime i Prezime
                  </small>
                </div>
              ) : (
                <div>
                  <small className="text-danger ml-5"></small>
                </div>
              )}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaPhone></FaPhone>
                  </span>
                </div>
                <input
                  value={values.phone}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder="Telefon"
                  name="phone"
                />
              </div>
              {subbmitted && !values.phone ? (
                <div className="smallTextDiv">
                  <small className="text-danger ml-5">
                    Unesite broj telefona
                  </small>
                </div>
              ) : (
                <div>
                  <small className="text-danger ml-5"></small>
                </div>
              )}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaRegEnvelope></FaRegEnvelope>
                  </span>
                </div>
                <input
                  value={values.email}
                  onChange={handleInputChange}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                />
              </div>
              {subbmitted && !values.email ? (
                <div className="smallTextDiv">
                  <small className="text-danger ml-5">Unesite email</small>
                </div>
              ) : (
                <div>
                  <small className="text-danger ml-5"></small>
                </div>
              )}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaQuestion></FaQuestion>
                  </span>
                </div>
                <textarea
                  value={values.message}
                  onChange={handleInputChange}
                  className="form-control"
                  name="message"
                  placeholder="Pitanje?"
                  rows="3"
                />
              </div>
            </div>
            {subbmitted && !values.message ? (
              <div className="smallTextDiv">
                <small className="text-danger ml-5">Unesite pitanje</small>
              </div>
            ) : (
              <div>
                <small className="text-danger ml-5"></small>
              </div>
            )}
            <div className="text-center">
              <button type="submit" className="btn btn-success ml-5 mt-2">
                Posalji
              </button>
            </div>
          </form>
        </div>
      </div>
      {subbmitted && valid ? (
        <div className="row">
          <div className="col-4"></div>
          <div
            className="col-4 alert alert-success mt-3 d-flex justify-content-center"
            role="alert"
          >
            Vasa poruka je uspjesno poslata!
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Contact;
