import { useContext } from "react";

import { Link } from "react-router-dom";
import { UserIdContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  const userID = useContext(UserIdContext);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <Link to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="logo-amaze-network" />
              <h3>Amaze</h3>
            </div>
          </Link>
        </div>

        <div>
          {userID ? (
            <ul>
              <li></li>
              <li className="welcome">
                <Link to="/profile">
                  <h5>{`Welcome ${"eulazzo"}`}</h5>
                </Link>
              </li>

              <Logout />
            </ul>
          ) : (
            <ul>
              <li></li>
              <li>
                <Link to="/profile">
                  <img src="./img/icons/login.svg" alt="login" />
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
