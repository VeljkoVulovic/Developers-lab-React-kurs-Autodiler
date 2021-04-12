import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaSortNumericDown,
  FaRegEnvelope,
  FaLock,
  FaLocationArrow,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import callApi from "../services/callApi";
import axios from "axios";

const EditUser = (props) => {
  const [user, setUser] = useState({});
  const [valid, setValid] = useState(false);
  const [subbmitted, setSubbmited] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    callApi("/admin/user/" + id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
    setValid(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.id && user.name && user.password && user.email && user.location) {
      setValid(true);
      console.log(user);
      axios
        .put("https://autodilerapi.herokuapp.com/admin/edit-user/" + id, user)
        .then(console.log)
        .catch(console.log);
    }
    setSubbmited(true);
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
                  value={user.id}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder={user.id}
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
                    <FaUserCircle></FaUserCircle>
                  </span>
                </div>
                <input
                  value={user.name}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder={user.name}
                  name="name"
                />
              </div>
              {subbmitted && !user.name ? (
                <div className="smallTextDiv">
                  <small className="text-danger">Unesite username</small>
                </div>
              ) : (
                <div className="mt-4">
                  <small className="text-danger"></small>
                </div>
              )}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaLock></FaLock>
                  </span>
                </div>
                <input
                  value={user.password}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder={user.password}
                  name="password"
                />
              </div>
              {subbmitted && !user.password ? (
                <div className="smallTextDiv">
                  <small className="text-danger">Unesite password</small>
                </div>
              ) : (
                <div className="mt-4">
                  <small className="text-danger"></small>
                </div>
              )}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaRegEnvelope></FaRegEnvelope>
                  </span>
                </div>
                <input
                  value={user.email}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder={user.email}
                  name="email"
                />
              </div>
              {subbmitted && !user.email ? (
                <div className="smallTextDiv">
                  <small className="text-danger">Unesite email</small>
                </div>
              ) : (
                <div className="mt-4">
                  <small className="text-danger"></small>
                </div>
              )}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaLocationArrow></FaLocationArrow>
                  </span>
                </div>
                <input
                  value={user.location}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder={user.location}
                  name="location"
                />
              </div>
              {subbmitted && !user.location ? (
                <div className="smallTextDiv">
                  <small className="text-danger">Unesite lokaciju</small>
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

export default EditUser;
