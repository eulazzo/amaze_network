import React, { useContext } from "react";
import Log from "../components/Log";

import { UserIdContext } from "../components/AppContext.js";

const Profile = () => {
  const userJwtID = useContext(UserIdContext);
  console.log(userJwtID);

  return (
    <div className="profil-page">
      {userJwtID ? (
        <h1>Update Page</h1>
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
