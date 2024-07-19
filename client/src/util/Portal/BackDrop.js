import ReactDOM from "react-dom";

import "./BackDrop.css";

function BackDrop() {
  return ReactDOM.createPortal(
    <div className={`backdrop`}></div>,
    document.getElementById("back-drop")
  );
}

export default BackDrop;
