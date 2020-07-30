import React from "react";
import ReactDOM from "react-dom";
import { Modal } from "reactstrap";

export default class RemoteStorage {
  
    toogleModal = () => {
      
  };

  showModalStorage = () => {
    ReactDOM.render(
      <Modal isOpen="true">Modal</Modal>,
      document.getElementById("root2")
    );
  };
}
