import React, { Component } from "react";
import { useHistory } from "react-router-dom";

import ArrowButton from "./ArrowButton";


import "./Modal.css";

interface ModalProps {
  children: React.ReactChild | React.ReactChild[] | never[];
  contentClass?: string;
}

const Modal: React.FC<ModalProps> = ({ children, contentClass }) => {
  const navigation = useHistory();
  return (
    <div className="modal border">
      <div className={`modal content ${contentClass}`}>{children}</div>
      <ArrowButton
        className="back-button"
        bodyWidth="90px"
        variant="right"
        onClick={() => {
          navigation.goBack();
        }}
      >
        Back
      </ArrowButton>
    </div>
  );
};

export default Modal;
