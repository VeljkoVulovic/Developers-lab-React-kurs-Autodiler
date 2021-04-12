import React, { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import {
  FaUserCircle,
  FaRegEnvelope,
  FaLock,
  FaLocationArrow,
} from "react-icons/fa";
import firebase, {
  auth,
  createUserProfileDocument,
  signInWithGoogle,
} from "../firebase/firebase.utils";

const LoginModal = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    showLoginModal() {
      openLoginModal();
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

  const [loginModalIsOpen, setLoginModalIsOpen] = React.useState(false);

  function openLoginModal() {
    setLoginModalIsOpen(true);
  }

  function closeLoginModal() {
    setLoginModalIsOpen(false);
  }

  const [registerModalIsOpen, setRegisterModalIsOpen] = React.useState(false);

  function openRegisterModal() {
    closeLoginModal();
    setRegisterModalIsOpen(true);
  }

  function closeRegisterModal() {
    setRegisterModalIsOpen(false);
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onLogin(e) {
    e.preventDefault();
    const Data = {
      password: password,
      email: email,
    };

    axios
      .post("https://autodilerapi.herokuapp.com/login", Data)
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          closeLoginModal();
          setEmail("");
          setPassword("");
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRepeatPassword, setRegRepeatPassword] = useState("");
  const [regLocation, setRegLocation] = useState("");

  async function onRegister(e) {
    e.preventDefault();

    if (regPassword !== regRepeatPassword) {
      alert("Lozinke se ne poklapaju!");
      return;
    }

    // try {
    //   const { user } = await auth.createUserWithEmailAndPassword(
    //     regEmail,
    //     regPassword
    //   );

    //   console.log(user);

    //   createUserProfileDocument(user, { regName });

    //   setRegName("");
    //   setRegEmail("");
    //   setRegPassword("");
    //   setRegRepeatPassword("");
    //   setRegisterModalIsOpen(false);
    // } catch (error) {
    //   console.log(error);
    // }

    const Data = {
      name: regName,
      password: regPassword,
      email: regEmail,
      location: regLocation,
    };

    axios
      .post("https://autodilerapi.herokuapp.com/register", Data)
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          closeRegisterModal();
          setLoginModalIsOpen(true);
        }, 500);
      });
  }

  return (
    <div>
      <div>
        <Modal
          isOpen={loginModalIsOpen}
          onRequestClose={closeLoginModal}
          style={customStyles}
          contentLabel="Example Modal"
          email={email}
        >
          <button className="close-modal" onClick={closeLoginModal}>
            &#10005;
          </button>
          <div className="form-box">
            <div className="body-form">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FaRegEnvelope></FaRegEnvelope>
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FaLock></FaLock>
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Lozinka"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary btn-block"
                  onClick={onLogin}
                >
                  Prijavi se
                </button>
              </form>
              <p className="white d-flex align-items-center">
                Nemaš nalog?{" "}
                <button
                  className="btn btn-secondary m-0 ml-3"
                  onClick={openRegisterModal}
                >
                  Registruj se
                </button>
              </p>
              <button
                type="button"
                className="btn btn-secondary btn-block"
                onClick={signInWithGoogle}
              >
                Prijavi se pomoću Google naloga
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={registerModalIsOpen}
          onRequestClose={closeRegisterModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button className="close-modal" onClick={closeRegisterModal}>
            &#10005;
          </button>

          <div className="form-box">
            <div className="body-form">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FaUserCircle></FaUserCircle>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ime i prezime"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FaRegEnvelope></FaRegEnvelope>
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FaLock></FaLock>
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Lozinka"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FaLock></FaLock>
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Ponovi lozinku"
                    value={regRepeatPassword}
                    onChange={(e) => setRegRepeatPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FaLocationArrow></FaLocationArrow>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lokacija"
                    value={regLocation}
                    onChange={(e) => setRegLocation(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary btn-block"
                  onClick={onRegister}
                >
                  Registruj se
                </button>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
});

export default LoginModal;
