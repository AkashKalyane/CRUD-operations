import React from "react";
import ReactDOM from "react-dom";
import "./modal-portal.css";

function Modal(props) {
  const content = (
    <div className={`modal ${props.show ? "modal-show" : "modal-hide"}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{props.title}</h2>
        </div>
        <div className="modal-body">
          <p>{props.content}</p>
        </div>
        <div className="modal-footer">
          <button onClick={props.onCancel}>Cancel</button>
          <button onClick={props.onDelete}>Delete</button>
        </div>
      </div>
      <div className="modal-overlay" onClick={props.onCancel}></div>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("delete-modal")
  );
}

function ModalPortal(props) {
  return <Modal {...props} />;
}

export default ModalPortal;
