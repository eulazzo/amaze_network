import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { UserIdContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  const userID = useContext(UserIdContext);
  const [userDataInfo, setUserDataInfo] = useState(null);
 

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="logo-amaze-network" />
              <h3>Amaze</h3>
            </div>
          </NavLink>
        </div>

        <div>
          {userID ? (
            <ul>
              <li></li>
              <li className="welcome">
                <NavLink exact to="/profile">
                  <h5>{`Welcome ${userDataInfo?.pseudo}`}</h5>
                </NavLink>
              </li>

              <Logout />
            </ul>
          ) : (
            <ul>
              <li></li>
              <li>
                <NavLink exact to="/profile">
                  <img src="./img/icons/login.svg" alt="login" />
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
