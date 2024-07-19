import React, { useState } from "react";
import { Link } from "react-router-dom";

import ModalPortal from "../../util/Portal/modal-portal";
import "./TableList.css";

function TableList(props) {
  const [modalVisible, setModalVisible] = useState(false);

  function handleCancel() {
    setModalVisible(false);
  }

  async function deleteHandler() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/${props.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }
      props.onDelete(props.id);
      setModalVisible(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <ModalPortal
        show={modalVisible}
        title="Confirm Delete"
        content="Are you sure you want to delete this item?"
        onCancel={handleCancel}
        onDelete={deleteHandler}
      />
      <tr>
        <td>{props.id_to_display}</td>
        <td>{props.name}</td>
        <td>{props.salary}</td>
        <td>{props.email}</td>
        <td>
          <Link to={`/user/${props.id}`}>
            <button className="update-button">Update</button>
          </Link>
        </td>
        <td>
          <button
            className="delete-button"
            onClick={() => {
              setModalVisible(true);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}

export default TableList;
