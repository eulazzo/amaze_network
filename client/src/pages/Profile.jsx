import React, { useContext } from "react";
import Log from "../components/Log";

import { UserIdContext } from "../components/AppContext.js";
import {UpdateProfile} from '../components/Profile/UpdateProfile'
 
const Profile = () => {
  const userJwtID = useContext(UserIdContext);

  return (
    <div className="profil-page">
      {userJwtID ? (
        <>
          <UpdateProfile />
        </>
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/log.svg" alt="img-logo" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
