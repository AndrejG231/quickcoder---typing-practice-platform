import React from "react";
import { useHistory } from "react-router-dom";

import { Modal } from "../components/";
import ArrowButton from "../components/ArrowButton";

export const Profile: React.FC = () => {
  const nav = useHistory();
  return (
    <Modal>
      <ArrowButton
        onClick={() => nav.push("/home/change_known_password/")}
        right
      >
        Change Password
      </ArrowButton>
      Profile
    </Modal>
  );
};

export default Profile;
