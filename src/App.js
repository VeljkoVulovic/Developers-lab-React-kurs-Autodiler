import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Details from "./components/Details";
import Dashboard from "./components/Dashboard";
import EditUser from "./components/EditUser";
import EditCar from "./components/EditCar";
import logo from "./logo.svg";
import LoginModal from "./components/LoginModal";
import AdCarModal from "./components/AddCarModal";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import React, { useRef, useState } from "react";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

function App() {
  const loginRef = useRef();
  const adRef = useRef();

  const [currentUser, setCurrentUser] = useState(null);

  auth.onAuthStateChanged(async (userAuth) => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth);
      userRef.onSnapshot((snapShot) => {
        setCurrentUser({
          id: snapShot.id,
          ...snapShot.data(),
        });
      });
    }
    setCurrentUser(userAuth);
  });

  return (
    <div>
      <Router currentUser={currentUser}>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src={logo}></img>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li>
                  <Link to="/">Početna</Link>
                </li>
                <li>
                  <Link to="/about">O nama</Link>
                </li>
                <li>
                  <Link to="/contact">Kontakt</Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="btn btn-secondary btn-block"
                    onClick={() => {
                      adRef.current.showAdCarModal();
                    }}
                  >
                    Postavi oglas
                  </button>
                </li>
                {currentUser ? (
                  <li>
                    <button
                      type="button"
                      className="btn btn-secondary btn-block"
                      onClick={() => {
                        auth.signOut();
                      }}
                    >
                      Odjavi se
                    </button>
                  </li>
                ) : (
                  <li>
                    <button
                      type="button"
                      className="btn btn-secondary btn-block"
                      onClick={() => {
                        loginRef.current.showLoginModal();
                      }}
                    >
                      Prijavi se
                    </button>
                  </li>
                )}
                <li>
                  <Link to="/admin">Dashboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/admin" component={Dashboard} />
          <Route path="/details/:id" component={Details} />
          <Route path="/editUser/:id" component={EditUser} />
          <Route path="/editCar/:id" component={EditCar} />
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <LoginModal ref={loginRef} />
      <AdCarModal ref={adRef} />
      <footer>
        <div className="footer bg-light">
          <p>&copy; Auto diler</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
