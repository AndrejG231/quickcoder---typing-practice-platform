import React from "react";
import { useHistory } from "react-router-dom";

import Modal from "../components/Modal";
import ArrowButton from "../components/ArrowButton";

export const Profile: React.FC = () => {
  const nav = useHistory();
  return (
    <Modal>
      <ArrowButton
        bodyWidth="180px"
        onClick={() => nav.push("/home/change_known_password/")}
        variant="right"
      >
        Change Password
      </ArrowButton>
      Profile
    </Modal>
  );
};

export default Profile;
