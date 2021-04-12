import React, { useState, useEffect } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import callApi from "../services/callApi";
import { Link } from "react-router-dom";
import axios from "axios";

function DataTableCars() {
  const [cars, setCars] = useState([]);
  const [searchCar, setSearchCar] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    setFilteredCars(cars);

    callApi("/adds").then((res) => {
      setCars(res.data.adds);
      setFilteredCars(res.data.adds);
    });
  }, []);

  const handleSearchCars = (e) => {
    e.preventDefault();
    setFilteredCars(
      cars.filter(
        (car) =>
          car.title.toLowerCase().includes(searchCar.toLowerCase()) ||
          car.user.name.toLowerCase().includes(searchCar.toLowerCase())
      )
    );
  };

  const deleteCar = (id, e) => {
    e.preventDefault();
    console.log(id);
    axios
      .delete("https://autodilerapi.herokuapp.com/advertisment/" + id)
      .then(console.log)
      .catch(console.log);
      window.location = "/admin";
  };

  return (
    <div className="dataTableDiv padding-top">
      <div className="row">
        <h1>Oglasi</h1>
      </div>
      <form className="dataTableForm" onSubmit={handleSearchCars}>
        <input type="text" onChange={(e) => setSearchCar(e.target.value)} />
        <button type="submit" className="btn-sm btn-info ml-3 mt-2 mb-3">
          Pretrazi
        </button>
      </form>
      <div className="table-resposive mb-3">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Naslov</th>
              <th scope="col">Brand</th>
              <th scope="col">Model</th>
              <th scope="col">Kategorija</th>
              <th scope="col">Cijena</th>
              <th scope="col">Korisnik</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.map((car) => {
              return (
                <tr key={car.id}>
                  <td>{car.id}</td>
                  <td>{car.title}</td>
                  {car.model != null ? (
                    <td>{car.model.brand.name}</td>
                  ) : (
                    <td>/</td>
                  )}

                  {car.model != null ? <td>{car.model.name}</td> : <td>/</td>}

                  {car.model != null &&
                  car.model.category != null &&
                  car.model.category.name != null ? (
                    <td>{car.model.category.id}</td>
                  ) : (
                    <td>/</td>
                  )}

                  <td>{car.price}</td>
                  <td>{car.user.name}</td>
                  <td>
                    <Link to={{ pathname: `/editCar/${car.id}` }}>
                      <FaPen></FaPen>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={(e) => deleteCar(car.id, e)}
                    >
                      <FaTrash></FaTrash>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTableCars;
