import React, { useEffect, useState } from "react";

import TableList from "./TableList";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [loadedData, setLoadedData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/`);
        const responseData = await response.json();
        setLoadedData(responseData.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const handleDelete = (id) => {
    setLoadedData((prevData) => prevData.filter((user) => user.id !== id));
  };

  return (
    <>
      <div className="app">
        <table className="centered-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Email</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {loadedData.length === 0 ? (
              <tr>
                <td colSpan="6">
                  There is no data,{" "}
                  <span
                    onClick={() => {
                      navigate("/adduser");
                    }}
                  >
                    Click here{" "}
                  </span>{" "}
                  to add
                </td>
              </tr>
            ) : (
              loadedData.map((user) => (
                <TableList
                  id={user.id}
                  id_to_display={loadedData.indexOf(user) + 1}
                  name={user.name}
                  salary={user.salary}
                  email={user.email}
                  onDelete={handleDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HomePage;
