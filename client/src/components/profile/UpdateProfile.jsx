import React from "react";
import { useSelector } from "react-redux";
import { LefNavbar } from "../LefNavbar";
import UploadImg from "./UploadImg";

export const UpdateProfile = () => {
  const user = useSelector((state) => state.user.userReducer);

  return (
    <div className="profil-container">
      <LefNavbar />
      <h1>{user.pseudo} Profile</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Profile Picture</h3>
          <img src={user.picture} alt="user-profile-pic" />
          <UploadImg />
        </div>
      </div>
    </div>
  );
};
