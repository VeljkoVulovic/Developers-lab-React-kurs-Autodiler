import React, { useState, useEffect } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import callApi from "../services/callApi";
import { Link } from "react-router-dom";
import axios from "axios";

function DataTableUsers() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(users);

    callApi("/admin/all-users").then((res) => {
      setUsers(res.data);
      setFilteredUsers(res.data);
    });
  }, []);

  const handleSearchUsers = (e) => {
    e.preventDefault();
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
          user.email.toLowerCase().includes(searchUser.toLowerCase())
      )
    );
  };

  const deleteUser = (id, e) => {
    e.preventDefault();
    console.log(id);
    //axios delete
    // const config = {
    //   headers: {
    //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZvam9kanVrYW5vdmljQGdtYWlsLmNvbSIsImlhdCI6MTYxNTA1MDAxOX0.tQucqxkA3_hWFQGHO-jNc1reU2LrlPS6bKTm0V2xkJE`,
    //   },
    // };
    // axios
    //   .delete("https://autodilerapi.herokuapp.com/advertisment/" + id, config)
    //   .then(console.log)
    //   .catch(console.log);
  };

  return (
    <div className="dataTableDiv">
      <div className="row mt-5">
        <h1>Korisnici</h1>
      </div>
      <form className="dataTableForm" onSubmit={handleSearchUsers}>
        <input type="text" onChange={(e) => setSearchUser(e.target.value)} />
        <button type="submit" className="btn-sm btn-info  ml-3 mt-2 mb-3">
          Pretrazi
        </button>
      </form>
      <div className="table-resposive mb-3">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Lokacija</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.location}</td>
                  <td>
                    <Link to={{ pathname: `/editUser/${user.id}` }}>
                      <FaPen></FaPen>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={(e) => deleteUser(user.id, e)}
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

export default DataTableUsers;
